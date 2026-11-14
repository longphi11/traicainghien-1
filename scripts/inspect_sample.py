from PIL import Image

p = r"C:\Users\MrFine\.gemini\antigravity\brain\1200023e-b4f6-435e-b656-b09888ac9b01\.user_uploaded\media_1794623217724_622a607b.jpg"
with Image.open(p) as im:
    print("Size:", im.size)
    print("Format:", im.format)
    print("Mode:", im.mode)
