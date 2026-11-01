const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'public', 'brand-assets');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const brandBoardPath = path.join(__dirname, '..', 'public', 'images', 'trai_cai_nghien_totem_brand_board.jpg');
const BG_COLOR = '#F6F2E8'; // Exact authentic warm paper tint of Mẫu 05

async function main() {
  console.log('--- 1. BÓC TÁCH PHẦN TỬ GỐC TỪ BẢNG MẪU 05 ---');

  // A. Crop raw lockup (left 710, top 460, width 610, height 180)
  const rawLockup = await sharp(brandBoardPath)
    .extract({ left: 710, top: 460, width: 610, height: 180 })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = rawLockup.info;
  const transparentLockupBuffer = Buffer.alloc(width * height * 4);

  // Convert to clean transparent PNG with soft edge blending
  for (let i = 0; i < width * height; i++) {
    const r = rawLockup.data[i * 3];
    const g = rawLockup.data[i * 3 + 1];
    const b = rawLockup.data[i * 3 + 2];
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;

    const outIdx = i * 4;
    if (lum > 240) {
      transparentLockupBuffer[outIdx] = 0;
      transparentLockupBuffer[outIdx + 1] = 0;
      transparentLockupBuffer[outIdx + 2] = 0;
      transparentLockupBuffer[outIdx + 3] = 0;
    } else if (lum > 215) {
      const alpha = Math.round(255 * (1 - (lum - 215) / (240 - 215)));
      transparentLockupBuffer[outIdx] = r;
      transparentLockupBuffer[outIdx + 1] = g;
      transparentLockupBuffer[outIdx + 2] = b;
      transparentLockupBuffer[outIdx + 3] = alpha;
    } else {
      transparentLockupBuffer[outIdx] = r;
      transparentLockupBuffer[outIdx + 1] = g;
      transparentLockupBuffer[outIdx + 2] = b;
      transparentLockupBuffer[outIdx + 3] = 255;
    }
  }

  // Master transparent lockup PNG buffer
  const lockupPngBuffer = await sharp(transparentLockupBuffer, {
    raw: { width, height, channels: 4 }
  }).png().toBuffer();

  // Master isolated totem buffer (left 0 to 200)
  const totemIsolatedBuffer = await sharp(lockupPngBuffer)
    .extract({ left: 0, top: 0, width: 200, height: 180 })
    .png()
    .toBuffer();

  console.log('✓ Master elements extracted and alpha-masked.');

  // Helper to make Avatar
  async function makeAvatar(size, totemWidth, filename) {
    const resizedTotem = await sharp(totemIsolatedBuffer)
      .resize(totemWidth, null)
      .toBuffer();

    const destPath = path.join(outDir, filename);
    await sharp({
      create: {
        width: size,
        height: size,
        channels: 3,
        background: BG_COLOR
      }
    })
    .composite([{
      input: resizedTotem,
      gravity: 'center'
    }])
    .png()
    .toFile(destPath);

    console.log(`✓ Avatar created: ${filename} (${size}x${size}px, icon ${totemWidth}px)`);
  }

  // Helper to make Banner
  async function makeBanner(w, h, lockupW, filename, extraElements = []) {
    const resizedLockup = await sharp(lockupPngBuffer)
      .resize(lockupW, null)
      .toBuffer();

    const composites = [{
      input: resizedLockup,
      gravity: 'center'
    }, ...extraElements];

    const destPath = path.join(outDir, filename);
    await sharp({
      create: {
        width: w,
        height: h,
        channels: 3,
        background: BG_COLOR
      }
    })
    .composite(composites)
    .png()
    .toFile(destPath);

    console.log(`✓ Banner created: ${filename} (${w}x${h}px, lockup ${lockupW}px)`);
  }

  console.log('\n--- 2. TẠO BỘ AVATAR / LOGO 1:1 ĐỒNG BỘ ĐA NỀN TẢNG ---');
  // Master Square Avatar (1000x1000)
  await makeAvatar(1000, 520, 'avatar-master-square-1000x1000.png');
  // YouTube Avatar (800x800)
  await makeAvatar(800, 420, 'avatar-youtube-800x800.png');
  // Facebook Avatar / Fanpage (800x800)
  await makeAvatar(800, 420, 'avatar-facebook-800x800.png');
  // X / Twitter Profile (800x800)
  await makeAvatar(800, 420, 'avatar-x-twitter-800x800.png');
  // Threads Profile (800x800)
  await makeAvatar(800, 420, 'avatar-threads-800x800.png');
  // Instagram Profile (800x800)
  await makeAvatar(800, 420, 'avatar-instagram-800x800.png');
  // Telegram Channel / Group Profile (800x800)
  await makeAvatar(800, 420, 'avatar-telegram-800x800.png');

  console.log('\n--- 3. TẠO BỘ BANNER / COVER ĐÚNG TỶ LỆ CHUẨN ĐA NỀN TẢNG ---');
  
  // 1. YouTube Banner: 2560x1440
  // Safe area for all devices is center 1546x423.
  // Lockup width 1100px perfectly centers inside 1546x423 safe area.
  await makeBanner(2560, 1440, 1100, 'banner-youtube-2560x1440.png');

  // 2. Facebook Fanpage Cover: 1640x924 (Mobile/Desktop universal safe ratio)
  await makeBanner(1640, 924, 1050, 'banner-facebook-1640x924.png');

  // 3. X (Twitter) Header: 1500x500 (3:1 ratio)
  await makeBanner(1500, 500, 850, 'banner-x-twitter-1500x500.png');

  // 4. Threads / Instagram Web Landscape Banner: 1200x630 (1.91:1)
  await makeBanner(1200, 630, 820, 'banner-threads-instagram-1200x630.png');

  // 5. Telegram Channel Header / Post Landscape: 1280x720 (16:9)
  await makeBanner(1280, 720, 840, 'banner-telegram-1280x720.png');

  // 6. Master Brand Banner Landscape: 1920x1080 (Full HD)
  await makeBanner(1920, 1080, 1150, 'banner-master-brand-1920x1080.png');

  console.log('\n🎉 HOÀN THÀNH TẤT CẢ 13 TỆP ĐỒ HỌA MẠNG XÃ HỘI CHUẨN THƯƠNG HIỆU!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
