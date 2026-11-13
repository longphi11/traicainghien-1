#!/usr/bin/env python3
"""
generate_zen_thumbnails.py - Agent 8: ve tranh Zen Watercolour doc ban cho bai viet.

Muc dich: khi kho anh da dung het (hoac phat hien 2 bai co thumbnail qua giong nhau),
script nay ve TAC PHAM MOI, dam bao:
  - Ti le 16:9 (1200x675), WebP < 120KB, co watermark thuong hieu
  - Sai lech pixel >= 15.0 so voi TOAN BO thumbnail dang dung (dung nguong cua
    scripts/audit_image_similarity.py)
  - Ten file chua slug bai viet -> khong bao gio trung ten
  - TUYET DOI khong dung vector / SVG / code ve hinh

Nguon ve (thu lan luot):
  1. Gemini image (gemini-3-pro-image, gemini-2.5-flash-image...) - can quota
  2. Pollinations (model turbo/flux) - mien phi, co the bi gioi han theo IP

CACH DUNG:
  # Ve 1 anh cho 1 bai cu the
  python scripts/generate_zen_thumbnails.py --slug <slug> --scene "mo ta canh" --update

  # Tu tim cac cap bai bi trung thumbnail va ve lai cho bai moi hon
  python scripts/generate_zen_thumbnails.py --fix-collisions --update

  # Chi kiem tra, khong ve
  python scripts/generate_zen_thumbnails.py --fix-collisions --dry-run
"""
import argparse
import base64
import glob
import hashlib
import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

os.environ.setdefault("PYTHONIOENCODING", "utf-8")
try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ARTICLES_TS = os.path.join(ROOT, "src", "data", "articles.ts")
IMAGES_DIR = os.path.join(ROOT, "public", "images", "articles")

DIFF_THRESHOLD = 15.0
MAX_BYTES = 122880          # 120KB
TARGET_SIZE = (1200, 675)

STYLE_PROMPT = (
    "traditional zen watercolour painting on rough cold press paper, wet on wet pigment blooms, "
    "visible paper grain and fibre texture, thin charcoal sumi-e ink contour lines, "
    "muted palette of deep forest green, warm beige paper and terracotta, "
    "soft watercolour washes bleeding into paper, painterly imperfections, "
    "contemporary young adult life, no text, no logo, no frame"
)

# Canh ve goi y theo tu khoa trong tieu de (uu tien bam sat noi dung bai viet)
SCENE_HINTS = [
    (("brain rot", "nhuon nao", "não", "muc nao"), "a young person walking alone on a pine ridge trail at sunrise, phone tucked away in a pocket, misty valley below"),
    (("deep work", "tap trung", "tập trung"), "a young man writing in a small notebook at a wooden desk facing a tall window, city lights soft and blurred outside, phone lying face down far away"),
    (("atomic habits", "thoi quen", "thói quen", "ky luat"), "a young woman adding one small pebble to a carefully balanced stack of stones on a wooden balcony table, morning tea steaming beside it"),
    (("dopamine", "nghien", "nghiện"), "a quiet empty cafe table by a rainy window, a cup of tea and a closed notebook, the street outside soft in the rain"),
    (("ikigai", "le song", "lẽ sống"), "a narrow mountain path at dawn opening onto layered misty hills, warm light spilling across the valley"),
    (("met moi", "kiet suc", "burnout"), "a young woman resting on a wooden bench under a pine tree, late afternoon light through the needles"),
    (("sach", "sách", "doc", "đọc"), "a wooden table by an open window with a cup of tea and a closed book, misty mountains beyond"),
]

DEFAULT_SCENE = ("a young adult sitting quietly on a wooden balcony at dawn, misty pine hills in the distance, "
                 "a cup of tea on the railing, calm and spacious")


