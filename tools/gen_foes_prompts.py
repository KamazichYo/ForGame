#!/usr/bin/env python3
"""Промты развёртки персонажей по гайду Nano Banana Pro: пилот (Вован) и новые глюки из data/foes.json.

    python3 tools/gen_foes_prompts.py

На персонажа три листа: развёртка (_turn), детали для рига (_rig), эмоции (_emote).
Пишет разделы между маркерами <!-- pilot:start/end --> и <!-- foes:start/end --> в docs/PROMPTS.md.
"""
import json, re

BG = {'magenta': 'pure magenta #FF00FF', 'green': 'pure chroma green #00FF00'}
RU_BG = {'magenta': 'маджента', 'green': 'зелёный'}
LINE = 'thick uneven dark-purple #1B1030 marker outlines, faint paper grain inside the fills, no white sticker border'
FLAT = 'flat even light with one hard cel-shading step and no cast shadows'

def turn(c, v):
    halo = ' As a hallucination the character carries a thin solid neon pink-and-cyan rim line just inside the dark outline in every view, with no soft glow.' if c['halo'] else ''
    base = (f"A character turnaround sheet in a grimy underground-comix sticker style, 16:9, made as a construction reference for rigging a 2D game puppet. "
            f"Copy the attached grey template exactly: four full-body views of the same character standing side by side on one invisible ground line, all at the identical height and evenly spaced — in the left quarter the front view, then a three-quarter view turned to the {c['dir'].lower()}, then a strict side profile facing {c['dir'].lower()}, and in the right quarter the back view. "
            f"In every view the character stands in a relaxed A-pose with both arms held about twenty degrees away from the body so the hands never overlap the torso, feet shoulder-width apart. "
            f"The character is {c['look']}. {c['physics'][0].upper() + c['physics'][1:]}, and these folds stay consistent from view to view.{halo} ")
    if v == 1:
        tail = f"Every view uses the same {FLAT}, so the four figures read as one model; {LINE}. "
    elif v == 2:
        tail = (f"Draw it like an orthographic model sheet: no perspective, no foreshortening, the top of the head, the shoulders, the waist, the knees and the soles line up exactly across all four views, and parts hidden in one view are still drawn where they belong in the others. Use {FLAT}; {LINE}. ")
    else:
        tail = (f"Push the tactile print look: marker ink pools slightly at the ends of strokes, the paper tooth shows through the flat fills, fabric carries a flat hand-drawn weave or knit pattern, and each flat color sits slightly off its outline like a cheap print, while the background stays perfectly clean. Use {FLAT}; {LINE}. ")
    return base + tail + f"The background is one perfectly flat {BG[c['bg']]} reaching all four edges, with no floor, text, labels, numbers or arrows. Wide 16:9 sheet, 4K."

def rig(c, v):
    halo = ' As a hallucination every piece carries a thin solid neon pink-and-cyan rim line just inside the dark outline, with no soft glow.' if c['halo'] else ''
    base = (f"A cut-out puppet parts sheet in a grimy underground-comix sticker style, 16:9, that takes the character from the attached turnaround apart for skeletal animation, every piece at exactly the scale of the turnaround figures. "
            f"Copy the attached grey template: three rows with wide empty gaps so nothing touches. "
            f"Top row, left to right: the torso seen from the front with the neck hole and both shoulder sockets, the same torso in side profile facing {c['dir'].lower()}, the pelvis in side profile as a short briefs-like block cut from the trousers with two round hip sockets and no trouser legs, and a short neck cylinder. "
            f"Middle row: an upper arm from shoulder to elbow and a forearm from elbow to wrist, both hanging perfectly straight and vertical, then four hands in side view — open and relaxed, a clenched fist, gripping a round handle with an empty hole through the grip, and pointing forward with the index finger. "
            f"Bottom row: a thigh from hip to knee and a shin from knee to ankle, both straight and vertical, then the foot in side profile with the toes toward the {c['dir'].lower()}, and the same foot seen from the front. "
            f"The character is {c['look'].split(',')[0].split(';')[0]} from the attached turnaround; {c['split']}. Props laid out at the far right of the middle and bottom rows: {c['props']}.{halo} ")
    if v == 1:
        tail = (f"Every piece is drawn complete, including the part normally hidden under its neighbour, and every joint end — shoulder, elbow, wrist, hip, knee, ankle and both ends of the neck — is a fully rounded cap that runs a little past the joint, so pieces overlap without gaps when they rotate. Use {FLAT}; {LINE}. ")
    elif v == 2:
        tail = (f"Count the pieces: exactly four in the top row, six in the middle row, four in the bottom row, plus the props; no duplicates, no second arm or leg, no head. Each limb piece is a straight vertical capsule with a rounded cap at both ends that runs past the joint, drawn complete including the hidden overlap area. Use {FLAT}; {LINE}. ")
    else:
        tail = (f"Every piece is complete with rounded joint caps that run past the joint. Push the tactile look: fabric shows a flat hand-drawn weave or knit pattern, cut edges of sleeves and trouser legs show a few loose threads, marker ink pools at the stroke ends, and paper tooth shows through the fills, while the background stays perfectly clean. Use {FLAT}; {LINE}. ")
    return base + tail + f"The background is one perfectly flat {BG[c['bg']]} reaching all four edges, with no text, labels, numbers or guide lines. Wide 16:9 sheet, 4K."

