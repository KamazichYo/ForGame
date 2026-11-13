#!/usr/bin/env python3
"""Пишет раздел «5. Предметы» в docs/PROMPTS.md из data/items.json.

    python3 tools/gen_items_prompts.py

Раздел заключён между маркерами <!-- items:start --> и <!-- items:end -->: правь предметы в json, а не в md.
"""
import json, re

d = json.load(open('data/items.json', encoding='utf8'))
BG = {'magenta': 'pure magenta #FF00FF', 'green': 'pure chroma green #00FF00'}
TIER = {0: 'базовые, падают на поле сами', 1: 'второй уровень: два базовых', 2: 'третий уровень', 3: 'секретные'}
TITLE = {'items_base_1': 'Базовые 1', 'items_base_2': 'Базовые 2', 'items_t2_1': 'Второй уровень 1', 'items_t2_2': 'Второй уровень 2', 'items_t2_3': 'Второй уровень 3',
         'items_t3_1': 'Третий уровень 1', 'items_t3_2': 'Третий уровень 2', 'items_t3_3': 'Третий уровень 3', 'items_t3_4': 'Третий уровень 4 и секреты'}
I = {i['id']: i for i in d['items']}
REFS = {0: '', 1: ', `items_base_1`, `items_base_2`', 2: ', `items_t2_1`, `items_t2_2`, `items_t2_3`', 3: ', `items_t2_1`, `items_t2_2`, `items_t2_3`'}
out = ['<!-- items:start -->', '## 5. Предметы', '',
       'Вместо обороны из бытовой техники — хлам из хаты гика-укурка, который комбинируется. Правила и дерево рецептов — в `docs/ITEMS.md`, книга рецептов — в арт-пульте.', '',
       'Предметы — реальный мир: приглушённые цвета, без неонового ореола, у каждого маленькое мультяшное лицо, как у чайника и холодильника. Все смотрят вправо, на глюков, и стоят на полу так, чтобы влезать в одну клетку поля.', '',
       'Лист — 4 предмета в колонках. Сверху предмет в покое, снизу он же в действии: в той же позе и того же размера, меняются только детали действия. Звёзды (★) рисую в игре, на листе их нет.', '',
       'Промты по гайду Nano Banana Pro: одно плотное описание листа без служебных блоков — формат и стиль, предметы с материалами и физикой действия, раскладка, свет, исполнение, формат в конце. Ниже каждого промта — команда доработки для второго сообщения в том же чате.', '']
for sheet, bg in d['sheets'].items():
    items = sorted([i for i in d['items'] if i['sheet'] == sheet], key=lambda i: i['col'])
    names = ', '.join(i['name'] for i in items)
    ords = ['first', 'second', 'third', 'fourth']
    cols = ' '.join(f'Column {i["col"]}: {i["look"]}; below, in action: {i["action"]}.' for i in items)
    if len(items) < 4: cols += f' Column {len(items) + 1} stays empty.'
    reuse = ' Parts taken from the attached item sheets are drawn exactly as there, so each combination stays recognizable.' if items[0]['tier'] > 0 else ''
    prompt = (f'A flat 2D game sprite sheet in a grimy underground-comix sticker style, 16:9, of {len(items)} living objects from a stoner geek\'s apartment. '
              'Copy the attached grey template: four columns, two rows, wide empty gaps; each column is one object, idle on top and in action directly below at the identical size, angle and footprint. '
              + cols + reuse +
              ' Each object stands in a three-quarter view facing right, fits one floor tile and has a small cartoon face with heavy-lidded eyes, like the attached style reference. '
              'Wear shows as texture, not gloss: scuffed plastic, chipped paint, greasy cardboard, smudged glass, dented metal; only action effects may glow, the objects keep a muted real-world palette. '
              'Flat even light, one hard cel-shading step, no cast shadows; thick uneven dark-purple #1B1030 marker outlines, faint paper grain, no white sticker border. '
              f'Background: one perfectly flat {BG[bg]} to all four edges, no text, labels, numbers or stars. 16:9 sheet, 4K.')
    out += [f'**`{sheet}.png`** — {TITLE[sheet]}: {names}. Фон {"маджента" if bg == "magenta" else "зелёный"}.', '',
            f'Приложи: `style_anchor`, `tpl_items_{bg}`' + REFS[items[0]['tier']], '', '```', prompt, '```', '', 'Доработка:', '```',
            'Keep the layout, every other object and the flat background exactly the same, and redraw only the bottom cell of column 2 so the object has the same size and angle as the idle cell above it.', '```', '']
