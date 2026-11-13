#!/usr/bin/env python3
"""Режет собранную фигуру на кости: голова, торс, руки (плечо, предплечье), ноги (бедро, голень, стопа).

    python3 tools/puppets.py            # assets/sprites/<имя>.png -> assets/puppets/<имя>.png + .json

Суставы размечены вручную в процентах от спрайта. Каждый пиксель достаётся ближайшей кости
(расстояние делится на «толщину» кости), у суставов соседние детали перекрываются диском,
чтобы при повороте не было щелей. В покое кукла совпадает с исходным рисунком пиксель в пиксель.
Атлас — лента слоёв шириной в спрайт; порядок слоёв записан в json.
"""
import json, os, sys
import numpy as np
from PIL import Image

# A — рука/нога слева на экране, B — справа. near — какая нога ближе к зрителю.
P = {
 'vovan': dict(dir=1, near='A', neck=(55, 31), top=(50, 3), pelvis=(53, 62), shA=(22, 37), elA=(12, 52), haA=(17, 73), shB=(84, 37), elB=(93, 52), haB=(90, 71),
               hipA=(38, 66), knA=(37, 80), anA=(40, 92), toA=(55, 98), hipB=(68, 66), knB=(70, 79), anB=(78, 90), toB=(93, 96), r=dict(head=.42, torso=.30, arm=.11, leg=.15, foot=.11)),
 'dimon': dict(dir=1, near='A', neck=(52, 29), top=(55, 2), pelvis=(52, 58), shA=(22, 34), elA=(12, 48), haA=(15, 70), shB=(78, 34), elB=(82, 48), haB=(80, 68),
               hipA=(40, 60), knA=(38, 76), anA=(38, 92), toA=(58, 98), hipB=(62, 60), knB=(60, 75), anB=(62, 90), toB=(88, 96), r=dict(head=.40, torso=.24, arm=.08, leg=.11, foot=.10)),
 'zombie': dict(dir=-1, near='B', neck=(40, 27), top=(38, 2), pelvis=(45, 60), shA=(24, 33), elA=(13, 52), haA=(12, 72), shB=(78, 31), elB=(88, 50), haB=(88, 76),
               hipA=(33, 64), knA=(33, 78), anA=(30, 90), toA=(8, 95), hipB=(62, 64), knB=(65, 78), anB=(62, 91), toB=(42, 99), r=dict(head=.36, torso=.30, arm=.10, leg=.15, foot=.11)),
 'alien': dict(dir=-1, near='B', neck=(45, 37), top=(45, 8), pelvis=(52, 66), shA=(35, 43), elA=(27, 58), haA=(22, 78), shB=(75, 43), elB=(85, 58), haB=(88, 80),
               hipA=(45, 68), knA=(40, 80), anA=(38, 90), toA=(12, 97), hipB=(62, 68), knB=(68, 80), anB=(72, 90), toB=(55, 99), r=dict(head=.50, torso=.20, arm=.08, leg=.09, foot=.11)),
 'ballerina': dict(dir=-1, near='B', neck=(42, 31), top=(42, 2), pelvis=(42, 55), hipA=(40, 60), knA=(42, 74), anA=(40, 85), toA=(40, 97), hipB=(50, 60), knB=(52, 74), anB=(58, 88), toB=(60, 99),
               r=dict(head=.30, torso=.34, arm=.08, leg=.07, foot=.06)),
 'tough': dict(dir=-1, near='B', neck=(45, 22), top=(42, 2), pelvis=(48, 57), shA=(18, 35), elA=(10, 52), haA=(10, 72), shB=(80, 33), elB=(90, 52), haB=(82, 74),
               hipA=(38, 62), knA=(37, 76), anA=(33, 90), toA=(15, 95), hipB=(58, 62), knB=(58, 76), anB=(52, 91), toB=(38, 98), r=dict(head=.20, torso=.24, arm=.11, leg=.10, foot=.09)),
}

def seg_dist(px, py, a, b):
    ax, ay, bx, by = *a, *b; dx, dy = bx - ax, by - ay
    t = np.clip(((px - ax) * dx + (py - ay) * dy) / max(1e-6, dx * dx + dy * dy), 0, 1)
    return np.hypot(px - (ax + t * dx), py - (ay + t * dy))

