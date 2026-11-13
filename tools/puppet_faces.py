#!/usr/bin/env python3
"""Лица глюков для подмены головы: assets/parts/<лист>_faces -> assets/puppets/faces/<кукла>_<эмоция>.png

    python3 tools/cut.py assets/raw/zombie_faces.jpg --grid 4x2 --flip   # сначала нарезка (лицом вправо)
    python3 tools/puppet_faces.py

Лица масштабируются под ширину головы куклы (headBox из assets/puppets/<кукла>.json).
"""
import json, os
from PIL import Image
FACES = ['neutral', 'blink', 'bite', 'chew', 'hurt', 'furious', 'stunned', 'fading']
SRC = {'zombie': 'zombie_faces', 'alien': 'alien_faces', 'ballerina': 'ballerina_faces', 'tough': 'zombie_tough_faces'}
os.makedirs('assets/puppets/faces', exist_ok=True)
for pup, sheet in SRC.items():
    meta = json.load(open(f'assets/parts/{sheet}/parts.json'))
    meta = meta[3::-1] + meta[7:3:-1]  # лист нарезан зеркально: в каждом ряду колонки идут справа налево
    hb = json.load(open(f'assets/puppets/{pup}.json'))['headBox']
    k = (hb[2] - hb[0]) / (sum(m['mw'] for m in meta) / len(meta))
    for m, f in zip(meta, FACES):
        im = Image.open(f'assets/parts/{sheet}/part_{m["n"]:02d}.png'); im = im.resize((max(1, round(im.width * k)), max(1, round(im.height * k))), Image.LANCZOS)
        im.save(f'assets/puppets/faces/{pup}_{f}.png')
    print(pup, round(k, 3), len(meta))

# Подгонка: масштаб и сдвиг нейтрального лица, при которых его силуэт лучше всего совпадает с головой куклы (IoU).
import numpy as np
for pup in SRC:
    meta = json.load(open(f'assets/puppets/{pup}.json')); x0, y0, x1, y1 = meta['headBox']; W = meta['w']
    sprite = np.asarray(Image.open(f'assets/sprites/{pup}.png').convert('RGBA'))[..., 3] > 40
    head = sprite[:y1].copy(); face = Image.open(f'assets/puppets/faces/{pup}_neutral.png')
    best = (0, 1, 0, 0)
    for s in np.arange(0.7, 1.9, 0.04):
        w = (x1 - x0) * s; fw, fh = max(1, round(w)), max(1, round(w * face.height / face.width))
        fm = np.asarray(face.resize((fw, fh)))[..., 3] > 40
        for dy in range(-30, 31, 3):
            for dx in range(-24, 25, 3):
                left, top = round((x0 + x1) / 2 - fw / 2 + dx), y0 + dy
                canvas = np.zeros_like(head)
                a0, b0 = max(0, top), max(0, left); a1, b1 = min(head.shape[0], top + fh), min(head.shape[1], left + fw)
                if a1 <= a0 or b1 <= b0: continue
                canvas[a0:a1, b0:b1] = fm[a0 - top:a1 - top, b0 - left:b1 - left]
                iou = (canvas & head).sum() / max(1, (canvas | head).sum())
                if iou > best[0]: best = (iou, s, dx, dy)
    meta['faceFit'] = [round(float(best[1]), 3), int(best[2]), int(best[3])]
    json.dump(meta, open(f'assets/puppets/{pup}.json', 'w'))
    print(pup, 'IoU', round(float(best[0]), 3), 'fit', meta['faceFit'])
