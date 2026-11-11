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

if __name__ == '__main__':
    for bg in BGS:
        body_sheet(bg).save(f'assets/templates/tpl_body_{bg}.png')
        faces_sheet(bg).save(f'assets/templates/tpl_faces_{bg}.png')
    print('ok')
