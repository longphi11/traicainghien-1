from PIL import Image

im = Image.open("public/images/logo-totem.png")
print("Logo size:", im.size, "Mode:", im.mode)
