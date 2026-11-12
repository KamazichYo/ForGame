#!/usr/bin/env python3
"""Вырезает детали с листа: убирает хромакей вместе с белой «наклеечной» обводкой.

    python3 tools/cut.py assets/raw/vovan.jpg            # лист тела -> assets/parts/vovan/
    python3 tools/cut.py assets/raw/vovan_faces.jpg --grid 4x2   # эмоции по сетке

Фон = всё, что похоже на хромакей, белое или их смесь И связано с краем листа.
Белое внутри контура (кроссовки, глаза) не трогается: заливка не проходит через обводку.
"""
import argparse, json, os
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

def background(rgb):
    r, g, b = [rgb[..., i].astype(int) for i in range(3)]
    key = rgb[4:40, 4:40].reshape(-1, 3).mean(0)
    if key[1] > key[0]:   # зелёный: смесь зелёного с белым
        cand = (g > 190) & (abs(r - b) < 60) & (g >= r - 8) & (g >= b - 8)
    else:                 # маджента: смесь мадженты с белым
        cand = (r > 190) & (b > 190) & (abs(r - b) < 60)
    if key.max() < 235: cand[:] = False  # тусклый фон: правило «смесь с белым» съело бы светлую одежду
    cand |= np.abs(rgb.astype(int) - key).sum(-1) < 110  # тусклый или неровный фон: всё, что близко к цвету угла
    im = Image.fromarray((cand * 255).astype(np.uint8)).copy()
    h, w = cand.shape
    for x, y in [(2, 2), (w - 3, 2), (2, h - 3), (w - 3, h - 3), (w // 2, 2), (w // 2, h - 3)]:
        if im.getpixel((x, y)) == 255:
            ImageDraw.floodfill(im, (x, y), 128)
    # замкнутые дырки (ручка чайника, просвет между ног): чистый хромакей внутри контура
    dist = np.abs(rgb.astype(int) - key).sum(-1)
    for _ in range(40):
        left = (dist < 90) & (np.asarray(im) == 255)
        ys, xs = np.nonzero(left)
        if len(ys) < 200:
            break
        ImageDraw.floodfill(im, (int(xs[len(xs) // 2]), int(ys[len(ys) // 2])), 128)
    return np.asarray(im) == 128

def components(mask, s=4):
    small = mask[::s, ::s]; h, w = small.shape; seen = np.zeros_like(small); out = []
    for y0, x0 in zip(*np.nonzero(small)):
        if seen[y0, x0]: continue
        st = [(y0, x0)]; seen[y0, x0] = True; ax, ay, bx, by, n = x0, y0, x0, y0, 0
        while st:
            y, x = st.pop(); n += 1; ax, ay, bx, by = min(ax, x), min(ay, y), max(bx, x), max(by, y)
            for ny, nx in ((y + 1, x), (y - 1, x), (y, x + 1), (y, x - 1)):
                if 0 <= ny < h and 0 <= nx < w and small[ny, nx] and not seen[ny, nx]:
                    seen[ny, nx] = True; st.append((ny, nx))
        out.append([int(v) for v in (ax * s, ay * s, (bx + 1) * s, (by + 1) * s, n * s * s)])
    return out

def main():
    ap = argparse.ArgumentParser(); ap.add_argument('sheet'); ap.add_argument('--out', default='assets/parts'); ap.add_argument('--grid'); ap.add_argument('--flip', action='store_true', help='отразить лист: глюки нарисованы лицом влево, риг ждёт вправо')
    a = ap.parse_args(); name = os.path.splitext(os.path.basename(a.sheet))[0]
    src = Image.open(a.sheet).convert('RGB')
    if a.flip: src = src.transpose(Image.FLIP_LEFT_RIGHT)
    rgb = np.asarray(src); H, W = rgb.shape[:2]
    fg = Image.fromarray((~background(rgb) * 255).astype(np.uint8)).filter(ImageFilter.MinFilter(5))
    alpha = fg.filter(ImageFilter.GaussianBlur(0.8)); solid = np.asarray(fg) > 127
    rgba = np.dstack([rgb, np.asarray(alpha)]); out = os.path.join(a.out, name); os.makedirs(out, exist_ok=True)
    comps = [c for c in components(solid) if c[4] > W * H * 0.0003]
    boxes = []
    if a.grid:  # эмоции: по ячейкам сетки; якорь — верх шапки главного пятна
        gx, gy = map(int, a.grid.split('x'))
        for j in range(gy):
            for i in range(gx):
                cell = [c for c in comps if i * W / gx <= (c[0] + c[2]) / 2 < (i + 1) * W / gx and j * H / gy <= (c[1] + c[3]) / 2 < (j + 1) * H / gy]
                m = max(cell, key=lambda c: c[4]); box = [min(c[0] for c in cell), min(c[1] for c in cell), max(c[2] for c in cell), max(c[3] for c in cell)]
                top = solid[m[1]:m[1] + (m[3] - m[1]) // 3, m[0]:m[2]]; xs = np.nonzero(top.any(0))[0]; ys = np.nonzero(top.any(1))[0]
                boxes.append((box, {'ax': int(m[0] + xs.mean() - box[0]), 'ay': int(m[1] + ys.min() - box[1]), 'mw': m[2] - m[0], 'mh': m[3] - m[1]}))
    else:
        comps.sort(key=lambda c: (c[1] // (H // 6), c[0])); boxes = [(c[:4], {}) for c in comps]
    prev = Image.new('RGB', (W, H), (40, 30, 60)); prev.paste(Image.fromarray(rgba), (0, 0), Image.fromarray(rgba[..., 3])); d = ImageDraw.Draw(prev); meta = []
    for n, (b, extra) in enumerate(boxes, 1):
        b = [max(0, b[0] - 4), max(0, b[1] - 4), min(W, b[2] + 4), min(H, b[3] + 4)]
        Image.fromarray(rgba[b[1]:b[3], b[0]:b[2]]).save(os.path.join(out, f'part_{n:02d}.png'))
        d.rectangle(b, outline=(255, 225, 74), width=3); d.text((b[0] + 8, b[1] + 6), str(n), fill=(255, 255, 255), font_size=48)
        meta.append({'n': n, 'x': b[0], 'y': b[1], 'w': b[2] - b[0], 'h': b[3] - b[1], **extra})
    prev.resize((W // 2, H // 2)).save(os.path.join(out, '_preview.png')); json.dump(meta, open(os.path.join(out, 'parts.json'), 'w'), indent=1)
    print(name, len(meta), [(m['n'], m['w'], m['h']) for m in meta])

if __name__ == '__main__':
    main()