def build(name, cfg, debug_dir=None):
    im = Image.open(f'assets/sprites/{name}.png').convert('RGBA'); W, H = im.size; a = np.asarray(im)
    J = {k: (v[0] * W / 100, v[1] * H / 100) for k, v in cfg.items() if isinstance(v, tuple)}; R = {k: v * W for k, v in cfg['r'].items()}
    J['chest'] = (J['neck'][0], J['neck'][1] + H * cfg.get('drop', 0.07))  # торс начинается ниже шеи, чтобы не резать подбородок
    bones = [('head', 'neck', 'top', R['head'], 'torso'), ('torso', 'chest', 'pelvis', R['torso'], None)]
    for s in 'AB':
        if 'sh' + s in J: bones += [('uarm' + s, 'sh' + s, 'el' + s, R['arm'], 'torso'), ('farm' + s, 'el' + s, 'ha' + s, R['arm'] * 0.95, 'uarm' + s)]
        bones += [('thigh' + s, 'hip' + s, 'kn' + s, R['leg'], 'torso'), ('shin' + s, 'kn' + s, 'an' + s, R['leg'] * 0.85, 'thigh' + s), ('foot' + s, 'an' + s, 'to' + s, R['foot'], 'shin' + s)]
    yy, xx = np.mgrid[0:H, 0:W]; opaque = a[..., 3] > 8
    D = np.stack([seg_dist(xx, yy, J[b[1]], J[b[2]]) / b[3] for b in bones]); owner = D.argmin(0)
    idx = {b[0]: i for i, b in enumerate(bones)}; masks = [(owner == i) & opaque for i in range(len(bones))]
    out = [m.copy() for m in masks]
    for i, (bn, j0, j1, r, parent) in enumerate(bones):  # перекрытие в суставе: диск вокруг точки крепления
        if parent is None: continue
        disc = np.hypot(xx - J[j0][0], yy - J[j0][1]) < (W * 0.13 if bn == 'head' else r * 1.25)
        out[i] |= masks[idx[parent]] & disc; out[idx[parent]] |= masks[i] & disc
    atlas = Image.new('RGBA', (W * len(bones), H))
    for i, m in enumerate(out):
        layer = a.copy(); layer[..., 3] = np.where(m, a[..., 3], 0); atlas.paste(Image.fromarray(layer), (i * W, 0))
    os.makedirs('assets/puppets', exist_ok=True); atlas.save(f'assets/puppets/{name}.png')
    # рамка головы — весь непрозрачный силуэт выше шеи (уши, шапка, антенна), а не только маска кости
    top = opaque[:int(J['neck'][1])]; hy, hx = np.nonzero(top); head_box = [int(hx.min()), int(hy.min()), int(hx.max()), int(J['neck'][1])]
    meta = dict(w=W, h=H, dir=cfg['dir'], near=cfg['near'], headBox=head_box, joints={k: [round(v[0], 1), round(v[1], 1)] for k, v in J.items()},
                bones=[dict(name=b[0], pivot=b[1], end=b[2], parent=b[4]) for b in bones])
    json.dump(meta, open(f'assets/puppets/{name}.json', 'w'))
    if debug_dir:
        rng = np.random.RandomState(3); cols = rng.randint(60, 255, (len(bones), 3)); dbg = (a[..., :3] * 0.45 + cols[owner] * 0.55).astype(np.uint8); dbg[~opaque] = (40, 30, 60)
        d = Image.fromarray(dbg).resize((W * 2, H * 2), Image.NEAREST)
        from PIL import ImageDraw
        dr = ImageDraw.Draw(d)
        for b in bones: dr.line((J[b[1]][0] * 2, J[b[1]][1] * 2, J[b[2]][0] * 2, J[b[2]][1] * 2), fill=(255, 255, 255), width=3)
        for p in J.values(): dr.ellipse((p[0] * 2 - 4, p[1] * 2 - 4, p[0] * 2 + 4, p[1] * 2 + 4), fill=(255, 0, 0))
        d.save(os.path.join(debug_dir, f'seg_{name}.png'))
    print(name, W, H, len(bones), 'костей')

if __name__ == '__main__':
    dbg = sys.argv[1] if len(sys.argv) > 1 else None
    for n, cfg in P.items(): build(n, cfg, dbg)
