from PIL import Image

for name in ["sample_01_patrick_hand.jpg", "sample_02_mali.jpg"]:
    im = Image.open(f"public/images/quotes/{name}")
    # crop footer badge
    crop_badge = im.crop((350, 930, 730, 1020))
    crop_badge.save(f"public/images/quotes/badge_{name}")
    print(f"Saved footer crop for {name}")