fx = [('fx_items_1', 'green', 'Эффекты 1: снаряды и удары', 'a white smoke ring; a purple poison cloud; three popped popcorn kernels; a short thick red laser beam segment; a cone-shaped blast of chip crumbs; a brown foam explosion splash; a glowing pink-and-cyan crescent slash wave; a forked purple lightning bolt'),
      ('fx_items_2', 'magenta', 'Эффекты 2: ауры и вспышки', 'a cone of orange fire; a sticky grey duct-tape puddle on the floor; three pink hearts; a cluster of colorful disco light beams; a white-and-gold starburst flash for merging items; a small dust poof for an item landing on the ground; a tiny walking action figure helper; a glitchy translucent cyan hologram square with scanlines')]
for sid, bg, title, what in fx:
    prompt = ('A flat 2D game effects sprite sheet in a grimy underground-comix sticker style, 16:9, following the attached grey layout template: eight cells in four columns and two rows with wide empty gaps, nothing touching, each cell holding one separate centered effect of about the same size. '
              f'In reading order: {what}. Each effect is built from bold flat shapes with crisp edges and one hard cel-shading step, never soft blur or airbrush, so it can be cut out and layered over the game; glows are drawn as flat solid halo bands. '
              'Thick uneven dark-purple #1B1030 marker outlines, faint paper grain, no white sticker border. '
              f'The background is one perfectly flat {BG[bg]} reaching all four edges, with no shadows, text, labels or numbers. 16:9 sheet, 4K.')
    out += [f'**`{sid}.png`** — {title}. Фон {"маджента" if bg == "magenta" else "зелёный"}.', '', f'Приложи: `style_anchor`, `tpl_items_{bg}`', '', '```', prompt, '```', '', 'Доработка:', '```',
            'Replace any soft blur with flat solid shapes and crisp edges, keeping every effect and the layout identical.', '```', '']
out += ['Пылесос (`roomba`) остаётся последним рубежом в каждом ряду — он уже загружен.', '<!-- items:end -->', '']
text = open('docs/PROMPTS.md', encoding='utf8').read()
if '<!-- items:start -->' in text:
    a, b = text.index('<!-- items:start -->'), text.index('<!-- items:end -->') + len('<!-- items:end -->\n')
else:
    a, b = text.index('## 5. Оборона'), text.index('## 6. Окружение')
text = text[:a] + '\n'.join(out) + '\n' + text[b:]
# чек-лист: очереди
text = re.sub(r'\| 2\. Минимум.*\|\n', '| 2. Минимум, чтобы игра ожила | `vovan`, `vovan_faces`, `dimon`, `dimon_faces`, `zombie`, `zombie_faces`, `alien`, `alien_faces`, `items_base_1`, `items_base_2`, `items_t2_1`, `items_t2_2`, `items_t2_3`, `fx_items_1`, `fx_items_2`, `bg_yard_night` |\n', text)
text = re.sub(r'\| 3\. Остальные.*\|\n', '| 3. Остальные глюки и предметы | `ballerina`, `ballerina_faces`, `kolobok`, `pirate`, `pirate_faces`, `jesus`, `jesus_faces`, `dracula`, `dracula_faces`, `kraken`, `kraken_faces`, `zombie_tough`, `zombie_tough_faces`, `items_t3_1`, `items_t3_2`, `items_t3_3`, `items_t3_4` |\n', text)
open('docs/PROMPTS.md', 'w', encoding='utf8').write(text)
print('ok', len(out))
