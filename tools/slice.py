#!/usr/bin/env python3
"""Режет лист с частями персонажа на отдельные PNG с прозрачным фоном.

    python3 tools/slice.py assets/raw/zombie.png            # -> assets/parts/zombie/
    python3 tools/slice.py assets/raw/*.png --tol 70

Фон (хромакей) берётся из угла картинки. Каждое отдельное пятно становится файлом
part_NN.png (сверху вниз, слева направо), рядом кладётся _preview.png с номерами
и parts.json с рамками — по ним части привязываются к костям рига.
Нужны только Pillow и numpy.
"""
import argparse, json, os, sys
import numpy as np
from PIL import Image, ImageDraw

def key_alpha(rgb, key, tol):
    d = np.sqrt(((rgb.astype(np.int32) - key) ** 2).sum(-1))
    # мягкий край: 0 у фона, 1 дальше tol*1.6
    return np.clip((d - tol) / (tol * 0.6), 0, 1)

def despill(rgb, alpha, key):
    """Убирает цветную кайму хромакея на полупрозрачных краях."""
    out = rgb.astype(np.float32)
    ch = int(np.argmax(key)) if key.max() - np.sort(key)[1] > 60 else None
    if ch is not None:  # зелёный фон
        others = [i for i in range(3) if i != ch]
        lim = out[..., others].max(-1)
        out[..., ch] = np.minimum(out[..., ch], lim)
    elif key[0] > 180 and key[2] > 180 and key[1] < 90:  # маджента
        lim = out[..., 1] + 40
        edge = alpha < 0.98
        out[..., 0] = np.where(edge, np.minimum(out[..., 0], lim), out[..., 0])
        out[..., 2] = np.where(edge, np.minimum(out[..., 2], lim), out[..., 2])
    return out.clip(0, 255).astype(np.uint8)

def components(mask):
    """Связные области булевой маски -> список (x0, y0, x1, y1, площадь)."""
    h, w = mask.shape
    seen = np.zeros_like(mask, bool)
    boxes = []
    for y0, x0 in zip(*np.nonzero(mask)):
        if seen[y0, x0]:
            continue
        stack = [(y0, x0)]; seen[y0, x0] = True
        ax, ay, bx, by, n = x0, y0, x0, y0, 0
        while stack:
            y, x = stack.pop(); n += 1
            ax, ay, bx, by = min(ax, x), min(ay, y), max(bx, x), max(by, y)
            for ny, nx in ((y + 1, x), (y - 1, x), (y, x + 1), (y, x - 1)):
                if 0 <= ny < h and 0 <= nx < w and mask[ny, nx] and not seen[ny, nx]:
                    seen[ny, nx] = True; stack.append((ny, nx))
        boxes.append((ax, ay, bx + 1, by + 1, n))
    return boxes

def slice_sheet(path, out_root, tol, min_frac, scale, gap):
    name = os.path.splitext(os.path.basename(path))[0]
    im = Image.open(path).convert('RGB')
    rgb = np.asarray(im)
    key = np.median(np.concatenate([rgb[:8, :8].reshape(-1, 3), rgb[-8:, -8:].reshape(-1, 3)]), 0)
    alpha = key_alpha(rgb, key, tol)
    rgba = np.dstack([despill(rgb, alpha, key), (alpha * 255).astype(np.uint8)])
    # ищем пятна на уменьшенной маске; gap склеивает близкие кусочки одной детали
    s = scale
    small = alpha[::s, ::s] > 0.5
    if gap:
        g = max(1, gap // s); pad = np.pad(small, g)
        grown = np.zeros_like(small)
        for dy in range(-g, g + 1):
            for dx in range(-g, g + 1):
                grown |= pad[g + dy:g + dy + small.shape[0], g + dx:g + dx + small.shape[1]]
        small = grown
    boxes = [b for b in components(small) if b[4] >= small.size * min_frac]
    row_h = max(1, small.shape[0] // 8)
    boxes.sort(key=lambda b: (b[1] // row_h, b[0]))
    out = os.path.join(out_root, name); os.makedirs(out, exist_ok=True)
    prev = Image.fromarray(rgba).convert('RGBA'); bg = Image.new('RGBA', prev.size, (40, 30, 60, 255)); bg.alpha_composite(prev)
    dr = ImageDraw.Draw(bg); meta = []
    for i, (x0, y0, x1, y1, _) in enumerate(boxes, 1):
        box = tuple(int(v) for v in (max(0, x0 * s - 2), max(0, y0 * s - 2), min(im.width, x1 * s + 2), min(im.height, y1 * s + 2)))
        Image.fromarray(rgba[box[1]:box[3], box[0]:box[2]]).save(os.path.join(out, f'part_{i:02d}.png'))
        dr.rectangle(box, outline=(255, 225, 74, 255), width=3); dr.text((box[0] + 6, box[1] + 4), str(i), fill=(255, 255, 255, 255))
        meta.append({'file': f'part_{i:02d}.png', 'x': box[0], 'y': box[1], 'w': box[2] - box[0], 'h': box[3] - box[1]})
    bg.convert('RGB').save(os.path.join(out, '_preview.png'))
    json.dump({'source': os.path.basename(path), 'key': [int(v) for v in key], 'parts': meta}, open(os.path.join(out, 'parts.json'), 'w'), indent=1)
    print(f'{name}: {len(boxes)} частей -> {out}')

if __name__ == '__main__':
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('sheets', nargs='+')
    ap.add_argument('--out', default='assets/parts')
    ap.add_argument('--tol', type=float, default=60, help='допуск по цвету фона (больше — агрессивнее вырезает)')
    ap.add_argument('--min', type=float, default=0.0004, dest='min_frac', help='минимальная доля площади, мельче — мусор')
    ap.add_argument('--scale', type=int, default=4, help='во сколько раз уменьшать маску при поиске')
    ap.add_argument('--gap', type=int, default=12, help='склеивать кусочки ближе N пикселей (нимб с головой и т.п.)')
    a = ap.parse_args()
    for p in a.sheets:
        slice_sheet(p, a.out, a.tol, a.min_frac, a.scale, a.gap)
