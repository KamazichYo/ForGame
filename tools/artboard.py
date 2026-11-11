#!/usr/bin/env python3
"""Собирает страницу «Арт-пульт» из docs/PROMPTS.md: промт + окно загрузки на каждый файл.

    python3 tools/artboard.py docs/PROMPTS.md tools/artboard.template.html out.html
"""
import json, re, sys

src, tpl, out = sys.argv[1:4]
lines = open(src, encoding='utf8').read().split('\n')
QUEUES = ['1. Стиль', '2. Минимум, чтобы игра ожила', '3. Остальные глюки и оборона', '4. Катсцены', '5. Полировка', '6. Запас на потом']

def fence(i):
    """Текст fenced-блока, начинающегося на строке i или ниже; (text, end)."""
    while not lines[i].startswith('```'):
        i += 1
    j = i + 1
    while not lines[j].startswith('```'):
        j += 1
    return '\n'.join(lines[i + 1:j]), j

blocks, tails, slots, sec, queue_of = {}, {}, [], '', {}
for i, l in enumerate(lines):
    if l.startswith('## '):
        sec = l[3:]
    m = re.match(r'### Блок (\w+)', l)
    if m:
        blocks[m.group(1)] = fence(i)[0]
    if l.startswith('Общий хвост'):
        tails[sec] = fence(i)[0]
    m = re.match(r'\| (\d)\. [^|]+\| (.+) \|', l)
    if m:
        for n in re.findall(r'`(\w+)`', m.group(2)):
            queue_of[n] = int(m.group(1)) - 1

def expand(p, sec):
    p = p.replace('[STYLE]', blocks['STYLE'])
    p = re.sub(r'\[SHEET with \{BG\} = ([^\]]+)\]', lambda m: blocks['SHEET'].replace('{BG}', m.group(1)), p)
    return p.replace('[хвост]', tails.get(sec, '')).replace('\n', '\n\n')

sec = ''
for i, l in enumerate(lines):
    if l.startswith('## '):
        sec = l[3:]
    m = re.match(r'\*\*`(\w+)\.png`\*\*(.*)', l)
    if m:
        name, note = m.group(1), m.group(2).strip(' —.')
        note = re.sub(r'^\([^)]*\)[\s—.]*', '', note)
        note = note[:1].upper() + note[1:]
        slots.append({'id': name, 'note': note, 'prompt': expand(fence(i)[0], sec)})
        continue
    m = re.match(r'- \*\*`(\w+)\.png`\*\* — `(.+?)`(.*)', l)
    if m:
        name, body, rest = m.groups()
        if name.startswith('bg_'):
            slots.append({'id': name, 'note': 'Редактирование основного фона', 'prompt': body, 'refs': ['bg_yard_night']})
        else:
            bg = 'pure magenta #FF00FF' if 'маджента' in rest else 'pure chroma green #00FF00'
            slots.append({'id': name, 'note': 'Запасной глюк', 'prompt': expand(f'[STYLE]\n[SHEET with {{BG}} = {bg}]\nCharacter: {body} Acid neon accents with a thin glowing pink-and-cyan halo around the outline.', sec)})

for s in slots:
    n = s['id']
    q = queue_of.get(n, 3 if n.startswith('cs_') else 5)
    s['queue'] = q
    s['ratio'] = '1:1' if re.search(r'\b1:1\b', s['prompt']) else '16:9'
    if 'refs' not in s:
        s['refs'] = [] if n == 'style_anchor' else ['style_anchor'] + (['vovan', 'dimon'] if n.startswith('cs_') else [])
slots.sort(key=lambda s: s['queue'])
data = json.dumps({'queues': QUEUES, 'slots': slots}, ensure_ascii=False).replace('</', '<\\/')
open(out, 'w', encoding='utf8').write(open(tpl, encoding='utf8').read().replace('/*DATA*/null', data))
print(len(slots), 'слотов:', ' '.join(s['id'] for s in slots))