def load_env_keys():
    """Doc pool key Gemini tu .env.local (hoac bien moi truong)."""
    keys = []
    env_local = os.path.join(ROOT, ".env.local")
    vals = {}
    if os.path.exists(env_local):
        for line in open(env_local, encoding="utf-8", errors="ignore"):
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                vals[k.strip()] = v.strip().strip('"').strip("'")
    for k in re.split(r"[,;\s]+", vals.get("GEMINI_API_KEYS", "")):
        if k:
            keys.append(k)
    single = vals.get("GEMINI_API_KEY", "").strip()
    if single:
        keys.append(single)
    for name in ("GEMINI_API_KEY", "GOOGLE_API_KEY"):
        v = os.environ.get(name, "").strip()
        if v:
            keys.append(v)
    seen, uniq = set(), []
    for k in keys:
        if k not in seen:
            seen.add(k)
            uniq.append(k)
    return uniq


def parse_articles():
    """Tra ve list dict: slug, title, thumbnail, date (neu co)."""
    if not os.path.exists(ARTICLES_TS):
        raise SystemExit(f"Khong thay {ARTICLES_TS}")
    txt = open(ARTICLES_TS, encoding="utf-8").read()
    pattern = re.compile(
        r'\{\s*["\']slug["\']:\s*["\'](?P<slug>[^"\']+)["\'][\s\S]*?'
        r'["\']title["\']:\s*["\'](?P<title>[^"\']*)["\'][\s\S]*?'
        r'["\']thumbnail["\']:\s*["\'](?P<thumb>[^"\']+)["\']'
    )
    out = []
    for m in pattern.finditer(txt):
        block = m.group(0)
        date_m = re.search(r'["\'](?:date|publishedAt|createdAt)["\']:\s*["\']([^"\']+)', block)
        out.append({
            "slug": m.group("slug"),
            "title": m.group("title"),
            "thumb": m.group("thumb"),
            "date": date_m.group(1) if date_m else "",
        })
    return out


def load_arrays(articles):
    """Anh (64x64) cua toan bo bai khong thuoc muc Sach Hay - dung nhu audit."""
    from PIL import Image
    import numpy as np
    arrays = {}
    for a in articles:
        if a["slug"].startswith(("review-sach", "doc-sach", "doc-cau-chuyen")):
            continue
        p = os.path.join(ROOT, "public", a["thumb"].lstrip("/"))
        if os.path.exists(p):
            try:
                arrays[a["slug"]] = np.array(Image.open(p).convert("RGB").resize((64, 64)), dtype=float)
            except Exception:
                pass
    return arrays


def find_collisions(articles, arrays):
    """Cac cap bai co thumbnail lech < nguong (giong audit_image_similarity.py)."""
    import numpy as np
    slugs = [a["slug"] for a in articles if a["slug"] in arrays]
    pairs = []
    for i in range(len(slugs)):
        for j in range(i + 1, len(slugs)):
            a, b = slugs[i], slugs[j]
            diff = float(np.mean(np.abs(arrays[a] - arrays[b])))
            if diff < DIFF_THRESHOLD:
                pairs.append((diff, a, b))
    pairs.sort()
    return pairs


def scene_for(title):
    t = title.lower()
    for keywords, scene in SCENE_HINTS:
        if any(k in t for k in keywords):
            return scene
    return DEFAULT_SCENE


# ----------------------------- NGUON VE ANH -----------------------------

