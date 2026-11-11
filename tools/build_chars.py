#!/usr/bin/env python3
"""Собирает игровые детали персонажа из нарезки: assets/parts/<имя> -> assets/chars/<имя>.

    python3 tools/build_chars.py vovan dimon

Раскладка листа тела фиксирована шаблоном, поэтому номера деталей одинаковые у всех.
Головы берутся с листа эмоций и приводятся к размеру головы с листа тела.
"""
import json, os, sys
from PIL import Image, ImageEnhance

BODY = {2: 'head_ref', 3: 'neck', 4: 'chest', 5: 'pelvis', 6: 'uarm', 7: 'farm', 8: 'hand_open', 9: 'hand_fist',
        10: 'hand_grip', 11: 'prop', 12: 'thigh', 13: 'shin', 14: 'foot'}
FAR = ['uarm', 'farm', 'hand_open', 'hand_fist', 'hand_grip', 'thigh', 'shin', 'foot']
FACES = ['neutral', 'blink', 'talk', 'yell', 'scared', 'hurt', 'laugh', 'dizzy']
SCALE = 0.5

def shrink(im, k):
    return im.resize((max(1, round(im.width * k)), max(1, round(im.height * k))), Image.LANCZOS)

for name in sys.argv[1:]:
    src, fsrc, out = f'assets/parts/{name}', f'assets/parts/{name}_faces', f'assets/chars/{name}'
    os.makedirs(out, exist_ok=True); rig = {'parts': {}, 'faces': FACES}
    for n, key in BODY.items():
        im = shrink(Image.open(f'{src}/part_{n:02d}.png'), SCALE)
        if key != 'head_ref':
            im.save(f'{out}/{key}.png'); rig['parts'][key] = [im.width, im.height]
            if key in FAR:  # дальняя рука и нога темнее
                r, g, b, a = im.split(); dark = ImageEnhance.Brightness(Image.merge('RGB', (r, g, b))).enhance(0.68); dark.putalpha(a)
                dark.save(f'{out}/{key}_far.png')
        else:
            ref_w = im.width
    meta = json.load(open(f'{fsrc}/parts.json'))
    k = ref_w / (sum(m['mw'] for m in meta) / len(meta))  # масштаб листа эмоций к голове с листа тела
    for m, face in zip(meta, FACES):
        im = shrink(Image.open(f'{fsrc}/part_{m["n"]:02d}.png'), k)
        im.save(f'{out}/head_{face}.png')
        rig['parts'][f'head_{face}'] = [im.width, im.height, round((m['ax'] + 4) * k), round((m['ay'] + 4) * k)]  # якорь: верх шапки
    rig['assembled'] = [round(v * SCALE) for v in json.load(open(f'{src}/parts.json'))[0].values()][3:5]
    shrink(Image.open(f'{src}/part_01.png'), SCALE).save(f'{out}/_assembled.png')
    json.dump(rig, open(f'{out}/rig.json', 'w'), indent=1)
    print(name, rig['parts'])
