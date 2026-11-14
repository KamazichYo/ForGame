#!/usr/bin/env python3
"""Собирает страницу «Арт-пульт» из docs/PROMPTS.md: промт + окно загрузки на каждый файл.

    python3 tools/artboard.py docs/PROMPTS.md tools/artboard.template.html out.html
"""
import json, os, re, sys

src, tpl, out = sys.argv[1:4]
lines = open(src, encoding='utf8').read().split('\n')
QUEUES = []  # из таблицы чек-листа: | N. Название | файлы |

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
    m = re.match(r'\| (\d)\. ([^|]+)\| (.+) \|', l)
    if m:
        QUEUES.append(m.group(1) + '. ' + m.group(2).strip())
        for n in re.findall(r'`(\w+)`', m.group(3)):
            queue_of[n] = int(m.group(1)) - 1

def expand(p, sec):
    p = p.replace('[STYLE]', blocks['STYLE'])
    def block(m):
        text = blocks[m.group(1)]
        for k, v in re.findall(r'\{(\w+)\} = ([^,]+)', m.group(2)):
            text = text.replace('{' + k + '}', v.strip())
        return text
    p = re.sub(r'\[(\w+) with ([^\]]+)\]', block, p)
    return re.sub(r'\n{3,}', '\n\n', p.replace('[хвост]', tails.get(sec, '')).replace('\n', '\n\n'))

sec = ''
for i, l in enumerate(lines):
    if l.startswith('## '):
        sec = l[3:]
    m = re.match(r'\*\*`(\w+)\.png`\*\*(.*)', l)
    if m:
        name, note = m.group(1), m.group(2).strip(' —.')
        j, refs = i + 1, None
        while not lines[j].startswith('```'):
            if lines[j].startswith('Приложи:'):
                refs = re.findall(r'`(\w+)`', lines[j])
            j += 1
        note = re.sub(r'^\([^)]*\)[\s—.]*', '', note)
        note = note[:1].upper() + note[1:]
        # все блоки кода до следующего заголовка: варианты промта и команда доработки
        variants, edit, j = [], None, i + 1
        while j < len(lines) and not re.match(r'(\*\*`\w+\.png`\*\*|## |### |- \*\*`|<!-- items:end)', lines[j]):
            if lines[j].startswith('```'):
                k = j - 1
                while k > i and not lines[k].strip(): k -= 1
                label = lines[k].strip().rstrip(':') if k > i and not lines[k].startswith(('```', 'Приложи:')) else ''
                text, j = fence(j)
                if label.startswith('Доработка'): edit = text
                else: variants.append({'label': label or 'Промт', 'text': expand(text, sec)})
            j += 1
        slot = {'id': name, 'note': note, 'prompt': variants[0]['text'], 'variants': variants}
        if edit: slot['edit'] = edit
        if refs is not None:
            slot['refs'] = refs
        slots.append(slot)
        continue
    m = re.match(r'- \*\*`(\w+)\.png`\*\* — `(.+?)`(.*)', l)
    if m:
        name, body, rest = m.groups()
        if name.startswith('bg_'):
            slots.append({'id': name, 'note': 'Редактирование основного фона', 'prompt': body, 'refs': ['bg_yard_night']})
        else:
            mag = 'маджента' in rest
            bg = 'pure magenta #FF00FF' if mag else 'pure chroma green #00FF00'
            slots.append({'id': name, 'note': 'Запасной глюк, лист тела', 'refs': ['style_anchor', 'tpl_body_' + ('magenta' if mag else 'green') + '_left'],
                          'prompt': expand(f'[STYLE]\n[PUPPET with {{BG}} = {bg}, {{DIR}} = LEFT]\nCharacter: {body} Hallucination look: acid neon accents and a thin solid neon pink-and-cyan rim line just inside the dark outline of every piece, no soft glow.', sec)})

for s in slots:
    n = s['id']
    q = queue_of.get(n, len(QUEUES) - 1)
    s['queue'] = q
    s['ratio'] = '1:1' if re.search(r'\b1:1\b', s['prompt']) else '16:9'
    s['k4'] = '4K' in s['prompt']
    if 'refs' not in s:
        s['refs'] = [] if n == 'style_anchor' else ['style_anchor'] + (['vovan', 'dimon'] if n.startswith('cs_') else [])
slots.sort(key=lambda s: s['queue'])
book = json.load(open(os.path.join(os.path.dirname(src), '..', 'data', 'items.json'), encoding='utf8'))
for sl in slots:  # что лежит на листе предметов: по колонкам
    inside = sorted([i for i in book['items'] if i['sheet'] == sl['id']], key=lambda i: i['col'])
    if inside:
        sl['contains'] = [i['name'] for i in inside]
        if sl['id'].startswith('items_t'): sl['note'] = 'Лист предметов. Сначала загрузи и приложи базовые листы: по ним рисуются комбинации.'
        else: sl['note'] = 'Лист предметов: 4 колонки, сверху покой, снизу действие.'
data = json.dumps({'queues': QUEUES, 'slots': slots, 'book': book}, ensure_ascii=False).replace('</', '<\\/')
open(out, 'w', encoding='utf8').write(open(tpl, encoding='utf8').read().replace('/*DATA*/null', data))
print(len(slots), 'слотов:', ' '.join(s['id'] for s in slots))