def emote(c, v):
    faces = ('(1) neutral, (2) blink with eyes fully closed, (3) talking with the mouth half open, (4) yelling with the mouth wide open; bottom row: (5) scared with huge eyes and tiny pupils, (6) hurt and wincing with one eye shut, (7) laughing, (8) dizzy with spiral eyes and the tongue out'
             if not c['halo'] else
             '(1) neutral, (2) blink with eyes fully closed, (3) biting with the mouth wide open showing teeth, (4) chewing with a full mouth; bottom row: (5) hurt and wincing with one eye shut, (6) furious, (7) stunned with spiral eyes and the tongue out, (8) fading away with the eyes rolled up and the mouth hanging open')
    halo = ' Each head keeps the thin solid neon pink-and-cyan rim line of the hallucination, with no soft glow.' if c['halo'] else ''
    base = (f"An expression sheet for head swapping in 2D cut-out animation, in a grimy underground-comix sticker style, 16:9. "
            f"Copy the attached grey template: eight heads in a four-by-two grid with wide empty gaps. All eight are the exact head of the character from the attached turnaround in its three-quarter view turned to the {c['dir'].lower()} — identical size, outline, angle, hair, hat and headwear — and each ends at the jaw with no neck. "
            f"Only the face changes, in reading order: top row {faces}. The default mood is {c['mood']}, so even the neutral face carries it.{halo} ")
    if v == 1: tail = f"Use {FLAT}; {LINE}. "
    elif v == 2: tail = f"Treat it like a mouth-and-eye chart: overlay any two heads and only the eyes, eyebrows, mouth and small sweat or tear marks differ, never the skull shape or the headwear. Use {FLAT}; {LINE}. "
    else: tail = f"Make the faces read through tactile ink: wrinkles drawn as quick dry-brush marker strokes, sweat drops as flat glossy shapes, paper tooth visible in the skin tone. Use {FLAT}; {LINE}. "
    return base + tail + f"The background is one perfectly flat {BG[c['bg']]} reaching all four edges, with no shadows, text, labels or numbers. Wide 16:9 sheet, 4K."

EDIT = {'turn': 'Make all four views exactly the same height and stand them on one shared ground line, keeping the character design identical.',
        'rig': 'Separate any touching pieces with wider gaps and straighten the arm and leg pieces so they hang vertically, keeping every design and scale identical.',
        'emote': 'Make all eight heads exactly the same size and angle, changing only the facial expressions.'}
GEN = {'turn': turn, 'rig': rig, 'emote': emote}

def slot(c, kind, title, note, refs, variants):
    out = [f"**`{c['id']}_{kind}.png`** — {title}. Фон {RU_BG[c['bg']]}. {note}", '', 'Приложи: ' + ', '.join(f'`{r}`' for r in refs), '']
    labels = {1: 'Вариант 1 — точный', 2: 'Вариант 2 — строгий, если модель путает раскладку', 3: 'Вариант 3 — фактурный'}
    for v in variants:
        if len(variants) > 1: out.append(labels[v] + ':')
        out += ['```', GEN[kind](c, v), '```', '']
    out += ['Доработка:', '```', EDIT[kind], '```', '']
    return out

def sheets(c, variants, refs_turn):
    side = '' if c['dir'] == 'RIGHT' else '_left'
    return (slot(c, 'turn', 'развёртка: спереди, три четверти, сбоку, сзади', 'Это эталон модели: по нему собирается риг и рисуются детали.', refs_turn + [f"tpl_turn_{c['bg']}{side}"], variants)
          + slot(c, 'rig', 'детали для рига: торс спереди и сбоку, руки и ноги по суставам, кисти, стопы, реквизит', 'Руки и ноги нарисованы целиком и отдельно — ими можно махать широко.', [f"{c['id']}_turn", f"tpl_rig_{c['bg']}{side}"], variants)
          + slot(c, 'emote', 'эмоции: восемь лиц на одной голове', 'Голова в том же ракурсе, что на развёртке: в игре лица подменяются.', [f"{c['id']}_turn", f"tpl_faces_{c['bg']}{side}"], variants))