def try_gemini_image(prompt, keys, seed=None):
    """Ve bang Gemini image model. Tra ve bytes hoac None."""
    if not keys:
        return None, "khong co key Gemini"
    models = ["gemini-3-pro-image", "gemini-3.1-flash-image", "gemini-2.5-flash-image"]
    last = ""
    for model in models:
        for key in keys:
            url = (f"https://generativelanguage.googleapis.com/v1beta/models/"
                   f"{model}:generateContent?key={key}")
            body = json.dumps({
                "contents": [{"role": "user", "parts": [{"text": prompt}]}],
                "generationConfig": {"responseModalities": ["IMAGE"]},
            }).encode()
            req = urllib.request.Request(url, data=body, headers={"Content-Type": "application/json"})
            try:
                with urllib.request.urlopen(req, timeout=180) as r:
                    data = json.loads(r.read().decode())
                for cand in data.get("candidates", []):
                    for part in cand.get("content", {}).get("parts", []):
                        inline = part.get("inlineData") or part.get("inline_data")
                        if inline and inline.get("data"):
                            return base64.b64decode(inline["data"]), f"{model} (key ...{key[-4:]})"
                last = f"{model}: khong tra ve anh"
            except urllib.error.HTTPError as e:
                msg = e.read().decode(errors="ignore")
                last = f"{model}: HTTP {e.code} {msg[:90]}"
                if e.code in (401, 403):
                    break  # key nay khong dung duoc cho moi model
            except Exception as e:
                last = f"{model}: {type(e).__name__} {e}"
    return None, last


def try_pollinations(prompt, width=1200, height=675, seed=0):
    """
    Ve bang Pollinations (mien phi, khong can key).
    Luu y do that 13/11/2026: ban an danh chi duoc cap khung nho (768x432);
    khung lon hon tra 402 Payment Required. Vi vay tu lui ve 768x432 roi
    scripts postprocess se nang chuan 1200x675 bang Lanczos.
    """
    last = ""
    sizes = [(width, height), (1024, 576), (768, 432)]
    for model in ("turbo", "flux"):
        for (w, h) in sizes:
            url = ("https://image.pollinations.ai/prompt/" + urllib.parse.quote(prompt) +
                   f"?width={w}&height={h}&nologo=true&model={model}&seed={seed}")
            try:
                req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
                with urllib.request.urlopen(req, timeout=240) as r:
                    data = r.read()
                    ctype = r.headers.get("Content-Type", "")
                if ctype.startswith("image/") and len(data) > 8000:
                    return data, f"pollinations/{model}@{w}x{h}"
                last = f"pollinations/{model}@{w}x{h}: khong phai anh ({ctype})"
            except urllib.error.HTTPError as e:
                last = f"pollinations/{model}@{w}x{h}: HTTP {e.code}"
            except Exception as e:
                last = f"pollinations/{model}@{w}x{h}: {type(e).__name__}"
    return None, last


# ----------------------------- HAU KY ANH -----------------------------

def _font(size):
    from PIL import ImageFont
    candidates = [
        "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/arial.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
    ]
    for c in candidates:
        if os.path.exists(c):
            try:
                return ImageFont.truetype(c, size)
            except Exception:
                continue
    return ImageFont.load_default()


def postprocess(raw_bytes, out_path, draw_brand=True):
    """Crop 16:9 -> 1200x675 -> watermark -> WebP < 120KB."""
    from PIL import Image, ImageDraw
    import io

    img = Image.open(io.BytesIO(raw_bytes)).convert("RGB")

    # Center-crop theo ti le 16:9 de khong meo hinh
    tw, th = TARGET_SIZE
    src_ratio = img.width / img.height
    target_ratio = tw / th
    if src_ratio > target_ratio:
        new_w = int(img.height * target_ratio)
        left = (img.width - new_w) // 2
        img = img.crop((left, 0, left + new_w, img.height))
    else:
        new_h = int(img.width / target_ratio)
        top = (img.height - new_h) // 2
        img = img.crop((0, top, img.width, top + new_h))
    img = img.resize(TARGET_SIZE, Image.Resampling.LANCZOS).convert("RGBA")

    if draw_brand:
        overlay = Image.new("RGBA", TARGET_SIZE, (0, 0, 0, 0))
        d = ImageDraw.Draw(overlay)
        f_brand = _font(26)
        f_domain = _font(20)

        brand = "TRẠI CAI NGHIỆN"
        d.text((34, 26), brand, font=f_brand, fill=(250, 247, 242, 150))
        d.text((33, 25), brand, font=f_brand, fill=(45, 49, 46, 90))

        domain = "traicainghien.com"
        bbox = d.textbbox((0, 0), domain, font=f_domain)
        dw = bbox[2] - bbox[0]
        d.text((tw - dw - 30, th - 42), domain, font=f_domain, fill=(250, 247, 242, 150))

        img = Image.alpha_composite(img, overlay).convert("RGB")

    # Ha chat luong dan cho den khi < 120KB
    for q in (88, 84, 80, 76, 72, 68, 64, 60, 55, 50, 45, 40):
        buf = io.BytesIO()
        img.save(buf, format="WEBP", quality=q, method=6)
        if buf.tell() <= MAX_BYTES:
            data = buf.getvalue()
            break
    else:
        raise RuntimeError("Khong nen duoc anh duoi 120KB")

    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, "wb") as f:
        f.write(data)
    return len(data)


