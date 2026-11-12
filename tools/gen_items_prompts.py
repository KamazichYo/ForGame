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
       '### Блок ITEMS', '', '```',
       'ITEMS: An item sprite sheet for a 2D tower-defense game, 16:9, 4K. Follow the attached grey layout template EXACTLY: four columns and two rows with wide empty gaps, nothing touching. Each COLUMN is one object: the TOP cell shows it idle, the BOTTOM cell shows the same object in its action pose. Both cells of a column show the same object at exactly the same size, angle and position; only the action details change. All objects on the sheet are drawn at the same scale so each fits one square floor tile, standing on the ground, in a 3/4 view turned toward the RIGHT. Each object is a living household thing with a small cartoon face (eyes and mouth) on its body, like the kettle and the fridge in the attached style reference. Real-world muted palette, no neon halo on the objects themselves; only effects in the action poses may glow. Only the dark purple ink outline, no white sticker border. Background: one perfectly flat solid {BG} reaching all four edges of the image, no white margin or strip at any edge, no shadows on the background, no floor, no text, no labels, no numbers, no stars. Do not copy the grey colour of the template.',
       '```', '']
for sheet, bg in d['sheets'].items():
    items = sorted([i for i in d['items'] if i['sheet'] == sheet], key=lambda i: i['col'])
    names = ', '.join(i['name'] for i in items)
    out += [f'**`{sheet}.png`** — {TITLE[sheet]}: {names}. Фон {"маджента" if bg == "magenta" else "зелёный"}.', '',
            f'Приложи: `style_anchor`, `tpl_items_{bg}`' + REFS[items[0]['tier']], '', '```', '[STYLE]', f'[ITEMS with {{BG}} = {BG[bg]}]']
    for i in items:
        out.append(f'Column {i["col"]}: {i["look"]}. Action: {i["action"]}.')
    if items[0]['tier'] > 0:
        out.append('Where an object reuses parts of the items on the attached item sheets (the grinder, the battery, the bottle, the action figure, the chips bag, the pizza boxes, the lava lamp), draw those parts exactly the same way so the player recognizes what it was combined from.')
    if len(items) < 4:
        out.append(f'Column {len(items) + 1}' + (' and the rest' if len(items) < 3 else '') + ': leave empty.')
    out += ['```', '']
fx = [('fx_items_1', 'green', 'Эффекты 1: снаряды и удары', 'a white smoke ring; a purple poison cloud; three popped popcorn kernels; a short thick red laser beam segment; a cone-shaped blast of chip crumbs; a brown foam explosion splash; a glowing pink-and-cyan crescent slash wave; a forked purple lightning bolt'),
      ('fx_items_2', 'magenta', 'Эффекты 2: ауры и вспышки', 'a cone of orange fire; a sticky grey duct-tape puddle on the floor; three pink hearts; a cluster of colorful disco light beams; a white-and-gold starburst flash for merging items; a small dust poof for an item landing on the ground; a tiny walking action figure helper; a glitchy translucent cyan hologram square with scanlines')]
for sid, bg, title, what in fx:
    out += [f'**`{sid}.png`** — {title}. Фон {"маджента" if bg == "magenta" else "зелёный"}.', '', f'Приложи: `style_anchor`, `tpl_items_{bg}`', '', '```', '[STYLE]',
            f'A game effects sprite sheet, 16:9, 4K. Follow the attached grey layout template: eight cells in four columns and two rows with wide empty gaps, nothing touching; each cell holds ONE separate effect, centered and about the same size. Effects in reading order: {what}. Bold flat shapes with the dark purple ink outline, no white sticker border, no soft blur. Background: one perfectly flat solid {BG[bg]} reaching all four edges of the image, no white margin or strip at any edge, no shadows, no text, no labels, no numbers. Do not copy the grey colour of the template.', '```', '']
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