d = json.load(open('data/foes.json', encoding='utf8'))
vovan = {'id': 'vovan', 'dir': 'RIGHT', 'bg': 'magenta', 'halo': False, 'mood': 'startled and dazed',
         'look': 'Vovan, a short stocky slacker in his twenties with a round face, pale slightly tanned skin, wide bloodshot startled eyes with big pupils and a small mouth; a red knitted beanie pulled down to the eyebrows and over the ears so no hair shows; a green pullover hoodie with white drawstrings and a kangaroo pocket, the hood down and lying flat on the back; baggy blue jeans and white sneakers',
         'physics': 'the heavy cotton hoodie bunches in soft folds at the elbows and over the belly, the knitted beanie shows its rib texture and a slightly frayed fold, and the baggy jeans pile up in creases over the sneaker tongues',
         'split': 'the green sleeves split at the elbow with a ribbed cuff at the wrist, the jeans split at the knee, and the hood belongs to the back of the torso pieces',
         'props': 'an old blue enamel kettle with chipped enamel and a black handle, sized to fit the gripping hand'}
pilot = ['<!-- pilot:start -->', '## 3. Пилот: развёртка Вована', '',
         'Проверяем новую схему на одном герое, прежде чем перегенерировать всех. На персонажа три листа: развёртка в четырёх ракурсах, детали для рига (торс спереди и сбоку, руки и ноги по суставам, четыре кисти, стопа сбоку и спереди) и эмоции. Руки и ноги нарисованы отдельно и целиком, поэтому в игре ими можно будет махать широко, а не в пределах выреза из фигуры.', '',
         'Промты по гайду Nano Banana Pro: формат и стиль, герой и физика ткани, раскладка по планам, свет, исполнение, формат в конце. Три варианта на лист: **точный**, **строгий** (если модель путает раскладку — больше ограничений) и **фактурный** (сильнее печатная фактура). Драматичный свет и ракурсы из гайда тут не годятся: лист должен резаться и совпадать с другими. Порядок: `vovan_turn` → `vovan_rig` → `vovan_emote`.', '']
pilot += sheets(vovan, [1, 2, 3], ['style_anchor', 'vovan', 'vovan_faces']) + ['<!-- pilot:end -->', '']
foes = ['<!-- foes:start -->', '## 4. Новые глюки (после пилота)', '',
        d['about'] + ' Генерировать по той же схеме, что пилот, когда он устроит. Все смотрят влево, на корешей; у каждого тонкий неоновый ореол линией, без размытого свечения.', '']
for f in d['foes']:
    c = dict(f, dir='LEFT', halo=True)
    foes += [f"### {f['name']}", '', f"*{f['joke']}* В игре: {f['role']}.", '']
    foes += sheets(c, [1], ['style_anchor'])
for r in d['rollers']:
    foes += [f"### {r['name']}", '', f"*{r['joke']}* В игре: {r['role']}.", '', f"**`{r['id']}.png`** — не гуманоид, один лист. Фон {RU_BG[r['bg']]}.", '', 'Приложи: `style_anchor`', '', '```',
             (f"A game sprite sheet in a grimy underground-comix sticker style, 1:1, of a rolling hallucination enemy: {r['look']}. Six versions of the same object at exactly the same size in a three-by-two grid with wide gaps, nothing touching. "
              "Top row: the pixel screen showing an angry pixel-art face; the screen showing a wide-open biting pixel mouth; the shell cracked with a dead pixel skull on the screen. Bottom row: the screen blinking; the screen showing spiral pixel eyes; the plain back side of the shell with a battery cover and no screen, for the rolling animation. "
              "The pastel plastic carries scuff marks, fingerprint smudges and one sticker peeling at the corner; the screen glows flat green with visible pixel grid. A thin solid neon pink-and-cyan rim line runs just inside the dark outline, with no soft glow. "
              f"Use {FLAT}; {LINE}. The background is one perfectly flat {BG[r['bg']]} reaching all four edges, with no text, labels or numbers. Square 1:1 sheet, 4K."), '```', '', 'Доработка:', '```',
             'Make all six versions exactly the same size and shape, changing only the screen and the cracks.', '```', '']
foes += ['<!-- foes:end -->', '']

t = open('docs/PROMPTS.md', encoding='utf8').read()
def put(text, start, end, block, fallback_a, fallback_b):
    if start in text: a, b = text.index(start), text.index(end) + len(end) + 1
    else: a, b = text.index(fallback_a), text.index(fallback_b)
    return text[:a] + '\n'.join(block) + '\n' + text[b:]
t = put(t, '<!-- foes:start -->', '<!-- foes:end -->', foes, '## 4. Глюки (смотрят влево)', '<!-- items:start -->')
t = put(t, '<!-- pilot:start -->', '<!-- pilot:end -->', pilot, '## 3. Кореша (смотрят вправо)', '## 3. Кореша (смотрят вправо)')
t = t.replace('## 3. Кореша (смотрят вправо)', '## 3б. Кореша — старые листы (готово)')
open('docs/PROMPTS.md', 'w', encoding='utf8').write(t)
print('pilot', len(pilot), 'foes', len(foes))