def diff_against_used(path, arrays):
    """Sai lech nho nhat so voi thumbnail dang dung."""
    from PIL import Image
    import numpy as np
    arr = np.array(Image.open(path).convert("RGB").resize((64, 64)), dtype=float)
    if not arrays:
        return 999.0, None
    best_slug, best = None, 999.0
    for slug, other in arrays.items():
        d = float(np.mean(np.abs(arr - other)))
        if d < best:
            best, best_slug = d, slug
    return best, best_slug


def update_articles_thumbnail(slug, new_thumb):
    """Ghi de dung 1 truong thumbnail cua dung slug trong articles.ts."""
    txt = open(ARTICLES_TS, encoding="utf-8").read()
    pattern = re.compile(
        r'(\{\s*["\']slug["\']:\s*["\']' + re.escape(slug) + r'["\'][\s\S]*?["\']thumbnail["\']:\s*["\'])([^"\']+)(["\'])'
    )
    new_txt, n = pattern.subn(lambda m: m.group(1) + new_thumb + m.group(3), txt, count=1)
    if n != 1:
        raise SystemExit(f"Khong tim thay dung 1 bai voi slug {slug} (tim thay {n})")
    open(ARTICLES_TS, "w", encoding="utf-8").write(new_txt)
    print(f"  ✅ Da cap nhat thumbnail trong articles.ts: {slug}")


def generate_for(slug, title, scene, keys, args, arrays):
    prompt = f"{STYLE_PROMPT}, {scene}"
    print(f"\n🎨 Ve cho: {slug}")
    print(f"   canh: {scene[:110]}...")

    raw, source = try_gemini_image(prompt, keys)
    if raw is None:
        print(f"   Gemini: {source}")
        raw, source = try_pollinations(prompt, seed=args.seed)
    if raw is None:
        print(f"   Pollinations: {source}")
        print("   ❌ Khong nguon nao ve duoc (het han ngach). Thu lai sau.")
        return None

    fname = f"{slug}-zen-art-{args.seed}.webp"
    out_path = os.path.join(IMAGES_DIR, fname)
    size = postprocess(raw, out_path, draw_brand=not args.no_brand)
    diff, nearest = diff_against_used(out_path, arrays)

    ok = diff >= DIFF_THRESHOLD and size <= MAX_BYTES
    print(f"   nguon: {source} | {size/1024:.1f}KB | lech gan nhat {diff:.2f} ({nearest})")
    if not ok:
        print(f"   ❌ Chua dat: can lech >= {DIFF_THRESHOLD} va <= 120KB. Xoa file, thu seed khac.")
        os.remove(out_path)
        return None
    print(f"   ✅ DAT CHUAN: /images/articles/{fname}")
    return f"/images/articles/{fname}"


