#!/usr/bin/env python3
"""Рисует шаблоны раскладки для генератора: серые манекены на нужном фоне.

    python3 tools/templates.py   # -> assets/templates/*.png

Шаблон прикладывается к промту как картинка: генератор копирует расположение
деталей, а не только читает текст. Текста на шаблонах нет специально.
"""
from PIL import Image, ImageDraw

OUT, FILL, SHADE = (27, 16, 48), (214, 210, 222), (176, 170, 190)
BGS = {'magenta': (255, 0, 255), 'green': (0, 255, 0)}
W, H, LW = 1920, 1080, 7

def cap(d, x, y, w, h, fill=FILL):
    """Вертикальная деталь конечности: сустав сверху, скруглённые концы."""
    d.rounded_rectangle((x - w // 2, y, x + w // 2, y + h), w // 2, fill=fill, outline=OUT, width=LW)

def head(d, cx, cy, s=1.0):
    """Голова 3/4 вправо: овал, нос и ухо, шапка без полей сверху."""
    r = int(118 * s)
    d.ellipse((cx - r, cy - r, cx + r, cy + int(r * 1.05)), fill=FILL, outline=OUT, width=LW)
    d.chord((cx - r - 4, cy - r - 30 * s, cx + r + 4, cy + r * 0.5), 180, 360, fill=SHADE, outline=OUT, width=LW)
    d.ellipse((cx + r * 0.25, cy - r * 0.05, cx + r * 0.55, cy + r * 0.3), outline=OUT, width=LW - 2)
    d.ellipse((cx + r * 0.62, cy - r * 0.05, cx + r * 0.9, cy + r * 0.3), outline=OUT, width=LW - 2)
    d.polygon([(cx + r * 0.95, cy + r * 0.25), (cx + r * 1.12, cy + r * 0.45), (cx + r * 0.92, cy + r * 0.52)], fill=FILL, outline=OUT)
    d.arc((cx - r * 0.62, cy + r * 0.02, cx - r * 0.3, cy + r * 0.42), 90, 270, fill=OUT, width=LW - 2)
    d.line((cx + r * 0.35, cy + r * 0.7, cx + r * 0.75, cy + r * 0.65), fill=OUT, width=LW - 2)

def chest(d, x, y):
    d.rounded_rectangle((x, y, x + 230, y + 230), 60, fill=FILL, outline=OUT, width=LW)
    d.ellipse((x + 70, y - 22, x + 160, y + 26), fill=SHADE, outline=OUT, width=LW - 2)  # гнездо шеи

def pelvis(d, x, y):
    """Таз как короткие трусы: пояс сверху, два круглых гнезда под бёдра снизу."""
    d.rounded_rectangle((x, y, x + 230, y + 110), 40, fill=FILL, outline=OUT, width=LW)
    d.line((x + 115, y + 60, x + 115, y + 110), fill=OUT, width=LW - 2)
    d.line((x + 8, y + 30, x + 222, y + 30), fill=OUT, width=LW - 3)

def hand(d, x, y, kind):
    if kind == 'open':
        d.rounded_rectangle((x, y, x + 70, y + 80), 26, fill=FILL, outline=OUT, width=LW)
        for i in range(4):
            d.rounded_rectangle((x + 4 + i * 16, y + 60, x + 18 + i * 16, y + 120), 7, fill=FILL, outline=OUT, width=4)
        d.rounded_rectangle((x + 58, y + 20, x + 92, y + 46), 12, fill=FILL, outline=OUT, width=4)
    elif kind == 'fist':
        d.rounded_rectangle((x, y, x + 80, y + 95), 30, fill=FILL, outline=OUT, width=LW)
        for i in range(3):
            d.line((x + 6, y + 40 + i * 18, x + 40, y + 40 + i * 18), fill=OUT, width=4)
    else:  # хват под рукоятку
        d.rounded_rectangle((x, y, x + 80, y + 95), 30, fill=FILL, outline=OUT, width=LW)
        d.ellipse((x + 22, y + 38, x + 58, y + 74), fill=BG_NOW, outline=OUT, width=5)

def foot(d, x, y):
    d.rounded_rectangle((x, y, x + 64, y + 70), 28, fill=FILL, outline=OUT, width=LW)
    d.rounded_rectangle((x - 6, y + 50, x + 130, y + 104), 26, fill=SHADE, outline=OUT, width=LW)

def body_sheet(bg):
    global BG_NOW
    BG_NOW = BGS[bg]
    im = Image.new('RGB', (W, H), BGS[bg]); d = ImageDraw.Draw(im)
    # собранная фигура слева, 3/4 вправо: задняя рука и нога темнее
    cx = 260
    cap(d, cx + 30, 560, 74, 175, SHADE); cap(d, cx + 30, 720, 64, 175, SHADE); foot(d, cx, 880)
    cap(d, cx + 40, 330, 66, 165, SHADE)
    pelvis(d, cx - 105, 520)
    chest(d, cx - 105, 300)
    d.rounded_rectangle((cx - 30, 255, cx + 30, 320), 26, fill=FILL, outline=OUT, width=LW)
    head(d, cx, 160, 0.95)
    cap(d, cx - 20, 560, 74, 175); cap(d, cx - 20, 720, 64, 175); foot(d, cx - 50, 880)
    cap(d, cx - 95, 330, 66, 165); cap(d, cx - 95, 480, 58, 160); hand(d, cx - 130, 625, 'open')
    # детали справа: ряд 1 — голова, шея, грудь, таз
    head(d, 760, 200)
    d.rounded_rectangle((990, 140, 1060, 240), 30, fill=FILL, outline=OUT, width=LW)
    chest(d, 1140, 90)
    pelvis(d, 1480, 140)
    # ряд 2 — рука: плечо, предплечье, кисти
    cap(d, 700, 420, 66, 210); cap(d, 860, 420, 58, 200)
    hand(d, 990, 450, 'open'); hand(d, 1150, 450, 'fist'); hand(d, 1310, 450, 'grip')
    # ряд 3 — нога: бедро, голень, стопа
    cap(d, 700, 720, 74, 220); cap(d, 860, 720, 64, 220); foot(d, 990, 800)
    return im

def faces_sheet(bg):
    im = Image.new('RGB', (W, H), BGS[bg]); d = ImageDraw.Draw(im)
    for i in range(8):
        head(d, 270 + (i % 4) * 460, 290 + (i // 4) * 500, 1.15)
    return im

def items_sheet(bg):
    """4 колонки = 4 предмета; сверху покой, снизу действие (с «вспышкой» справа)."""
    im = Image.new('RGB', (W, H), BGS[bg]); d = ImageDraw.Draw(im)
    for i in range(4):
        cx = 240 + i * 480
        for row, cy in enumerate((300, 800)):
            d.rounded_rectangle((cx - 120, cy - 150, cx + 120, cy + 150), 40, fill=FILL, outline=OUT, width=LW)
            d.ellipse((cx - 50, cy - 60, cx - 20, cy - 25), outline=OUT, width=LW - 2); d.ellipse((cx + 10, cy - 60, cx + 40, cy - 25), outline=OUT, width=LW - 2)
            d.arc((cx - 35, cy - 10, cx + 35, cy + 35), 20, 160, fill=OUT, width=LW - 2)
            d.rounded_rectangle((cx - 90, cy + 150, cx + 90, cy + 175), 12, fill=SHADE, outline=OUT, width=LW - 2)
            if row:
                d.polygon([(cx + 130, cy - 40), (cx + 215, cy - 80), (cx + 190, cy - 10), (cx + 230, cy + 20), (cx + 140, cy + 20)], fill=SHADE, outline=OUT)
    return im

if __name__ == '__main__':
    for bg in BGS:
        items_sheet(bg).save(f'assets/templates/tpl_items_{bg}.png')
        for kind, im in (('body', body_sheet(bg)), ('faces', faces_sheet(bg))):
            im.save(f'assets/templates/tpl_{kind}_{bg}.png')
            # для глюков: фигура смотрит влево, собранная фигура справа
            im.transpose(Image.FLIP_LEFT_RIGHT).save(f'assets/templates/tpl_{kind}_{bg}_left.png')
    print('ok')


# ---------- развёртка и лист деталей (новая схема) ----------
import math
def capsule(d, x, y, w, h, ang=0, fill=FILL):
    """Капсула длиной h от точки (x, y) вниз, повёрнутая на ang градусов вокруг верхнего конца."""
    a = math.radians(ang); dx, dy = math.sin(a), math.cos(a); nx, ny = dy, -dx; r = w / 2
    pts = [(x + nx * r, y + ny * r), (x + nx * r + dx * h, y + ny * r + dy * h), (x - nx * r + dx * h, y - ny * r + dy * h), (x - nx * r, y - ny * r)]
    d.polygon(pts, fill=fill, outline=OUT, width=LW)
    for cx, cy in ((x, y), (x + dx * h, y + dy * h)): d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=fill, outline=OUT, width=LW)

def figure(d, cx, view, s=1.0):
    """Фигура в A-позе: view = front | three | side | back. Земля на y=1000."""
    g, H = 1000, 860 * s; head_r = 70 * s; top = g - H
    tw = {'front': 150, 'three': 125, 'side': 85, 'back': 150}[view] * s
    sh = top + 2 * head_r + 25 * s
    for side in ((-1, 1) if view != 'side' else (1,)):  # ноги
        lx = cx + side * tw * 0.22 if view != 'side' else cx
        hip = sh + 300 * s; L = (g - 34 * s - hip) / 2
        capsule(d, lx, hip, 46 * s, L, 0); capsule(d, lx, hip + L, 40 * s, L, 0)
        if view == 'side': d.rounded_rectangle((lx - 25 * s, g - 30 * s, lx + 70 * s, g), 12, fill=SHADE, outline=OUT, width=LW)
        else: d.rounded_rectangle((lx - 32 * s, g - 30 * s, lx + 32 * s, g), 12, fill=SHADE, outline=OUT, width=LW)
    d.rounded_rectangle((cx - tw / 2, sh, cx + tw / 2, sh + 330 * s), 40, fill=FILL, outline=OUT, width=LW)  # торс и таз
    d.line((cx - tw / 2 + 8, sh + 230 * s, cx + tw / 2 - 8, sh + 230 * s), fill=OUT, width=LW - 3)
    arms = {'front': (-1, 1), 'back': (-1, 1), 'three': (-1, 1), 'side': (1,)}[view]
    for side in arms:  # руки в A-позе: на ~20° от тела
        ax = cx + side * (tw / 2 + 14 * s) if view != 'side' else cx; ang = side * 20 if view != 'side' else 0; a = math.radians(ang)
        capsule(d, ax, sh + 20 * s, 40 * s, 150 * s, ang)
        ex, ey = ax + math.sin(a) * 150 * s, sh + 20 * s + math.cos(a) * 150 * s
        capsule(d, ex, ey, 36 * s, 140 * s, ang)
    d.rounded_rectangle((cx - 18 * s, sh - 30 * s, cx + 18 * s, sh + 10 * s), 10, fill=FILL, outline=OUT, width=LW)
    d.ellipse((cx - head_r, top, cx + head_r, top + 2 * head_r), fill=FILL, outline=OUT, width=LW)
    d.chord((cx - head_r - 4, top - 20 * s, cx + head_r + 4, top + head_r * 1.1), 180, 360, fill=SHADE, outline=OUT, width=LW)
    if view in ('front', 'three'):
        off = 0 if view == 'front' else 20 * s
        for ex in (-25, 25): d.ellipse((cx + ex * s + off - 9, top + 75 * s, cx + ex * s + off + 9, top + 95 * s), outline=OUT, width=4)
    if view == 'side': d.polygon([(cx + head_r - 4, top + 85 * s), (cx + head_r + 18 * s, top + 100 * s), (cx + head_r - 4, top + 110 * s)], fill=FILL, outline=OUT)

def turn_sheet(bg):
    im = Image.new('RGB', (W, H), BGS[bg]); d = ImageDraw.Draw(im)
    for i, view in enumerate(('front', 'three', 'side', 'back')): figure(d, 240 + i * 480, view, 1.0)
    return im

def hand2(d, x, y, kind):
    if kind == 'point':
        d.rounded_rectangle((x, y, x + 76, y + 90), 30, fill=FILL, outline=OUT, width=LW)
        d.rounded_rectangle((x + 60, y + 18, x + 140, y + 42), 12, fill=FILL, outline=OUT, width=5)
    else: hand(d, x, y, kind)

def rig_sheet(bg):
    global BG_NOW
    BG_NOW = BGS[bg]
    im = Image.new('RGB', (W, H), BGS[bg]); d = ImageDraw.Draw(im)
    # ряд 1: торс спереди, торс сбоку, таз сбоку, шея
    d.rounded_rectangle((120, 60, 400, 320), 60, fill=FILL, outline=OUT, width=LW); d.ellipse((215, 38, 305, 82), fill=SHADE, outline=OUT, width=LW - 2)
    for sx in (120, 400): d.ellipse((sx - 40, 80, sx + 40, 160), fill=SHADE, outline=OUT, width=LW - 2)
    d.rounded_rectangle((560, 60, 740, 320), 55, fill=FILL, outline=OUT, width=LW); d.ellipse((610, 38, 690, 82), fill=SHADE, outline=OUT, width=LW - 2); d.ellipse((610, 80, 690, 160), fill=SHADE, outline=OUT, width=LW - 2)
    pelvis(d, 880, 150)
    d.rounded_rectangle((1260, 140, 1330, 240), 30, fill=FILL, outline=OUT, width=LW)
    # ряд 2: плечо, предплечье, четыре кисти
    capsule(d, 200, 420, 70, 200); capsule(d, 360, 420, 62, 190)
    for i, k in enumerate(('open', 'fist', 'grip', 'point')): hand2(d, 520 + i * 190, 470, k)
    # ряд 3: бедро, голень, стопа сбоку, стопа спереди
    capsule(d, 200, 720, 78, 220); capsule(d, 360, 720, 68, 220); foot(d, 520, 820)
    d.rounded_rectangle((760, 790, 840, 860), 28, fill=FILL, outline=OUT, width=LW); d.rounded_rectangle((735, 840, 865, 905), 26, fill=SHADE, outline=OUT, width=LW)
    return im

for bg in BGS:
    for kind, im in (('turn', turn_sheet(bg)), ('rig', rig_sheet(bg))):
        im.save(f'assets/templates/tpl_{kind}_{bg}.png'); im.transpose(Image.FLIP_LEFT_RIGHT).save(f'assets/templates/tpl_{kind}_{bg}_left.png')
