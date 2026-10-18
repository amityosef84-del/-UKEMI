"""Cut the dark backdrop out of the UKEMI logo renders -> RGBA PNG."""
import sys
import numpy as np
from PIL import Image, ImageFilter

src, out = sys.argv[1], sys.argv[2]
I = np.asarray(Image.open(src).convert('RGB')).astype(np.float32) / 255
H, W, _ = I.shape
lum = lambda a: 0.2126 * a[..., 0] + 0.7152 * a[..., 1] + 0.0722 * a[..., 2]
L = lum(I)

# 1. Background estimate: block means of clearly-background pixels, holes filled, upsampled.
rough = Image.fromarray(((L > 0.14) * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(31))
bgm = np.asarray(rough) == 0
B = 32
gh, gw = H // B, W // B
grid = np.zeros((gh, gw, 3), np.float32)
have = np.zeros((gh, gw), bool)
for y in range(gh):
    for x in range(gw):
        m = bgm[y * B:(y + 1) * B, x * B:(x + 1) * B]
        if m.sum() > B * B * 0.2:
            grid[y, x] = I[y * B:(y + 1) * B, x * B:(x + 1) * B][m].mean(0)
            have[y, x] = True
for _ in range(64):  # fill blocks under the logo from their neighbours
    if have.all():
        break
    g2, h2 = grid.copy(), have.copy()
    for y in range(gh):
        for x in range(gw):
            if have[y, x]:
                continue
            ys, xs = slice(max(y - 1, 0), y + 2), slice(max(x - 1, 0), x + 2)
            nb = have[ys, xs]
            if nb.any():
                g2[y, x] = grid[ys, xs][nb].mean(0)
                h2[y, x] = True
    grid, have = g2, h2
bg = np.asarray(Image.fromarray((grid * 255).clip(0, 255).astype(np.uint8)).resize((W, H), Image.BICUBIC)).astype(np.float32) / 255

# 2. Alpha from how much brighter than the backdrop each pixel is.
d = L - lum(bg)
a = np.clip((d - 0.025) / (0.11 - 0.025), 0, 1)
a = a * a * (3 - 2 * a)
# 3. Close thin dark cracks inside the shapes so they stay opaque.
a8 = Image.fromarray((a * 255).astype(np.uint8))
closed = a8.filter(ImageFilter.MaxFilter(7)).filter(ImageFilter.MinFilter(7))
a = np.maximum(a, np.asarray(closed).astype(np.float32) / 255 * (np.asarray(a8.filter(ImageFilter.MaxFilter(9))) > 200))
# Drop stray specks of backdrop texture far from the logo itself.
core = Image.fromarray(((a > 0.6) * 255).astype(np.uint8)).filter(ImageFilter.MinFilter(5)).filter(ImageFilter.MaxFilter(41))
a = a * (np.asarray(core) > 0)
# 4. Un-premultiply the backdrop out of the edge colours.
safe = np.maximum(a, 1e-3)[..., None]
C = np.clip(bg + (I - bg) / safe, 0, 1)
C = np.where(a[..., None] > 0.02, C, 0)
rgba = np.dstack([C, a]) * 255
img = Image.fromarray(rgba.astype(np.uint8), 'RGBA')
img = img.crop(img.getbbox())
img.save(out)
print(out, img.size)