def main():
    ap = argparse.ArgumentParser(description="Agent 8 - ve thumbnail Zen doc ban")
    ap.add_argument("--slug", help="slug bai viet can ve thumbnail")
    ap.add_argument("--scene", help="mo ta canh (tieng Anh se cho ket qua tot hon)")
    ap.add_argument("--from-file", help="nap 1 file anh co san (tu ve o Gemini app / Midjourney / Antigravity)")
    ap.add_argument("--seed", type=int, default=int(time.time()) % 100000)
    ap.add_argument("--update", action="store_true", help="ghi thumbnail moi vao articles.ts")
    ap.add_argument("--no-brand", action="store_true", help="khong dong watermark")
    ap.add_argument("--fix-collisions", action="store_true", help="tu tim cap bai bi trung va ve lai cho bai moi hon")
    ap.add_argument("--dry-run", action="store_true", help="chi bao cao, khong ve")
    args = ap.parse_args()

    try:
        from PIL import Image  # noqa: F401
        import numpy  # noqa: F401
    except ImportError:
        raise SystemExit("Thieu Pillow/numpy. Cai: python3 -m pip install --break-system-packages pillow numpy")

    articles = parse_articles()
    arrays = load_arrays(articles)
    keys = load_env_keys()
    print(f"📚 {len(articles)} bai viet | {len(arrays)} thumbnail so sanh | {len(keys)} key Gemini")

    if args.fix_collisions:
        pairs = find_collisions(articles, arrays)
        if not pairs:
            print("✅ Khong co cap nao bi trung thumbnail.")
            return
        print(f"⚠️ Phat hien {len(pairs)} cap trung lap:")
        for diff, a, b in pairs:
            print(f"   {diff:6.2f} | {a}  <->  {b}")
        if args.dry_run:
            print("\n(dry-run: khong ve gi)")
            return

        by_slug = {a["slug"]: a for a in articles}
        for diff, a, b in pairs:
            # Bai moi hon (co hau to ngay) la bai can ve lai
            target = max((a, b), key=lambda s: by_slug[s]["date"] or "")
            info = by_slug[target]
            new_thumb = generate_for(target, info["title"], scene_for(info["title"]), keys, args, arrays)
            if not new_thumb:
                continue
            if args.update:
                update_articles_thumbnail(target, new_thumb)
            # cap nhat bo nho de vong sau so sanh dung
            from PIL import Image
            import numpy as np
            p = os.path.join(ROOT, "public", new_thumb.lstrip("/"))
            arrays[target] = np.array(Image.open(p).convert("RGB").resize((64, 64)), dtype=float)
        return

    if not args.slug:
        raise SystemExit("Can --slug hoac --fix-collisions. Xem --help.")

    info = next((a for a in articles if a["slug"] == args.slug), None)
    scene = args.scene or scene_for(info["title"] if info else args.slug)

    if args.from_file:
        # Bo tu ve tranh o Gemini app / Midjourney / Antigravity roi nap vao day
        src = args.from_file
        if not os.path.exists(src):
            raise SystemExit(f"Khong thay file: {src}")
        raw = open(src, "rb").read()
        print(f"\n🖼️  Nap tu file: {src}")
        fname = f"{args.slug}-zen-art-{args.seed}.webp"
        out_path = os.path.join(IMAGES_DIR, fname)
        size = postprocess(raw, out_path, draw_brand=not args.no_brand)
        diff, nearest = diff_against_used(out_path, arrays)
        if diff < DIFF_THRESHOLD:
            os.remove(out_path)
            raise SystemExit(
                f"❌ Anh qua giong bai '{nearest}' (lech {diff:.2f} < {DIFF_THRESHOLD}). "
                "Can mot tac pham khac."
            )
        print(f"   ✅ DAT CHUAN: /images/articles/{fname} ({size/1024:.1f}KB | lech {diff:.2f})")
        if args.update:
            update_articles_thumbnail(args.slug, f"/images/articles/{fname}")
        return

    new_thumb = generate_for(args.slug, info["title"] if info else args.slug, scene, keys, args, arrays)
    if new_thumb and args.update:
        update_articles_thumbnail(args.slug, new_thumb)


if __name__ == "__main__":
    main()
