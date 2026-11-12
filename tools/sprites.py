#!/usr/bin/env python3
"""Достаёт готовые спрайты с листов: область листа -> один PNG с прозрачным фоном.

    python3 tools/sprites.py        # assets/raw/*.jpg -> assets/sprites/*.png

Область задаётся долями листа (x0, y0, x1, y1); в спрайт попадают все пятна, чей центр внутри неё.
"""
import os, sys
import numpy as np
from PIL import Image, ImageFilter
sys.path.insert(0, os.path.dirname(__file__))
from cut import background, components

# имя спрайта: (лист, область, высота в пикселях)
SPRITES = {
    'vovan': ('vovan', (0, 0, 0.3, 1), 360), 'dimon': ('dimon', (0, 0, 0.3, 1), 400),
    'zombie': ('zombie', (0.66, 0, 1, 1), 340), 'alien': ('alien', (0.74, 0, 1, 1), 320),
    'ballerina': ('ballerina', (0.66, 0, 1, 1), 340), 'tough': ('zombie_tough', (0.72, 0, 1, 1), 400),
    'kettle': ('cat', (0, 0, 0.21, 0.31), 220), 'kettle_blow': ('cat', (0.41, 0.31, 0.6, 0.58), 220), 'kettle_pop': ('cat', (0, 0.58, 0.24, 0.87), 240),
    'doshik_0': ('doshik', (0, 0, 0.34, 1), 200), 'doshik_1': ('doshik', (0.34, 0, 0.64, 1), 240), 'doshik_2': ('doshik', (0.64, 0, 1, 1), 280),
    'fridge_0': ('fridge', (0, 0, 0.345, 1), 300), 'fridge_1': ('fridge', (0.345, 0, 0.645, 1), 300), 'fridge_2': ('fridge', (0.645, 0, 1, 1), 300),
    'roomba': ('roomba', (0, 0, 0.47, 1), 120), 'roomba_on': ('roomba', (0.47, 0, 1, 1), 150),
    'bulb': ('fx', (0, 0, 0.145, 0.25), 150), 'slipper': ('fx', (0.4, 0, 0.58, 0.22), 90),
    'boom_0': ('fx', (0.03, 0.3, 0.16, 0.5), 110), 'boom_1': ('fx', (0.18, 0.28, 0.33, 0.5), 160), 'boom_2': ('fx', (0.35, 0.25, 0.5, 0.5), 220), 'boom_3': ('fx', (0.53, 0.22, 0.74, 0.5), 260), 'boom_4': ('fx', (0.75, 0.2, 1, 0.5), 280),
    'puff_0': ('fx', (0.02, 0.5, 0.17, 0.75), 200), 'puff_1': ('fx', (0.19, 0.5, 0.34, 0.75), 200), 'puff_2': ('fx', (0.36, 0.5, 0.52, 0.75), 200), 'puff_3': ('fx', (0.55, 0.5, 0.72, 0.75), 180),
    'stars': ('fx', (0.02, 0.76, 0.18, 1), 120), 'splash': ('fx', (0.37, 0.76, 0.54, 1), 120), 'dust': ('fx', (0.68, 0.76, 0.83, 1), 140),
}
cache = {}
def sheet(name):
    if name not in cache:
        rgb = np.asarray(Image.open(f'assets/raw/{name}.jpg').convert('RGB'))
        fg = Image.fromarray((~background(rgb) * 255).astype(np.uint8)).filter(ImageFilter.MinFilter(5))
        H, W = rgb.shape[:2]
        cache[name] = (np.dstack([rgb, np.asarray(fg.filter(ImageFilter.GaussianBlur(0.8)))]), [c for c in components(np.asarray(fg) > 127) if c[4] > W * H * 0.00015])
    return cache[name]

os.makedirs('assets/sprites', exist_ok=True)
for out, (src, (x0, y0, x1, y1), h) in SPRITES.items():
    rgba, comps = sheet(src); H, W = rgba.shape[:2]
    inside = [c for c in comps if x0 * W <= (c[0] + c[2]) / 2 < x1 * W and y0 * H <= (c[1] + c[3]) / 2 < y1 * H]
    if not inside: print('ПУСТО', out); continue
    b = [min(c[0] for c in inside) - 4, min(c[1] for c in inside) - 4, max(c[2] for c in inside) + 4, max(c[3] for c in inside) + 4]
    im = Image.fromarray(rgba[max(0, b[1]):b[3], max(0, b[0]):b[2]])
    k = h / im.height; im = im.resize((max(1, round(im.width * k)), h), Image.LANCZOS); im.save(f'assets/sprites/{out}.png')
    print(out, im.size, len(inside))
# фон и обложка: обрезаем белую рваную кромку
for name, inset in (('bg_yard_night', (48, 34)), ('style_anchor', (44, 32))):
    im = Image.open(f'assets/raw/{name}.jpg'); im = im.crop((inset[0], inset[1], im.width - inset[0], im.height - inset[1])).resize((1920, 1080), Image.LANCZOS); im.save(f'assets/sprites/{name}.jpg', quality=86)
