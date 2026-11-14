# Промты для арта «Глюки vs Кореша»

Всё для Nano Banana Pro. Промты на английском — так модель точнее. Имя файла над каждым промтом: под этим именем клади результат в `assets/raw/`.

## 0. Как работать

1. **Сначала сделай якорь стиля** (раздел 2). Пока он не нравится — дальше не иди.
2. **Ко всем остальным генерациям прикладывай якорь как референс.** Промт уже начинается с блока `STYLE`. Так персонажи будут из одного мира.
3. **Каждый персонаж — два листа.** Сначала тело (`vovan.png`), потом отдельный лист с эмоциями (`vovan_faces.png`), к которому прикладываешь уже готовое тело. Так генератор не путает детали с лицами.
4. **Прикладывай шаблон раскладки.** Это серый манекен на нужном фоне (`tpl_body_magenta`, `tpl_faces_green` и т.п., лежат в `assets/templates/` и в арт-пульте). Генератор копирует расположение деталей с картинки гораздо точнее, чем из текста.
5. Разрешение: 2K минимум, листы с частями тела — только 4K. Листы и фоны — 16:9, одиночные предметы — 1:1.
6. Готовое загружай в «Арт-пульт» или кидай в `assets/raw/`. Дальше режу, собираю риг и анимирую я.
7. Фон листа — ровный зелёный или маджента, чтобы я его вырезал. Цвет подобран под каждого персонажа так, чтобы не совпадал с одеждой.

**Чего не просить:** чужих персонажей по именам (Джек Воробей, герои фильмов и игр). Модель либо откажет, либо выдаст то, что нельзя выпускать. У нас свои типажи и общественное достояние.

**Если модель отказывает на Гитлере:** в промте ниже он уже описан без имени, как «карикатурный диктатор 1940-х». Не добавляй имя и символику — карикатура читается по чёлке и усам.

## 1. Стиль

**Идея:** «дворовый трип». Реальный мир — тёплый, пыльный, приглушённый, ночной двор под жёлтым фонарём. Глюки — кислотные, с неоновым контуром, будто наклеены поверх реальности. По цвету сразу видно, что настоящее, а что мерещится.

- **Линия:** толстый неровный чернильный контур, как маркером, цвет контура тёмно-фиолетовый `#1B1030`, не чёрный.
- **Заливка:** плоские цвета, тень одним пятном (cel shading, одна ступень), лёгкая зернистая текстура бумаги. Никаких градиентов, 3D и глянца.
- **Пропорции:** большая голова (около трети роста), короткие ноги, крупные кисти и ступни, глаза с тяжёлыми веками.
- **Ракурс:** все персонажи в три четверти. Кореша смотрят вправо, глюки влево.
- **Головы без волос, которые надо анимировать:** у корешей короткая стрижка, спрятанная под шапкой. Шапка — часть головы, она не болтается.
- **Палитра реального мира:** ночной фиолетовый `#241536`, пыльный синий `#3A2F5A`, тёплый фонарь `#FFD27A`, ржавчина `#B5562F`, выцветший зелёный `#6F8A5E`.
- **Палитра глюков:** розовый `#FF5AD1`, кислотный зелёный `#7DFFB0`, жёлтый `#FFE14A`, циан `#5AE0FF`. У каждого глюка тонкий светящийся розово-циановый ореол по контуру.
- **Настроение:** андеграундный комикс и стикеры, смешно и грязновато, без чернухи и крови.

### Блок STYLE (вставлять в начало каждого промта)

```
STYLE: 2D cartoon game art in an underground comix sticker style. Thick uneven hand-inked marker outlines in dark purple (#1B1030), never pure black. Flat colors with a single hard cel-shading step and a subtle paper grain texture. No gradients, no 3D, no glossy highlights, no photorealism. Chunky proportions: head about one third of body height, short legs, big hands and feet, heavy-lidded eyes. Grimy but funny adult-cartoon mood, no gore. Match the attached style reference image exactly: same line weight, same proportions, same palette logic.
```

### Блок PUPPET (лист с телом)

```
PUPPET: A cut-out puppet sheet for 2D skeletal game animation, 16:9, 4K. Follow the attached grey layout template EXACTLY: the same number of pieces, the same placement, the same row order, the same proportions between pieces. Replace each grey mannequin piece with the matching part of the character. Everything is drawn in a 3/4 view turned toward the {DIR}, flat like a paper puppet.

On the side shown in the template: the fully assembled character standing straight, arms hanging down, exactly as in the template.

NEXT TO IT, the same character taken apart, at EXACTLY the same scale as the assembled figure, with wide empty gaps so nothing touches:
Row 1: (1) the HEAD, neutral face, ending at the jaw, no neck; (2) the NECK, a short separate cylinder; (3) the CHEST: upper torso from the neck hole down to the waist, shoulders rounded, no arms, no head; (4) the PELVIS: a short belt-to-crotch piece like a pair of briefs cut from the trousers, with two round hip sockets at the bottom — NO trouser legs on it.
Row 2: one arm in three pieces: (5) UPPER ARM from shoulder to elbow; (6) FOREARM from elbow to wrist; then three hands: (7) open relaxed hand, (8) closed fist, (9) hand gripping a round handle, with an empty hole in the grip.
Row 3: one leg in three pieces: (10) THIGH from hip to knee; (11) SHIN from knee to ankle; (12) FOOT with shoe, side view, toes pointing {DIR}.
Empty area next to rows 2 and 3: the props listed for this character, each as a separate piece.

Rules: every piece is drawn complete, including the part normally hidden under its neighbour. Every joint end (shoulder, elbow, wrist, hip, knee, ankle, waist, both ends of the neck) is a fully rounded cap extending a little past the joint, so the pieces overlap and rotate without gaps. Arm and leg pieces are straight and perfectly vertical with the joint at the top. Clothing belongs to the piece it covers: the sleeve is split at the elbow between upper arm and forearm, the trouser leg is split at the knee between thigh and shin. Only one arm and one leg; they will be mirrored. Only ONE head, the neutral one: expressions are made on a separate sheet.

Every piece has only the dark purple ink outline, NO white sticker border around it: white edges show up as seams at the joints.

Background: one perfectly flat solid {BG} reaching all four edges of the image, no white margin or strip at any edge. No cast shadows, no floor, no glow on the background, no text, no labels, no numbers, no arrows, no guide lines, no frame. Do not copy the grey colour of the template.
```

### Блок FACES (лист с эмоциями)

```
FACES: An expression sheet for head swapping in 2D cut-out animation, 16:9, 4K. Follow the attached grey layout template: eight heads in a 4 by 2 grid with wide empty gaps. Draw eight copies of the EXACT head from the attached puppet sheet of this character: identical size, identical outline, identical 3/4 angle turned toward the {DIR}, identical hat and accessories. Only the face changes: eyes, eyebrows, mouth, small drops and lines. Each head ends at the jaw, no neck, no body.
Top row: (1) neutral; (2) blink, eyes fully closed; (3) talking, mouth half open; (4) yelling, mouth wide open.
Bottom row: (5) scared, eyes huge, tiny pupils; (6) hurt, wincing with one eye shut; (7) laughing; (8) dizzy, spiral eyes and tongue out.
Each head has only the dark purple ink outline, no white sticker border. Background: one perfectly flat solid {BG} reaching all four edges of the image, no white margin or strip at any edge, no shadows, no text, no labels, no numbers. Do not copy the grey colour of the template.
```

`{BG}` и `{DIR}` подставлены в промтах каждого персонажа.

Почему без белой обводки: на листах Вована и Димона модель обвела каждую деталь белым «стикером». При сгибе локтя и колена эта обводка вылезает белыми швами, а снизу листа она слилась в белую полосу и срезала шею. Стиль от этого не меняется: обложку и катсцены можно со стикером.

### Риг: из чего собирается моделька

Плоская кукла в три четверти. 12 деталей с листа тела + 8 голов с листа эмоций. Рука и нога рисуются один раз и используются дважды (дальняя затемняется), всего 17 костей.

| Часть | Детали | Крепится к | Точка вращения |
|---|---|---|---|
| Голова | 1 на листе тела + 8 эмоций на отдельном листе, шапка — часть головы | шея | низ головы, у челюсти |
| Шея | 1 | грудь | низ шеи |
| Тело | грудь, таз | таз — корень, грудь к тазу | талия |
| Рука ×2 | плечо, предплечье, кисть: открытая, кулак, хват | грудь | плечо, локоть, запястье |
| Нога ×2 | бедро, голень, стопа | таз | бедро, колено, голеностоп |
| Реквизит | чайник, тапок и т.п. | кисть с хватом | рукоять, попадает в дырку хвата |

Что это даёт в анимации: ходьба со сгибом колена и перекатом стопы, замах и бросок с локтем и кистью, наклон корпуса в талии, кивок на шее, моргание и смена эмоций подменой головы.

Почему в промте именно так:

- **шаблон-манекен** — генератор копирует раскладку с картинки, а не придумывает свою;
- **таз как «трусы», без штанин** — на прошлом листе модель нарисовала целые джинсы, их нельзя согнуть в колене;
- **рукав и штанина разрезаны по суставу** — иначе плечо и предплечье выходят двумя одинаковыми рукавами;
- **одна голова на листе тела, эмоции отдельно** — на общем листе генератор путает лица с деталями и рисует их в другом масштабе;
- **скруглённые концы с запасом** — при сгибе локтя и колена не будет дыр;
- **шапка вместо волос** — анимировать нечего, голова цельная.

## 2. Якорь стиля

**`style_anchor.png`** (16:9). Он же пойдёт на титульный экран.

```
STYLE: 2D cartoon game art in an underground comix sticker style. Thick uneven hand-inked marker outlines in dark purple (#1B1030), never pure black. Flat colors with a single hard cel-shading step and a subtle paper grain texture. No gradients, no 3D, no glossy highlights, no photorealism. Chunky proportions: head about one third of body height, short legs, big hands and feet, heavy-lidded eyes. Grimy but funny adult-cartoon mood, no gore.

Key art, 16:9, wide game cover. Night-time backyard behind a shabby little house, lit by one yellow street lamp. LEFT side: the open back door and porch steps of the house, warm light spilling out. On the porch, two slacker friends in their twenties, both in 3/4 view facing RIGHT toward the yard, side by side, scared but ready to fight.
VOVAN, short and stocky with a round face: a red knitted beanie pulled down to the eyebrows and over the ears, no hair visible; wide bloodshot startled eyes; green pullover hoodie with the hood down and white drawstrings; baggy blue jeans; white sneakers. He holds an old blue enamel kettle up like a weapon.
DIMON, tall and lanky with a long face: a faded olive bucket hat pulled low over the ears, no hair visible; round glasses; sleepy half-closed eyes and a crooked grin; purple t-shirt with a yellow smiley; dark grey jeans; red sneakers. He is winding up to throw a pink fluffy house slipper.
Between their feet sits a fat grumpy orange cat.
RIGHT side, coming out of the dark across the trampled lawn and through a broken fence, a crowd of absurd hallucinations in 3/4 view facing LEFT: a pot-bellied green zombie neighbour in a dirty white tank top and blue tracksuit pants, a skinny grey-green alien with huge black eyes, a drunk pirate with a bushy orange beard and a tricorn hat, and behind them glowing silhouettes of a ballerina and a giant tentacle.
The real world is muted dusty purple with warm lamp yellow; the hallucinations are acid neon pink, mint green and cyan with a thin glowing pink-and-cyan halo around their outlines. Swirling psychedelic sky only above the right side. Clear empty band across the top for the logo. No text, no logo.
```

<!-- pilot:start -->
## 3. Пилот: развёртка Вована

Проверяем новую схему на одном герое, прежде чем перегенерировать всех. На персонажа три листа: развёртка в четырёх ракурсах, детали для рига (торс спереди и сбоку, руки и ноги по суставам, четыре кисти, стопа сбоку и спереди) и эмоции. Руки и ноги нарисованы отдельно и целиком, поэтому в игре ими можно будет махать широко, а не в пределах выреза из фигуры.

Промты по гайду Nano Banana Pro: формат и стиль, герой и физика ткани, раскладка по планам, свет, исполнение, формат в конце. Три варианта на лист: **точный**, **строгий** (если модель путает раскладку — больше ограничений) и **фактурный** (сильнее печатная фактура). Драматичный свет и ракурсы из гайда тут не годятся: лист должен резаться и совпадать с другими. Порядок: `vovan_turn` → `vovan_rig` → `vovan_emote`.

**`vovan_turn.png`** — развёртка: спереди, три четверти, сбоку, сзади. Фон маджента. Это эталон модели: по нему собирается риг и рисуются детали.

Приложи: `style_anchor`, `vovan`, `vovan_faces`, `tpl_turn_magenta`

Вариант 1 — точный:
```
A character turnaround sheet in a grimy underground-comix sticker style, 16:9, made as a construction reference for rigging a 2D game puppet. Copy the attached grey template exactly: four full-body views of the same character standing side by side on one invisible ground line, all at the identical height and evenly spaced — in the left quarter the front view, then a three-quarter view turned to the right, then a strict side profile facing right, and in the right quarter the back view. In every view the character stands in a relaxed A-pose with both arms held about twenty degrees away from the body so the hands never overlap the torso, feet shoulder-width apart. The character is Vovan, a short stocky slacker in his twenties with a round face, pale slightly tanned skin, wide bloodshot startled eyes with big pupils and a small mouth; a red knitted beanie pulled down to the eyebrows and over the ears so no hair shows; a green pullover hoodie with white drawstrings and a kangaroo pocket, the hood down and lying flat on the back; baggy blue jeans and white sneakers. The heavy cotton hoodie bunches in soft folds at the elbows and over the belly, the knitted beanie shows its rib texture and a slightly frayed fold, and the baggy jeans pile up in creases over the sneaker tongues, and these folds stay consistent from view to view. Every view uses the same flat even light with one hard cel-shading step and no cast shadows, so the four figures read as one model; thick uneven dark-purple #1B1030 marker outlines, faint paper grain inside the fills, no white sticker border. The background is one perfectly flat pure magenta #FF00FF reaching all four edges, with no floor, text, labels, numbers or arrows. Wide 16:9 sheet, 4K.
```

Вариант 2 — строгий, если модель путает раскладку:
```
A character turnaround sheet in a grimy underground-comix sticker style, 16:9, made as a construction reference for rigging a 2D game puppet. Copy the attached grey template exactly: four full-body views of the same character standing side by side on one invisible ground line, all at the identical height and evenly spaced — in the left quarter the front view, then a three-quarter view turned to the right, then a strict side profile facing right, and in the right quarter the back view. In every view the character stands in a relaxed A-pose with both arms held about twenty degrees away from the body so the hands never overlap the torso, feet shoulder-width apart. The character is Vovan, a short stocky slacker in his twenties with a round face, pale slightly tanned skin, wide bloodshot startled eyes with big pupils and a small mouth; a red knitted beanie pulled down to the eyebrows and over the ears so no hair shows; a green pullover hoodie with white drawstrings and a kangaroo pocket, the hood down and lying flat on the back; baggy blue jeans and white sneakers. The heavy cotton hoodie bunches in soft folds at the elbows and over the belly, the knitted beanie shows its rib texture and a slightly frayed fold, and the baggy jeans pile up in creases over the sneaker tongues, and these folds stay consistent from view to view. Draw it like an orthographic model sheet: no perspective, no foreshortening, the top of the head, the shoulders, the waist, the knees and the soles line up exactly across all four views, and parts hidden in one view are still drawn where they belong in the others. Use flat even light with one hard cel-shading step and no cast shadows; thick uneven dark-purple #1B1030 marker outlines, faint paper grain inside the fills, no white sticker border. The background is one perfectly flat pure magenta #FF00FF reaching all four edges, with no floor, text, labels, numbers or arrows. Wide 16:9 sheet, 4K.
```

Вариант 3 — фактурный:
```
A character turnaround sheet in a grimy underground-comix sticker style, 16:9, made as a construction reference for rigging a 2D game puppet. Copy the attached grey template exactly: four full-body views of the same character standing side by side on one invisible ground line, all at the identical height and evenly spaced — in the left quarter the front view, then a three-quarter view turned to the right, then a strict side profile facing right, and in the right quarter the back view. In every view the character stands in a relaxed A-pose with both arms held about twenty degrees away from the body so the hands never overlap the torso, feet shoulder-width apart. The character is Vovan, a short stocky slacker in his twenties with a round face, pale slightly tanned skin, wide bloodshot startled eyes with big pupils and a small mouth; a red knitted beanie pulled down to the eyebrows and over the ears so no hair shows; a green pullover hoodie with white drawstrings and a kangaroo pocket, the hood down and lying flat on the back; baggy blue jeans and white sneakers. The heavy cotton hoodie bunches in soft folds at the elbows and over the belly, the knitted beanie shows its rib texture and a slightly frayed fold, and the baggy jeans pile up in creases over the sneaker tongues, and these folds stay consistent from view to view. Push the tactile print look: marker ink pools slightly at the ends of strokes, the paper tooth shows through the flat fills, fabric carries a flat hand-drawn weave or knit pattern, and each flat color sits slightly off its outline like a cheap print, while the background stays perfectly clean. Use flat even light with one hard cel-shading step and no cast shadows; thick uneven dark-purple #1B1030 marker outlines, faint paper grain inside the fills, no white sticker border. The background is one perfectly flat pure magenta #FF00FF reaching all four edges, with no floor, text, labels, numbers or arrows. Wide 16:9 sheet, 4K.
```

Доработка:
```
Make all four views exactly the same height and stand them on one shared ground line, keeping the character design identical.
```

**`vovan_rig.png`** — детали для рига: торс спереди и сбоку, руки и ноги по суставам, кисти, стопы, реквизит. Фон маджента. Руки и ноги нарисованы целиком и отдельно — ими можно махать широко.

Приложи: `vovan_turn`, `tpl_rig_magenta`

Вариант 1 — точный:
```
A cut-out puppet parts sheet in a grimy underground-comix sticker style, 16:9, that takes the character from the attached turnaround apart for skeletal animation, every piece at exactly the scale of the turnaround figures. Copy the attached grey template: three rows with wide empty gaps so nothing touches. Top row, left to right: the torso seen from the front with the neck hole and both shoulder sockets, the same torso in side profile facing right, the pelvis in side profile as a short briefs-like block cut from the trousers with two round hip sockets and no trouser legs, and a short neck cylinder. Middle row: an upper arm from shoulder to elbow and a forearm from elbow to wrist, both hanging perfectly straight and vertical, then four hands in side view — open and relaxed, a clenched fist, gripping a round handle with an empty hole through the grip, and pointing forward with the index finger. Bottom row: a thigh from hip to knee and a shin from knee to ankle, both straight and vertical, then the foot in side profile with the toes toward the right, and the same foot seen from the front. The character is Vovan from the attached turnaround; the green sleeves split at the elbow with a ribbed cuff at the wrist, the jeans split at the knee, and the hood belongs to the back of the torso pieces. Props laid out at the far right of the middle and bottom rows: an old blue enamel kettle with chipped enamel and a black handle, sized to fit the gripping hand. Every piece is drawn complete, including the part normally hidden under its neighbour, and every joint end — shoulder, elbow, wrist, hip, knee, ankle and both ends of the neck — is a fully rounded cap that runs a little past the joint, so pieces overlap without gaps when they rotate. Use flat even light with one hard cel-shading step and no cast shadows; thick uneven dark-purple #1B1030 marker outlines, faint paper grain inside the fills, no white sticker border. The background is one perfectly flat pure magenta #FF00FF reaching all four edges, with no text, labels, numbers or guide lines. Wide 16:9 sheet, 4K.
```

Вариант 2 — строгий, если модель путает раскладку:
```
A cut-out puppet parts sheet in a grimy underground-comix sticker style, 16:9, that takes the character from the attached turnaround apart for skeletal animation, every piece at exactly the scale of the turnaround figures. Copy the attached grey template: three rows with wide empty gaps so nothing touches. Top row, left to right: the torso seen from the front with the neck hole and both shoulder sockets, the same torso in side profile facing right, the pelvis in side profile as a short briefs-like block cut from the trousers with two round hip sockets and no trouser legs, and a short neck cylinder. Middle row: an upper arm from shoulder to elbow and a forearm from elbow to wrist, both hanging perfectly straight and vertical, then four hands in side view — open and relaxed, a clenched fist, gripping a round handle with an empty hole through the grip, and pointing forward with the index finger. Bottom row: a thigh from hip to knee and a shin from knee to ankle, both straight and vertical, then the foot in side profile with the toes toward the right, and the same foot seen from the front. The character is Vovan from the attached turnaround; the green sleeves split at the elbow with a ribbed cuff at the wrist, the jeans split at the knee, and the hood belongs to the back of the torso pieces. Props laid out at the far right of the middle and bottom rows: an old blue enamel kettle with chipped enamel and a black handle, sized to fit the gripping hand. Count the pieces: exactly four in the top row, six in the middle row, four in the bottom row, plus the props; no duplicates, no second arm or leg, no head. Each limb piece is a straight vertical capsule with a rounded cap at both ends that runs past the joint, drawn complete including the hidden overlap area. Use flat even light with one hard cel-shading step and no cast shadows; thick uneven dark-purple #1B1030 marker outlines, faint paper grain inside the fills, no white sticker border. The background is one perfectly flat pure magenta #FF00FF reaching all four edges, with no text, labels, numbers or guide lines. Wide 16:9 sheet, 4K.
```

Вариант 3 — фактурный:
```
A cut-out puppet parts sheet in a grimy underground-comix sticker style, 16:9, that takes the character from the attached turnaround apart for skeletal animation, every piece at exactly the scale of the turnaround figures. Copy the attached grey template: three rows with wide empty gaps so nothing touches. Top row, left to right: the torso seen from the front with the neck hole and both shoulder sockets, the same torso in side profile facing right, the pelvis in side profile as a short briefs-like block cut from the trousers with two round hip sockets and no trouser legs, and a short neck cylinder. Middle row: an upper arm from shoulder to elbow and a forearm from elbow to wrist, both hanging perfectly straight and vertical, then four hands in side view — open and relaxed, a clenched fist, gripping a round handle with an empty hole through the grip, and pointing forward with the index finger. Bottom row: a thigh from hip to knee and a shin from knee to ankle, both straight and vertical, then the foot in side profile with the toes toward the right, and the same foot seen from the front. The character is Vovan from the attached turnaround; the green sleeves split at the elbow with a ribbed cuff at the wrist, the jeans split at the knee, and the hood belongs to the back of the torso pieces. Props laid out at the far right of the middle and bottom rows: an old blue enamel kettle with chipped enamel and a black handle, sized to fit the gripping hand. Every piece is complete with rounded joint caps that run past the joint. Push the tactile look: fabric shows a flat hand-drawn weave or knit pattern, cut edges of sleeves and trouser legs show a few loose threads, marker ink pools at the stroke ends, and paper tooth shows through the fills, while the background stays perfectly clean. Use flat even light with one hard cel-shading step and no cast shadows; thick uneven dark-purple #1B1030 marker outlines, faint paper grain inside the fills, no white sticker border. The background is one perfectly flat pure magenta #FF00FF reaching all four edges, with no text, labels, numbers or guide lines. Wide 16:9 sheet, 4K.
```

Доработка:
```
Separate any touching pieces with wider gaps and straighten the arm and leg pieces so they hang vertically, keeping every design and scale identical.
```

**`vovan_emote.png`** — эмоции: восемь лиц на одной голове. Фон маджента. Голова в том же ракурсе, что на развёртке: в игре лица подменяются.

Приложи: `vovan_turn`, `tpl_faces_magenta`

Вариант 1 — точный:
```
An expression sheet for head swapping in 2D cut-out animation, in a grimy underground-comix sticker style, 16:9. Copy the attached grey template: eight heads in a four-by-two grid with wide empty gaps. All eight are the exact head of the character from the attached turnaround in its three-quarter view turned to the right — identical size, outline, angle, hair, hat and headwear — and each ends at the jaw with no neck. Only the face changes, in reading order: top row (1) neutral, (2) blink with eyes fully closed, (3) talking with the mouth half open, (4) yelling with the mouth wide open; bottom row: (5) scared with huge eyes and tiny pupils, (6) hurt and wincing with one eye shut, (7) laughing, (8) dizzy with spiral eyes and the tongue out. The default mood is startled and dazed, so even the neutral face carries it. Use flat even light with one hard cel-shading step and no cast shadows; thick uneven dark-purple #1B1030 marker outlines, faint paper grain inside the fills, no white sticker border. The background is one perfectly flat pure magenta #FF00FF reaching all four edges, with no shadows, text, labels or numbers. Wide 16:9 sheet, 4K.
```

Вариант 2 — строгий, если модель путает раскладку:
```
An expression sheet for head swapping in 2D cut-out animation, in a grimy underground-comix sticker style, 16:9. Copy the attached grey template: eight heads in a four-by-two grid with wide empty gaps. All eight are the exact head of the character from the attached turnaround in its three-quarter view turned to the right — identical size, outline, angle, hair, hat and headwear — and each ends at the jaw with no neck. Only the face changes, in reading order: top row (1) neutral, (2) blink with eyes fully closed, (3) talking with the mouth half open, (4) yelling with the mouth wide open; bottom row: (5) scared with huge eyes and tiny pupils, (6) hurt and wincing with one eye shut, (7) laughing, (8) dizzy with spiral eyes and the tongue out. The default mood is startled and dazed, so even the neutral face carries it. Treat it like a mouth-and-eye chart: overlay any two heads and only the eyes, eyebrows, mouth and small sweat or tear marks differ, never the skull shape or the headwear. Use flat even light with one hard cel-shading step and no cast shadows; thick uneven dark-purple #1B1030 marker outlines, faint paper grain inside the fills, no white sticker border. The background is one perfectly flat pure magenta #FF00FF reaching all four edges, with no shadows, text, labels or numbers. Wide 16:9 sheet, 4K.
```

Вариант 3 — фактурный:
```
An expression sheet for head swapping in 2D cut-out animation, in a grimy underground-comix sticker style, 16:9. Copy the attached grey template: eight heads in a four-by-two grid with wide empty gaps. All eight are the exact head of the character from the attached turnaround in its three-quarter view turned to the right — identical size, outline, angle, hair, hat and headwear — and each ends at the jaw with no neck. Only the face changes, in reading order: top row (1) neutral, (2) blink with eyes fully closed, (3) talking with the mouth half open, (4) yelling with the mouth wide open; bottom row: (5) scared with huge eyes and tiny pupils, (6) hurt and wincing with one eye shut, (7) laughing, (8) dizzy with spiral eyes and the tongue out. The default mood is startled and dazed, so even the neutral face carries it. Make the faces read through tactile ink: wrinkles drawn as quick dry-brush marker strokes, sweat drops as flat glossy shapes, paper tooth visible in the skin tone. Use flat even light with one hard cel-shading step and no cast shadows; thick uneven dark-purple #1B1030 marker outlines, faint paper grain inside the fills, no white sticker border. The background is one perfectly flat pure magenta #FF00FF reaching all four edges, with no shadows, text, labels or numbers. Wide 16:9 sheet, 4K.
```

Доработка:
```
Make all eight heads exactly the same size and angle, changing only the facial expressions.
```

<!-- pilot:end -->


## 3б. Кореша — старые листы (готово)

**`vovan.png`** — лист тела. Фон маджента (худи зелёное).

Приложи: `style_anchor`, `tpl_body_magenta`

```
[STYLE]
[PUPPET with {BG} = pure magenta #FF00FF, {DIR} = RIGHT]
Character: VOVAN, a short stocky slacker in his twenties. Round face, wide bloodshot startled eyes with big pupils, small mouth. A red knitted beanie pulled down to the eyebrows and over the ears, fused to the head: no hair visible at all. Green pullover hoodie with white drawstrings and a kangaroo pocket on the chest piece; the hood is down and lies flat on the back as part of the chest piece; the green sleeves are split at the elbow with a ribbed cuff at the wrist. Baggy blue jeans split at the knee, the hem bunching over white sneakers. Skin is pale with a slight tan. Real-world muted palette, no neon glow.
Props: an old blue enamel kettle with a black handle, sized to fit the gripping hand.
```

**`vovan_faces.png`** — эмоции. Фон маджента.

Приложи: `vovan`, `tpl_faces_magenta`

```
[STYLE]
[FACES with {BG} = pure magenta #FF00FF, {DIR} = RIGHT]
Character: VOVAN from the attached puppet sheet: round face, red beanie fused to the head, no hair visible, bloodshot eyes. His default mood is startled and dazed, so even the neutral face looks a little stunned.
```

**`dimon.png`** — лист тела. Фон зелёный.

Приложи: `style_anchor`, `vovan`, `tpl_body_green`

```
[STYLE]
[PUPPET with {BG} = pure chroma green #00FF00, {DIR} = RIGHT]
Character: DIMON, a tall lanky slacker in his twenties, a head taller than Vovan from the attached sheet and drawn at the same scale. Long narrow face, sleepy half-closed eyes, crooked relaxed grin, round glasses with pale lenses fused to the head. A faded olive bucket hat pulled low over the ears, fused to the head: no hair visible, only short stubble sideburns. Purple t-shirt with a yellow smiley face on the chest piece; bare forearms, the short t-shirt sleeve ends on the upper arm piece. Dark grey skinny jeans split at the knee, red high-top sneakers. Real-world muted palette, no neon glow.
Props: a pink fluffy house slipper, sized to fit the gripping hand.
```

**`dimon_faces.png`** — эмоции. Фон зелёный.

Приложи: `dimon`, `tpl_faces_green`

```
[STYLE]
[FACES with {BG} = pure chroma green #00FF00, {DIR} = RIGHT]
Character: DIMON from the attached puppet sheet: long narrow face, olive bucket hat and round glasses fused to the head, no hair visible. His default mood is sleepy and amused, so even the neutral face has half-closed eyes and a faint grin.
```

<!-- foes:start -->
## 4. Новые глюки (после пилота)

Новые глюки: гиковский трэш с чёрным юмором. Каждый — мертвец, неудачник или кошмар из интернета. Все свои типажи, без чужих персонажей. Генерировать по той же схеме, что пилот, когда он устроит. Все смотрят влево, на корешей; у каждого тонкий неоновый ореол линией, без размытого свечения.

### Зомби-модератор

*Умер на посту — в буквальном смысле. Банит всё, что движется.* В игре: базовый: идёт и грызёт.

**`mod_turn.png`** — развёртка: спереди, три четверти, сбоку, сзади. Фон маджента. Это эталон модели: по нему собирается риг и рисуются детали.

Приложи: `style_anchor`, `tpl_turn_magenta_left`

```
A character turnaround sheet in a grimy underground-comix sticker style, 16:9, made as a construction reference for rigging a 2D game puppet. Copy the attached grey template exactly: four full-body views of the same character standing side by side on one invisible ground line, all at the identical height and evenly spaced — in the left quarter the front view, then a three-quarter view turned to the left, then a strict side profile facing left, and in the right quarter the back view. In every view the character stands in a relaxed A-pose with both arms held about twenty degrees away from the body so the hands never overlap the torso, feet shoulder-width apart. The character is a pale-green undead internet forum moderator in his forties, greasy comb-over plastered across a cracked scalp, sunken eyes behind thick cracked glasses held together with tape, a slack jaw with a few yellow teeth; he wears a stained grey zip hoodie over a faded t-shirt with a shield badge showing a crossed-out speech bubble, saggy sweatpants and worn house slippers. The hoodie sags under its own weight with a dark coffee stain dried stiff across the belly, the sweatpants bag at the knees, and the slippers are flattened at the heels, and these folds stay consistent from view to view. As a hallucination the character carries a thin solid neon pink-and-cyan rim line just inside the dark outline in every view, with no soft glow. Every view uses the same flat even light with one hard cel-shading step and no cast shadows, so the four figures read as one model; thick uneven dark-purple #1B1030 marker outlines, faint paper grain inside the fills, no white sticker border. The background is one perfectly flat pure magenta #FF00FF reaching all four edges, with no floor, text, labels, numbers or arrows. Wide 16:9 sheet, 4K.
```

Доработка:
```
Make all four views exactly the same height and stand them on one shared ground line, keeping the character design identical.
```

**`mod_rig.png`** — детали для рига: торс спереди и сбоку, руки и ноги по суставам, кисти, стопы, реквизит. Фон маджента. Руки и ноги нарисованы целиком и отдельно — ими можно махать широко.

Приложи: `mod_turn`, `tpl_rig_magenta_left`

```
A cut-out puppet parts sheet in a grimy underground-comix sticker style, 16:9, that takes the character from the attached turnaround apart for skeletal animation, every piece at exactly the scale of the turnaround figures. Copy the attached grey template: three rows with wide empty gaps so nothing touches. Top row, left to right: the torso seen from the front with the neck hole and both shoulder sockets, the same torso in side profile facing left, the pelvis in side profile as a short briefs-like block cut from the trousers with two round hip sockets and no trouser legs, and a short neck cylinder. Middle row: an upper arm from shoulder to elbow and a forearm from elbow to wrist, both hanging perfectly straight and vertical, then four hands in side view — open and relaxed, a clenched fist, gripping a round handle with an empty hole through the grip, and pointing forward with the index finger. Bottom row: a thigh from hip to knee and a shin from knee to ankle, both straight and vertical, then the foot in side profile with the toes toward the left, and the same foot seen from the front. The character is a pale-green undead internet forum moderator in his forties from the attached turnaround; the hoodie sleeves split at the elbow with a ribbed cuff at the wrist, the sweatpants split at the knee. Props laid out at the far right of the middle and bottom rows: a huge wooden banhammer with a chipped head and a wrapped grip, sized to fit the gripping hand. As a hallucination every piece carries a thin solid neon pink-and-cyan rim line just inside the dark outline, with no soft glow. Every piece is drawn complete, including the part normally hidden under its neighbour, and every joint end — shoulder, elbow, wrist, hip, knee, ankle and both ends of the neck — is a fully rounded cap that runs a little past the joint, so pieces overlap without gaps when they rotate. Use flat even light with one hard cel-shading step and no cast shadows; thick uneven dark-purple #1B1030 marker outlines, faint paper grain inside the fills, no white sticker border. The background is one perfectly flat pure magenta #FF00FF reaching all four edges, with no text, labels, numbers or guide lines. Wide 16:9 sheet, 4K.
```

Доработка:
```
Separate any touching pieces with wider gaps and straighten the arm and leg pieces so they hang vertically, keeping every design and scale identical.
```

**`mod_emote.png`** — эмоции: восемь лиц на одной голове. Фон маджента. Голова в том же ракурсе, что на развёртке: в игре лица подменяются.

Приложи: `mod_turn`, `tpl_faces_magenta_left`

```
An expression sheet for head swapping in 2D cut-out animation, in a grimy underground-comix sticker style, 16:9. Copy the attached grey template: eight heads in a four-by-two grid with wide empty gaps. All eight are the exact head of the character from the attached turnaround in its three-quarter view turned to the left — identical size, outline, angle, hair, hat and headwear — and each ends at the jaw with no neck. Only the face changes, in reading order: top row (1) neutral, (2) blink with eyes fully closed, (3) biting with the mouth wide open showing teeth, (4) chewing with a full mouth; bottom row: (5) hurt and wincing with one eye shut, (6) furious, (7) stunned with spiral eyes and the tongue out, (8) fading away with the eyes rolled up and the mouth hanging open. The default mood is bored, dead-eyed and smug, so even the neutral face carries it. Each head keeps the thin solid neon pink-and-cyan rim line of the hallucination, with no soft glow. Use flat even light with one hard cel-shading step and no cast shadows; thick uneven dark-purple #1B1030 marker outlines, faint paper grain inside the fills, no white sticker border. The background is one perfectly flat pure magenta #FF00FF reaching all four edges, with no shadows, text, labels or numbers. Wide 16:9 sheet, 4K.
```

Доработка:
```
Make all eight heads exactly the same size and angle, changing only the facial expressions.
```

### Курьер-призрак

*Сбит самокатом на последнем заказе. Всё ещё везёт ваш ролл «Филадельфия».* В игре: быстрый: проходит сквозь первую преграду.

**`courier_turn.png`** — развёртка: спереди, три четверти, сбоку, сзади. Фон зелёный. Это эталон модели: по нему собирается риг и рисуются детали.

Приложи: `style_anchor`, `tpl_turn_green_left`

```
A character turnaround sheet in a grimy underground-comix sticker style, 16:9, made as a construction reference for rigging a 2D game puppet. Copy the attached grey template exactly: four full-body views of the same character standing side by side on one invisible ground line, all at the identical height and evenly spaced — in the left quarter the front view, then a three-quarter view turned to the left, then a strict side profile facing left, and in the right quarter the back view. In every view the character stands in a relaxed A-pose with both arms held about twenty degrees away from the body so the hands never overlap the torso, feet shoulder-width apart. The character is a translucent pale-blue ghost of a young delivery courier, cheeks hollow, a faint tire track printed across his chest and one cheek, a cheap rain poncho over a branded-free hoodie, a phone strapped to his forearm, sneakers with flapping soles; a huge cube-shaped insulated delivery backpack is strapped to his back. The poncho flutters backward as if he is always rushing, rainwater drips off its hem, and the backpack drags his shoulders down with its weight, and these folds stay consistent from view to view. As a hallucination the character carries a thin solid neon pink-and-cyan rim line just inside the dark outline in every view, with no soft glow. Every view uses the same flat even light with one hard cel-shading step and no cast shadows, so the four figures read as one model; thick uneven dark-purple #1B1030 marker outlines, faint paper grain inside the fills, no white sticker border. The background is one perfectly flat pure chroma green #00FF00 reaching all four edges, with no floor, text, labels, numbers or arrows. Wide 16:9 sheet, 4K.
```

Доработка:
```
Make all four views exactly the same height and stand them on one shared ground line, keeping the character design identical.
```

**`courier_rig.png`** — детали для рига: торс спереди и сбоку, руки и ноги по суставам, кисти, стопы, реквизит. Фон зелёный. Руки и ноги нарисованы целиком и отдельно — ими можно махать широко.

Приложи: `courier_turn`, `tpl_rig_green_left`

```
A cut-out puppet parts sheet in a grimy underground-comix sticker style, 16:9, that takes the character from the attached turnaround apart for skeletal animation, every piece at exactly the scale of the turnaround figures. Copy the attached grey template: three rows with wide empty gaps so nothing touches. Top row, left to right: the torso seen from the front with the neck hole and both shoulder sockets, the same torso in side profile facing left, the pelvis in side profile as a short briefs-like block cut from the trousers with two round hip sockets and no trouser legs, and a short neck cylinder. Middle row: an upper arm from shoulder to elbow and a forearm from elbow to wrist, both hanging perfectly straight and vertical, then four hands in side view — open and relaxed, a clenched fist, gripping a round handle with an empty hole through the grip, and pointing forward with the index finger. Bottom row: a thigh from hip to knee and a shin from knee to ankle, both straight and vertical, then the foot in side profile with the toes toward the left, and the same foot seen from the front. The character is a translucent pale-blue ghost of a young delivery courier from the attached turnaround; the poncho sleeves split at the elbow, the trousers split at the knee; the delivery backpack is drawn as part of the torso pieces. Props laid out at the far right of the middle and bottom rows: a paper takeaway bag with a stapled receipt, sized to fit the gripping hand. As a hallucination every piece carries a thin solid neon pink-and-cyan rim line just inside the dark outline, with no soft glow. Every piece is drawn complete, including the part normally hidden under its neighbour, and every joint end — shoulder, elbow, wrist, hip, knee, ankle and both ends of the neck — is a fully rounded cap that runs a little past the joint, so pieces overlap without gaps when they rotate. Use flat even light with one hard cel-shading step and no cast shadows; thick uneven dark-purple #1B1030 marker outlines, faint paper grain inside the fills, no white sticker border. The background is one perfectly flat pure chroma green #00FF00 reaching all four edges, with no text, labels, numbers or guide lines. Wide 16:9 sheet, 4K.
```

Доработка:
```
Separate any touching pieces with wider gaps and straighten the arm and leg pieces so they hang vertically, keeping every design and scale identical.
```

**`courier_emote.png`** — эмоции: восемь лиц на одной голове. Фон зелёный. Голова в том же ракурсе, что на развёртке: в игре лица подменяются.

Приложи: `courier_turn`, `tpl_faces_green_left`

```
An expression sheet for head swapping in 2D cut-out animation, in a grimy underground-comix sticker style, 16:9. Copy the attached grey template: eight heads in a four-by-two grid with wide empty gaps. All eight are the exact head of the character from the attached turnaround in its three-quarter view turned to the left — identical size, outline, angle, hair, hat and headwear — and each ends at the jaw with no neck. Only the face changes, in reading order: top row (1) neutral, (2) blink with eyes fully closed, (3) biting with the mouth wide open showing teeth, (4) chewing with a full mouth; bottom row: (5) hurt and wincing with one eye shut, (6) furious, (7) stunned with spiral eyes and the tongue out, (8) fading away with the eyes rolled up and the mouth hanging open. The default mood is exhausted and apologetic, always late, so even the neutral face carries it. Each head keeps the thin solid neon pink-and-cyan rim line of the hallucination, with no soft glow. Use flat even light with one hard cel-shading step and no cast shadows; thick uneven dark-purple #1B1030 marker outlines, faint paper grain inside the fills, no white sticker border. The background is one perfectly flat pure chroma green #00FF00 reaching all four edges, with no shadows, text, labels or numbers. Wide 16:9 sheet, 4K.
```

Доработка:
```
Make all eight heads exactly the same size and angle, changing only the facial expressions.
```

### Скелет рейд-лидера

*Сутки не вставал из-за компа ради легендарки. Так и не выпала.* В игре: аура: ускоряет соседних глюков.

**`raider_turn.png`** — развёртка: спереди, три четверти, сбоку, сзади. Фон маджента. Это эталон модели: по нему собирается риг и рисуются детали.

Приложи: `style_anchor`, `tpl_turn_magenta_left`

```
A character turnaround sheet in a grimy underground-comix sticker style, 16:9, made as a construction reference for rigging a 2D game puppet. Copy the attached grey template exactly: four full-body views of the same character standing side by side on one invisible ground line, all at the identical height and evenly spaced — in the left quarter the front view, then a three-quarter view turned to the left, then a strict side profile facing left, and in the right quarter the back view. In every view the character stands in a relaxed A-pose with both arms held about twenty degrees away from the body so the hands never overlap the torso, feet shoulder-width apart. The character is a grinning skeleton raid leader, bones yellowed and dusty, cobwebs between the ribs, a chunky gaming headset with a boom mic clamped over his skull, a ragged oversized gaming hoodie hanging off the bones, cargo shorts and one sock. The hoodie hangs loose on the bare bones and swings with every move, dust puffs off the joints, and the headset cable dangles down to the knee, and these folds stay consistent from view to view. As a hallucination the character carries a thin solid neon pink-and-cyan rim line just inside the dark outline in every view, with no soft glow. Every view uses the same flat even light with one hard cel-shading step and no cast shadows, so the four figures read as one model; thick uneven dark-purple #1B1030 marker outlines, faint paper grain inside the fills, no white sticker border. The background is one perfectly flat pure magenta #FF00FF reaching all four edges, with no floor, text, labels, numbers or arrows. Wide 16:9 sheet, 4K.
```

Доработка:
```
Make all four views exactly the same height and stand them on one shared ground line, keeping the character design identical.
```

**`raider_rig.png`** — детали для рига: торс спереди и сбоку, руки и ноги по суставам, кисти, стопы, реквизит. Фон маджента. Руки и ноги нарисованы целиком и отдельно — ими можно махать широко.

Приложи: `raider_turn`, `tpl_rig_magenta_left`

```
A cut-out puppet parts sheet in a grimy underground-comix sticker style, 16:9, that takes the character from the attached turnaround apart for skeletal animation, every piece at exactly the scale of the turnaround figures. Copy the attached grey template: three rows with wide empty gaps so nothing touches. Top row, left to right: the torso seen from the front with the neck hole and both shoulder sockets, the same torso in side profile facing left, the pelvis in side profile as a short briefs-like block cut from the trousers with two round hip sockets and no trouser legs, and a short neck cylinder. Middle row: an upper arm from shoulder to elbow and a forearm from elbow to wrist, both hanging perfectly straight and vertical, then four hands in side view — open and relaxed, a clenched fist, gripping a round handle with an empty hole through the grip, and pointing forward with the index finger. Bottom row: a thigh from hip to knee and a shin from knee to ankle, both straight and vertical, then the foot in side profile with the toes toward the left, and the same foot seen from the front. The character is a grinning skeleton raid leader from the attached turnaround; the hoodie sleeves split at the elbow over bare bone forearms, the bony legs split at the knee. Props laid out at the far right of the middle and bottom rows: a gaming mouse on a long cable swung like a flail, and an empty crushed energy-drink can with no brand. As a hallucination every piece carries a thin solid neon pink-and-cyan rim line just inside the dark outline, with no soft glow. Every piece is drawn complete, including the part normally hidden under its neighbour, and every joint end — shoulder, elbow, wrist, hip, knee, ankle and both ends of the neck — is a fully rounded cap that runs a little past the joint, so pieces overlap without gaps when they rotate. Use flat even light with one hard cel-shading step and no cast shadows; thick uneven dark-purple #1B1030 marker outlines, faint paper grain inside the fills, no white sticker border. The background is one perfectly flat pure magenta #FF00FF reaching all four edges, with no text, labels, numbers or guide lines. Wide 16:9 sheet, 4K.
```

Доработка:
```
Separate any touching pieces with wider gaps and straighten the arm and leg pieces so they hang vertically, keeping every design and scale identical.
```

**`raider_emote.png`** — эмоции: восемь лиц на одной голове. Фон маджента. Голова в том же ракурсе, что на развёртке: в игре лица подменяются.

Приложи: `raider_turn`, `tpl_faces_magenta_left`

```
An expression sheet for head swapping in 2D cut-out animation, in a grimy underground-comix sticker style, 16:9. Copy the attached grey template: eight heads in a four-by-two grid with wide empty gaps. All eight are the exact head of the character from the attached turnaround in its three-quarter view turned to the left — identical size, outline, angle, hair, hat and headwear — and each ends at the jaw with no neck. Only the face changes, in reading order: top row (1) neutral, (2) blink with eyes fully closed, (3) biting with the mouth wide open showing teeth, (4) chewing with a full mouth; bottom row: (5) hurt and wincing with one eye shut, (6) furious, (7) stunned with spiral eyes and the tongue out, (8) fading away with the eyes rolled up and the mouth hanging open. The default mood is manic and bossy, shouting orders, so even the neutral face carries it. Each head keeps the thin solid neon pink-and-cyan rim line of the hallucination, with no soft glow. Use flat even light with one hard cel-shading step and no cast shadows; thick uneven dark-purple #1B1030 marker outlines, faint paper grain inside the fills, no white sticker border. The background is one perfectly flat pure magenta #FF00FF reaching all four edges, with no shadows, text, labels or numbers. Wide 16:9 sheet, 4K.
```

Доработка:
```
Make all eight heads exactly the same size and angle, changing only the facial expressions.
```

### Пират-торрентщик

*Качал всё бесплатно. Теперь качается сам — на волнах ада.* В игре: шатается между рядами.

**`torrent_turn.png`** — развёртка: спереди, три четверти, сбоку, сзади. Фон зелёный. Это эталон модели: по нему собирается риг и рисуются детали.

Приложи: `style_anchor`, `tpl_turn_green_left`

```
A character turnaround sheet in a grimy underground-comix sticker style, 16:9, made as a construction reference for rigging a 2D game puppet. Copy the attached grey template exactly: four full-body views of the same character standing side by side on one invisible ground line, all at the identical height and evenly spaced — in the left quarter the front view, then a three-quarter view turned to the left, then a strict side profile facing left, and in the right quarter the back view. In every view the character stands in a relaxed A-pose with both arms held about twenty degrees away from the body so the hands never overlap the torso, feet shoulder-width apart. The character is an undead pirate captain with grey rotting skin, a bushy dirty orange beard, a black eyepatch with a tiny floppy-disk emblem, a dark tricorn hat with a white skull-and-crossed-cables badge, a red-and-white striped shirt, a wide leather belt and dark breeches; a parrot made from a USB stick with feathers glued on sits on his shoulder. The beard is matted and swings heavily, the striped shirt is torn at the hem, and seawater drips from the breeches, and these folds stay consistent from view to view. As a hallucination the character carries a thin solid neon pink-and-cyan rim line just inside the dark outline in every view, with no soft glow. Every view uses the same flat even light with one hard cel-shading step and no cast shadows, so the four figures read as one model; thick uneven dark-purple #1B1030 marker outlines, faint paper grain inside the fills, no white sticker border. The background is one perfectly flat pure chroma green #00FF00 reaching all four edges, with no floor, text, labels, numbers or arrows. Wide 16:9 sheet, 4K.
```

Доработка:
```
Make all four views exactly the same height and stand them on one shared ground line, keeping the character design identical.
```

**`torrent_rig.png`** — детали для рига: торс спереди и сбоку, руки и ноги по суставам, кисти, стопы, реквизит. Фон зелёный. Руки и ноги нарисованы целиком и отдельно — ими можно махать широко.

Приложи: `torrent_turn`, `tpl_rig_green_left`

```
A cut-out puppet parts sheet in a grimy underground-comix sticker style, 16:9, that takes the character from the attached turnaround apart for skeletal animation, every piece at exactly the scale of the turnaround figures. Copy the attached grey template: three rows with wide empty gaps so nothing touches. Top row, left to right: the torso seen from the front with the neck hole and both shoulder sockets, the same torso in side profile facing left, the pelvis in side profile as a short briefs-like block cut from the trousers with two round hip sockets and no trouser legs, and a short neck cylinder. Middle row: an upper arm from shoulder to elbow and a forearm from elbow to wrist, both hanging perfectly straight and vertical, then four hands in side view — open and relaxed, a clenched fist, gripping a round handle with an empty hole through the grip, and pointing forward with the index finger. Bottom row: a thigh from hip to knee and a shin from knee to ankle, both straight and vertical, then the foot in side profile with the toes toward the left, and the same foot seen from the front. The character is an undead pirate captain with grey rotting skin from the attached turnaround; the shirt sleeves split at the elbow, the breeches split at the knee; the parrot is part of the torso piece; the tricorn hat and beard are part of the head. Props laid out at the far right of the middle and bottom rows: a cutlass whose blade is a cracked shiny compact disc, and a wooden peg leg drawn as one straight vertical piece the length of shin plus foot. As a hallucination every piece carries a thin solid neon pink-and-cyan rim line just inside the dark outline, with no soft glow. Every piece is drawn complete, including the part normally hidden under its neighbour, and every joint end — shoulder, elbow, wrist, hip, knee, ankle and both ends of the neck — is a fully rounded cap that runs a little past the joint, so pieces overlap without gaps when they rotate. Use flat even light with one hard cel-shading step and no cast shadows; thick uneven dark-purple #1B1030 marker outlines, faint paper grain inside the fills, no white sticker border. The background is one perfectly flat pure chroma green #00FF00 reaching all four edges, with no text, labels, numbers or guide lines. Wide 16:9 sheet, 4K.
```

Доработка:
```
Separate any touching pieces with wider gaps and straighten the arm and leg pieces so they hang vertically, keeping every design and scale identical.
```

**`torrent_emote.png`** — эмоции: восемь лиц на одной голове. Фон зелёный. Голова в том же ракурсе, что на развёртке: в игре лица подменяются.

Приложи: `torrent_turn`, `tpl_faces_green_left`

```
An expression sheet for head swapping in 2D cut-out animation, in a grimy underground-comix sticker style, 16:9. Copy the attached grey template: eight heads in a four-by-two grid with wide empty gaps. All eight are the exact head of the character from the attached turnaround in its three-quarter view turned to the left — identical size, outline, angle, hair, hat and headwear — and each ends at the jaw with no neck. Only the face changes, in reading order: top row (1) neutral, (2) blink with eyes fully closed, (3) biting with the mouth wide open showing teeth, (4) chewing with a full mouth; bottom row: (5) hurt and wincing with one eye shut, (6) furious, (7) stunned with spiral eyes and the tongue out, (8) fading away with the eyes rolled up and the mouth hanging open. The default mood is drunk, cross-eyed and greedy, so even the neutral face carries it. Each head keeps the thin solid neon pink-and-cyan rim line of the hallucination, with no soft glow. Use flat even light with one hard cel-shading step and no cast shadows; thick uneven dark-purple #1B1030 marker outlines, faint paper grain inside the fills, no white sticker border. The background is one perfectly flat pure chroma green #00FF00 reaching all four edges, with no shadows, text, labels or numbers. Wide 16:9 sheet, 4K.
```

Доработка:
```
Make all eight heads exactly the same size and angle, changing only the facial expressions.
```

### Стример-трупак

*Стримил марафон без сна. Чат так и не заметил. Встаёт ещё раз: «чат, я вернулся».* В игре: воскресает один раз.

**`streamer_turn.png`** — развёртка: спереди, три четверти, сбоку, сзади. Фон зелёный. Это эталон модели: по нему собирается риг и рисуются детали.

Приложи: `style_anchor`, `tpl_turn_green_left`

```
A character turnaround sheet in a grimy underground-comix sticker style, 16:9, made as a construction reference for rigging a 2D game puppet. Copy the attached grey template exactly: four full-body views of the same character standing side by side on one invisible ground line, all at the identical height and evenly spaced — in the left quarter the front view, then a three-quarter view turned to the left, then a strict side profile facing left, and in the right quarter the back view. In every view the character stands in a relaxed A-pose with both arms held about twenty degrees away from the body so the hands never overlap the torso, feet shoulder-width apart. The character is a dead young streamer with grey-violet skin and stitched-up cheek, dark circles, bleached hair with dark roots, a big over-ear headset, a tight graphic tee with an abstract logo, a clip-on webcam on his collar, joggers and slides; a ring light halo stands behind his head like a saint's nimbus. The ring light casts a flat white rim on his hair and shoulders, the headset cable is tangled around his neck, and the joggers wrinkle at the knees, and these folds stay consistent from view to view. As a hallucination the character carries a thin solid neon pink-and-cyan rim line just inside the dark outline in every view, with no soft glow. Every view uses the same flat even light with one hard cel-shading step and no cast shadows, so the four figures read as one model; thick uneven dark-purple #1B1030 marker outlines, faint paper grain inside the fills, no white sticker border. The background is one perfectly flat pure chroma green #00FF00 reaching all four edges, with no floor, text, labels, numbers or arrows. Wide 16:9 sheet, 4K.
```

Доработка:
```
Make all four views exactly the same height and stand them on one shared ground line, keeping the character design identical.
```

**`streamer_rig.png`** — детали для рига: торс спереди и сбоку, руки и ноги по суставам, кисти, стопы, реквизит. Фон зелёный. Руки и ноги нарисованы целиком и отдельно — ими можно махать широко.

Приложи: `streamer_turn`, `tpl_rig_green_left`

```
A cut-out puppet parts sheet in a grimy underground-comix sticker style, 16:9, that takes the character from the attached turnaround apart for skeletal animation, every piece at exactly the scale of the turnaround figures. Copy the attached grey template: three rows with wide empty gaps so nothing touches. Top row, left to right: the torso seen from the front with the neck hole and both shoulder sockets, the same torso in side profile facing left, the pelvis in side profile as a short briefs-like block cut from the trousers with two round hip sockets and no trouser legs, and a short neck cylinder. Middle row: an upper arm from shoulder to elbow and a forearm from elbow to wrist, both hanging perfectly straight and vertical, then four hands in side view — open and relaxed, a clenched fist, gripping a round handle with an empty hole through the grip, and pointing forward with the index finger. Bottom row: a thigh from hip to knee and a shin from knee to ankle, both straight and vertical, then the foot in side profile with the toes toward the left, and the same foot seen from the front. The character is a dead young streamer with grey-violet skin and stitched-up cheek from the attached turnaround; the tee sleeves end on the upper arm with bare forearms, the joggers split at the knee; the ring light halo is part of the head piece. Props laid out at the far right of the middle and bottom rows: a selfie stick with a cracked phone, sized to fit the gripping hand. As a hallucination every piece carries a thin solid neon pink-and-cyan rim line just inside the dark outline, with no soft glow. Every piece is drawn complete, including the part normally hidden under its neighbour, and every joint end — shoulder, elbow, wrist, hip, knee, ankle and both ends of the neck — is a fully rounded cap that runs a little past the joint, so pieces overlap without gaps when they rotate. Use flat even light with one hard cel-shading step and no cast shadows; thick uneven dark-purple #1B1030 marker outlines, faint paper grain inside the fills, no white sticker border. The background is one perfectly flat pure chroma green #00FF00 reaching all four edges, with no text, labels, numbers or guide lines. Wide 16:9 sheet, 4K.
```

Доработка:
```
Separate any touching pieces with wider gaps and straighten the arm and leg pieces so they hang vertically, keeping every design and scale identical.
```

**`streamer_emote.png`** — эмоции: восемь лиц на одной голове. Фон зелёный. Голова в том же ракурсе, что на развёртке: в игре лица подменяются.

Приложи: `streamer_turn`, `tpl_faces_green_left`

```
An expression sheet for head swapping in 2D cut-out animation, in a grimy underground-comix sticker style, 16:9. Copy the attached grey template: eight heads in a four-by-two grid with wide empty gaps. All eight are the exact head of the character from the attached turnaround in its three-quarter view turned to the left — identical size, outline, angle, hair, hat and headwear — and each ends at the jaw with no neck. Only the face changes, in reading order: top row (1) neutral, (2) blink with eyes fully closed, (3) biting with the mouth wide open showing teeth, (4) chewing with a full mouth; bottom row: (5) hurt and wincing with one eye shut, (6) furious, (7) stunned with spiral eyes and the tongue out, (8) fading away with the eyes rolled up and the mouth hanging open. The default mood is fake-cheerful, desperate for attention, so even the neutral face carries it. Each head keeps the thin solid neon pink-and-cyan rim line of the hallucination, with no soft glow. Use flat even light with one hard cel-shading step and no cast shadows; thick uneven dark-purple #1B1030 marker outlines, faint paper grain inside the fills, no white sticker border. The background is one perfectly flat pure chroma green #00FF00 reaching all four edges, with no shadows, text, labels or numbers. Wide 16:9 sheet, 4K.
```

Доработка:
```
Make all eight heads exactly the same size and angle, changing only the facial expressions.
```

### Сисадмин-вампир

*Двадцать лет не видел солнца. Пьёт кофе группы крови «арабика».* В игре: лечится, пока кусает.

**`sysadmin_turn.png`** — развёртка: спереди, три четверти, сбоку, сзади. Фон зелёный. Это эталон модели: по нему собирается риг и рисуются детали.

Приложи: `style_anchor`, `tpl_turn_green_left`

```
A character turnaround sheet in a grimy underground-comix sticker style, 16:9, made as a construction reference for rigging a 2D game puppet. Copy the attached grey template exactly: four full-body views of the same character standing side by side on one invisible ground line, all at the identical height and evenly spaced — in the left quarter the front view, then a three-quarter view turned to the left, then a strict side profile facing left, and in the right quarter the back view. In every view the character stands in a relaxed A-pose with both arms held about twenty degrees away from the body so the hands never overlap the torso, feet shoulder-width apart. The character is a gaunt vampire system administrator with paper-white skin, slicked black hair with a widow's peak, red sleepless eyes, small fangs, a wrinkled black shirt with rolled sleeves, a lanyard with an access card, black trousers and orthopedic sandals with socks; a long cape made of tangled grey and blue network cables hangs from his shoulders. The cable cape drags on the floor and its loose plugs click together, the shirt is creased from sleeping at the desk, and the lanyard swings over the chest, and these folds stay consistent from view to view. As a hallucination the character carries a thin solid neon pink-and-cyan rim line just inside the dark outline in every view, with no soft glow. Every view uses the same flat even light with one hard cel-shading step and no cast shadows, so the four figures read as one model; thick uneven dark-purple #1B1030 marker outlines, faint paper grain inside the fills, no white sticker border. The background is one perfectly flat pure chroma green #00FF00 reaching all four edges, with no floor, text, labels, numbers or arrows. Wide 16:9 sheet, 4K.
```

Доработка:
```
Make all four views exactly the same height and stand them on one shared ground line, keeping the character design identical.
```

**`sysadmin_rig.png`** — детали для рига: торс спереди и сбоку, руки и ноги по суставам, кисти, стопы, реквизит. Фон зелёный. Руки и ноги нарисованы целиком и отдельно — ими можно махать широко.

Приложи: `sysadmin_turn`, `tpl_rig_green_left`

```
A cut-out puppet parts sheet in a grimy underground-comix sticker style, 16:9, that takes the character from the attached turnaround apart for skeletal animation, every piece at exactly the scale of the turnaround figures. Copy the attached grey template: three rows with wide empty gaps so nothing touches. Top row, left to right: the torso seen from the front with the neck hole and both shoulder sockets, the same torso in side profile facing left, the pelvis in side profile as a short briefs-like block cut from the trousers with two round hip sockets and no trouser legs, and a short neck cylinder. Middle row: an upper arm from shoulder to elbow and a forearm from elbow to wrist, both hanging perfectly straight and vertical, then four hands in side view — open and relaxed, a clenched fist, gripping a round handle with an empty hole through the grip, and pointing forward with the index finger. Bottom row: a thigh from hip to knee and a shin from knee to ankle, both straight and vertical, then the foot in side profile with the toes toward the left, and the same foot seen from the front. The character is a gaunt vampire system administrator with paper-white skin from the attached turnaround; the shirt sleeves end rolled just below the elbow on the forearm piece, the trousers split at the knee. Props laid out at the far right of the middle and bottom rows: a chipped office mug stained red inside, and a tangled bundle of patch cords. As a hallucination every piece carries a thin solid neon pink-and-cyan rim line just inside the dark outline, with no soft glow. Every piece is drawn complete, including the part normally hidden under its neighbour, and every joint end — shoulder, elbow, wrist, hip, knee, ankle and both ends of the neck — is a fully rounded cap that runs a little past the joint, so pieces overlap without gaps when they rotate. Use flat even light with one hard cel-shading step and no cast shadows; thick uneven dark-purple #1B1030 marker outlines, faint paper grain inside the fills, no white sticker border. The background is one perfectly flat pure chroma green #00FF00 reaching all four edges, with no text, labels, numbers or guide lines. Wide 16:9 sheet, 4K.
```

Доработка:
```
Separate any touching pieces with wider gaps and straighten the arm and leg pieces so they hang vertically, keeping every design and scale identical.
```

**`sysadmin_emote.png`** — эмоции: восемь лиц на одной голове. Фон зелёный. Голова в том же ракурсе, что на развёртке: в игре лица подменяются.

Приложи: `sysadmin_turn`, `tpl_faces_green_left`

```
An expression sheet for head swapping in 2D cut-out animation, in a grimy underground-comix sticker style, 16:9. Copy the attached grey template: eight heads in a four-by-two grid with wide empty gaps. All eight are the exact head of the character from the attached turnaround in its three-quarter view turned to the left — identical size, outline, angle, hair, hat and headwear — and each ends at the jaw with no neck. Only the face changes, in reading order: top row (1) neutral, (2) blink with eyes fully closed, (3) biting with the mouth wide open showing teeth, (4) chewing with a full mouth; bottom row: (5) hurt and wincing with one eye shut, (6) furious, (7) stunned with spiral eyes and the tongue out, (8) fading away with the eyes rolled up and the mouth hanging open. The default mood is cold, superior and very tired, so even the neutral face carries it. Each head keeps the thin solid neon pink-and-cyan rim line of the hallucination, with no soft glow. Use flat even light with one hard cel-shading step and no cast shadows; thick uneven dark-purple #1B1030 marker outlines, faint paper grain inside the fills, no white sticker border. The background is one perfectly flat pure chroma green #00FF00 reaching all four edges, with no shadows, text, labels or numbers. Wide 16:9 sheet, 4K.
```

Доработка:
```
Make all eight heads exactly the same size and angle, changing only the facial expressions.
```

### Коллекционер в блистере

*Никогда не открывал коробку, чтобы не упала цена. Его тоже никто не открывал.* В игре: танк: блистер трескается на половине здоровья.

**`collector_turn.png`** — развёртка: спереди, три четверти, сбоку, сзади. Фон маджента. Это эталон модели: по нему собирается риг и рисуются детали.

Приложи: `style_anchor`, `tpl_turn_magenta_left`

```
A character turnaround sheet in a grimy underground-comix sticker style, 16:9, made as a construction reference for rigging a 2D game puppet. Copy the attached grey template exactly: four full-body views of the same character standing side by side on one invisible ground line, all at the identical height and evenly spaced — in the left quarter the front view, then a three-quarter view turned to the left, then a strict side profile facing left, and in the right quarter the back view. In every view the character stands in a relaxed A-pose with both arms held about twenty degrees away from the body so the hands never overlap the torso, feet shoulder-width apart. The character is a pudgy middle-aged toy collector sealed inside a giant clear plastic blister pack glued to a printed cardboard backing card, mint-in-box, with a fake price sticker and a hang tab above his head; under the plastic he wears a too-small superhero-style t-shirt without any logo, khaki shorts and white socks. The clear plastic blister has hard creases and bright flat glints, it presses his cheeks and belly flat where it touches, and the cardboard card behind him is bent at the corners, and these folds stay consistent from view to view. As a hallucination the character carries a thin solid neon pink-and-cyan rim line just inside the dark outline in every view, with no soft glow. Every view uses the same flat even light with one hard cel-shading step and no cast shadows, so the four figures read as one model; thick uneven dark-purple #1B1030 marker outlines, faint paper grain inside the fills, no white sticker border. The background is one perfectly flat pure magenta #FF00FF reaching all four edges, with no floor, text, labels, numbers or arrows. Wide 16:9 sheet, 4K.
```

Доработка:
```
Make all four views exactly the same height and stand them on one shared ground line, keeping the character design identical.
```

**`collector_rig.png`** — детали для рига: торс спереди и сбоку, руки и ноги по суставам, кисти, стопы, реквизит. Фон маджента. Руки и ноги нарисованы целиком и отдельно — ими можно махать широко.

Приложи: `collector_turn`, `tpl_rig_magenta_left`

```
A cut-out puppet parts sheet in a grimy underground-comix sticker style, 16:9, that takes the character from the attached turnaround apart for skeletal animation, every piece at exactly the scale of the turnaround figures. Copy the attached grey template: three rows with wide empty gaps so nothing touches. Top row, left to right: the torso seen from the front with the neck hole and both shoulder sockets, the same torso in side profile facing left, the pelvis in side profile as a short briefs-like block cut from the trousers with two round hip sockets and no trouser legs, and a short neck cylinder. Middle row: an upper arm from shoulder to elbow and a forearm from elbow to wrist, both hanging perfectly straight and vertical, then four hands in side view — open and relaxed, a clenched fist, gripping a round handle with an empty hole through the grip, and pointing forward with the index finger. Bottom row: a thigh from hip to knee and a shin from knee to ankle, both straight and vertical, then the foot in side profile with the toes toward the left, and the same foot seen from the front. The character is a pudgy middle-aged toy collector sealed inside a giant clear plastic blister pack glued to a printed cardboard backing card from the attached turnaround; the blister front shell and the cardboard card are drawn as separate pieces, not fused to the body; the t-shirt sleeves end on the upper arm, the shorts split at the knee. Props laid out at the far right of the middle and bottom rows: the clear blister front shell as one separate piece, the same shell cracked and caved in as a second piece, and the cardboard backing card. As a hallucination every piece carries a thin solid neon pink-and-cyan rim line just inside the dark outline, with no soft glow. Every piece is drawn complete, including the part normally hidden under its neighbour, and every joint end — shoulder, elbow, wrist, hip, knee, ankle and both ends of the neck — is a fully rounded cap that runs a little past the joint, so pieces overlap without gaps when they rotate. Use flat even light with one hard cel-shading step and no cast shadows; thick uneven dark-purple #1B1030 marker outlines, faint paper grain inside the fills, no white sticker border. The background is one perfectly flat pure magenta #FF00FF reaching all four edges, with no text, labels, numbers or guide lines. Wide 16:9 sheet, 4K.
```

Доработка:
```
Separate any touching pieces with wider gaps and straighten the arm and leg pieces so they hang vertically, keeping every design and scale identical.
```

**`collector_emote.png`** — эмоции: восемь лиц на одной голове. Фон маджента. Голова в том же ракурсе, что на развёртке: в игре лица подменяются.

Приложи: `collector_turn`, `tpl_faces_magenta_left`

```
An expression sheet for head swapping in 2D cut-out animation, in a grimy underground-comix sticker style, 16:9. Copy the attached grey template: eight heads in a four-by-two grid with wide empty gaps. All eight are the exact head of the character from the attached turnaround in its three-quarter view turned to the left — identical size, outline, angle, hair, hat and headwear — and each ends at the jaw with no neck. Only the face changes, in reading order: top row (1) neutral, (2) blink with eyes fully closed, (3) biting with the mouth wide open showing teeth, (4) chewing with a full mouth; bottom row: (5) hurt and wincing with one eye shut, (6) furious, (7) stunned with spiral eyes and the tongue out, (8) fading away with the eyes rolled up and the mouth hanging open. The default mood is smug and protective of his value, so even the neutral face carries it. Each head keeps the thin solid neon pink-and-cyan rim line of the hallucination, with no soft glow. Use flat even light with one hard cel-shading step and no cast shadows; thick uneven dark-purple #1B1030 marker outlines, faint paper grain inside the fills, no white sticker border. The background is one perfectly flat pure magenta #FF00FF reaching all four edges, with no shadows, text, labels or numbers. Wide 16:9 sheet, 4K.
```

Доработка:
```
Make all eight heads exactly the same size and angle, changing only the facial expressions.
```

### Культист-мастер подземелий

*Двадцать лет водил одну кампанию. Игроки давно умерли. Он — нет.* В игре: призывает картонных гоблинов.

**`dm_turn.png`** — развёртка: спереди, три четверти, сбоку, сзади. Фон маджента. Это эталон модели: по нему собирается риг и рисуются детали.

Приложи: `style_anchor`, `tpl_turn_magenta_left`

```
A character turnaround sheet in a grimy underground-comix sticker style, 16:9, made as a construction reference for rigging a 2D game puppet. Copy the attached grey template exactly: four full-body views of the same character standing side by side on one invisible ground line, all at the identical height and evenly spaced — in the left quarter the front view, then a three-quarter view turned to the left, then a strict side profile facing left, and in the right quarter the back view. In every view the character stands in a relaxed A-pose with both arms held about twenty degrees away from the body so the hands never overlap the torso, feet shoulder-width apart. The character is a hooded cultist dungeon master in a robe made from a striped bedsheet tied with a bathrobe belt, a translucent purple d20 hanging on a cord around his neck, glowing eyes under the hood, a scraggly beard and Cheetos dust on his fingers. The bedsheet robe has crisp fold lines from the packet, it drags on the floor and is singed at the hem, and the d20 pendant swings and catches the light, and these folds stay consistent from view to view. As a hallucination the character carries a thin solid neon pink-and-cyan rim line just inside the dark outline in every view, with no soft glow. Every view uses the same flat even light with one hard cel-shading step and no cast shadows, so the four figures read as one model; thick uneven dark-purple #1B1030 marker outlines, faint paper grain inside the fills, no white sticker border. The background is one perfectly flat pure magenta #FF00FF reaching all four edges, with no floor, text, labels, numbers or arrows. Wide 16:9 sheet, 4K.
```

Доработка:
```
Make all four views exactly the same height and stand them on one shared ground line, keeping the character design identical.
```

**`dm_rig.png`** — детали для рига: торс спереди и сбоку, руки и ноги по суставам, кисти, стопы, реквизит. Фон маджента. Руки и ноги нарисованы целиком и отдельно — ими можно махать широко.

Приложи: `dm_turn`, `tpl_rig_magenta_left`

```
A cut-out puppet parts sheet in a grimy underground-comix sticker style, 16:9, that takes the character from the attached turnaround apart for skeletal animation, every piece at exactly the scale of the turnaround figures. Copy the attached grey template: three rows with wide empty gaps so nothing touches. Top row, left to right: the torso seen from the front with the neck hole and both shoulder sockets, the same torso in side profile facing left, the pelvis in side profile as a short briefs-like block cut from the trousers with two round hip sockets and no trouser legs, and a short neck cylinder. Middle row: an upper arm from shoulder to elbow and a forearm from elbow to wrist, both hanging perfectly straight and vertical, then four hands in side view — open and relaxed, a clenched fist, gripping a round handle with an empty hole through the grip, and pointing forward with the index finger. Bottom row: a thigh from hip to knee and a shin from knee to ankle, both straight and vertical, then the foot in side profile with the toes toward the left, and the same foot seen from the front. The character is a hooded cultist dungeon master in a robe made from a striped bedsheet tied with a bathrobe belt from the attached turnaround; the wide robe sleeves split at the elbow; the lower robe is drawn as one separate bell-shaped skirt piece from waist to ankles, with plain legs and slippers underneath. Props laid out at the far right of the middle and bottom rows: a folded cardboard game-master screen used as a shield, a rubber chicken held like a sacrificial dagger, and a small cardboard goblin minion standing on its own. As a hallucination every piece carries a thin solid neon pink-and-cyan rim line just inside the dark outline, with no soft glow. Every piece is drawn complete, including the part normally hidden under its neighbour, and every joint end — shoulder, elbow, wrist, hip, knee, ankle and both ends of the neck — is a fully rounded cap that runs a little past the joint, so pieces overlap without gaps when they rotate. Use flat even light with one hard cel-shading step and no cast shadows; thick uneven dark-purple #1B1030 marker outlines, faint paper grain inside the fills, no white sticker border. The background is one perfectly flat pure magenta #FF00FF reaching all four edges, with no text, labels, numbers or guide lines. Wide 16:9 sheet, 4K.
```

Доработка:
```
Separate any touching pieces with wider gaps and straighten the arm and leg pieces so they hang vertically, keeping every design and scale identical.
```

**`dm_emote.png`** — эмоции: восемь лиц на одной голове. Фон маджента. Голова в том же ракурсе, что на развёртке: в игре лица подменяются.

Приложи: `dm_turn`, `tpl_faces_magenta_left`

```
An expression sheet for head swapping in 2D cut-out animation, in a grimy underground-comix sticker style, 16:9. Copy the attached grey template: eight heads in a four-by-two grid with wide empty gaps. All eight are the exact head of the character from the attached turnaround in its three-quarter view turned to the left — identical size, outline, angle, hair, hat and headwear — and each ends at the jaw with no neck. Only the face changes, in reading order: top row (1) neutral, (2) blink with eyes fully closed, (3) biting with the mouth wide open showing teeth, (4) chewing with a full mouth; bottom row: (5) hurt and wincing with one eye shut, (6) furious, (7) stunned with spiral eyes and the tongue out, (8) fading away with the eyes rolled up and the mouth hanging open. The default mood is theatrical, menacing and a bit sad, so even the neutral face carries it. Each head keeps the thin solid neon pink-and-cyan rim line of the hallucination, with no soft glow. Use flat even light with one hard cel-shading step and no cast shadows; thick uneven dark-purple #1B1030 marker outlines, faint paper grain inside the fills, no white sticker border. The background is one perfectly flat pure magenta #FF00FF reaching all four edges, with no shadows, text, labels or numbers. Wide 16:9 sheet, 4K.
```

Доработка:
```
Make all eight heads exactly the same size and angle, changing only the facial expressions.
```

### Рептилоид из ютуба

*Сам снял видео про рептилоидов. Досмотрел до конца.* В игре: быстрый, глушит ауры предметов рядом.

**`reptiloid_turn.png`** — развёртка: спереди, три четверти, сбоку, сзади. Фон маджента. Это эталон модели: по нему собирается риг и рисуются детали.

Приложи: `style_anchor`, `tpl_turn_magenta_left`

```
A character turnaround sheet in a grimy underground-comix sticker style, 16:9, made as a construction reference for rigging a 2D game puppet. Copy the attached grey template exactly: four full-body views of the same character standing side by side on one invisible ground line, all at the identical height and evenly spaced — in the left quarter the front view, then a three-quarter view turned to the left, then a strict side profile facing left, and in the right quarter the back view. In every view the character stands in a relaxed A-pose with both arms held about twenty degrees away from the body so the hands never overlap the torso, feet shoulder-width apart. The character is a lizard man in an ill-fitting cheap grey business suit and loosened tie, green scaly skin, vertical slit pupils, a forked tongue flicking out, a hat folded from tinfoil on his head, and a cheap earpiece. The suit jacket is a size too big and bunches at the shoulders, the tinfoil hat crinkles with sharp flat highlights, and his tail pokes out from under the jacket, and these folds stay consistent from view to view. As a hallucination the character carries a thin solid neon pink-and-cyan rim line just inside the dark outline in every view, with no soft glow. Every view uses the same flat even light with one hard cel-shading step and no cast shadows, so the four figures read as one model; thick uneven dark-purple #1B1030 marker outlines, faint paper grain inside the fills, no white sticker border. The background is one perfectly flat pure magenta #FF00FF reaching all four edges, with no floor, text, labels, numbers or arrows. Wide 16:9 sheet, 4K.
```

Доработка:
```
Make all four views exactly the same height and stand them on one shared ground line, keeping the character design identical.
```

**`reptiloid_rig.png`** — детали для рига: торс спереди и сбоку, руки и ноги по суставам, кисти, стопы, реквизит. Фон маджента. Руки и ноги нарисованы целиком и отдельно — ими можно махать широко.

Приложи: `reptiloid_turn`, `tpl_rig_magenta_left`

```
A cut-out puppet parts sheet in a grimy underground-comix sticker style, 16:9, that takes the character from the attached turnaround apart for skeletal animation, every piece at exactly the scale of the turnaround figures. Copy the attached grey template: three rows with wide empty gaps so nothing touches. Top row, left to right: the torso seen from the front with the neck hole and both shoulder sockets, the same torso in side profile facing left, the pelvis in side profile as a short briefs-like block cut from the trousers with two round hip sockets and no trouser legs, and a short neck cylinder. Middle row: an upper arm from shoulder to elbow and a forearm from elbow to wrist, both hanging perfectly straight and vertical, then four hands in side view — open and relaxed, a clenched fist, gripping a round handle with an empty hole through the grip, and pointing forward with the index finger. Bottom row: a thigh from hip to knee and a shin from knee to ankle, both straight and vertical, then the foot in side profile with the toes toward the left, and the same foot seen from the front. The character is a lizard man in an ill-fitting cheap grey business suit and loosened tie from the attached turnaround; the suit sleeves split at the elbow, the trousers split at the knee; the tail is drawn as one separate curved piece; the tinfoil hat is part of the head. Props laid out at the far right of the middle and bottom rows: a cork board with photos and red strings, sized to be held in front of the chest. As a hallucination every piece carries a thin solid neon pink-and-cyan rim line just inside the dark outline, with no soft glow. Every piece is drawn complete, including the part normally hidden under its neighbour, and every joint end — shoulder, elbow, wrist, hip, knee, ankle and both ends of the neck — is a fully rounded cap that runs a little past the joint, so pieces overlap without gaps when they rotate. Use flat even light with one hard cel-shading step and no cast shadows; thick uneven dark-purple #1B1030 marker outlines, faint paper grain inside the fills, no white sticker border. The background is one perfectly flat pure magenta #FF00FF reaching all four edges, with no text, labels, numbers or guide lines. Wide 16:9 sheet, 4K.
```

Доработка:
```
Separate any touching pieces with wider gaps and straighten the arm and leg pieces so they hang vertically, keeping every design and scale identical.
```

**`reptiloid_emote.png`** — эмоции: восемь лиц на одной голове. Фон маджента. Голова в том же ракурсе, что на развёртке: в игре лица подменяются.

Приложи: `reptiloid_turn`, `tpl_faces_magenta_left`

```
An expression sheet for head swapping in 2D cut-out animation, in a grimy underground-comix sticker style, 16:9. Copy the attached grey template: eight heads in a four-by-two grid with wide empty gaps. All eight are the exact head of the character from the attached turnaround in its three-quarter view turned to the left — identical size, outline, angle, hair, hat and headwear — and each ends at the jaw with no neck. Only the face changes, in reading order: top row (1) neutral, (2) blink with eyes fully closed, (3) biting with the mouth wide open showing teeth, (4) chewing with a full mouth; bottom row: (5) hurt and wincing with one eye shut, (6) furious, (7) stunned with spiral eyes and the tongue out, (8) fading away with the eyes rolled up and the mouth hanging open. The default mood is paranoid, shifty and secretly pleased, so even the neutral face carries it. Each head keeps the thin solid neon pink-and-cyan rim line of the hallucination, with no soft glow. Use flat even light with one hard cel-shading step and no cast shadows; thick uneven dark-purple #1B1030 marker outlines, faint paper grain inside the fills, no white sticker border. The background is one perfectly flat pure magenta #FF00FF reaching all four edges, with no shadows, text, labels or numbers. Wide 16:9 sheet, 4K.
```

Доработка:
```
Make all eight heads exactly the same size and angle, changing only the facial expressions.
```

### Диктатор в пачке

*Сатира: самый злой человек века, вечно униженный в розовой балетной пачке.* В игре: крутит фуэте и уворачивается.

**`dictator_turn.png`** — развёртка: спереди, три четверти, сбоку, сзади. Фон зелёный. Это эталон модели: по нему собирается риг и рисуются детали.

Приложи: `style_anchor`, `tpl_turn_green_left`

```
A character turnaround sheet in a grimy underground-comix sticker style, 16:9, made as a construction reference for rigging a 2D game puppet. Copy the attached grey template exactly: four full-body views of the same character standing side by side on one invisible ground line, all at the identical height and evenly spaced — in the left quarter the front view, then a three-quarter view turned to the left, then a strict side profile facing left, and in the right quarter the back view. In every view the character stands in a relaxed A-pose with both arms held about twenty degrees away from the body so the hands never overlap the torso, feet shoulder-width apart. The character is a satirical caricature of a furious 1940s dictator dressed as a ballerina: a small angry man with a black side-parted fringe glued flat and a small rectangular toothbrush moustache, a pink ballet leotard, bare arms, white tights and pink pointe shoes with ribbons; no uniform, no symbols, no armbands, no insignia of any kind. The layered tulle tutu sticks out stiffly and bounces, the tights wrinkle at the ankles, and the pointe shoes are scuffed, and these folds stay consistent from view to view. As a hallucination the character carries a thin solid neon pink-and-cyan rim line just inside the dark outline in every view, with no soft glow. Every view uses the same flat even light with one hard cel-shading step and no cast shadows, so the four figures read as one model; thick uneven dark-purple #1B1030 marker outlines, faint paper grain inside the fills, no white sticker border. The background is one perfectly flat pure chroma green #00FF00 reaching all four edges, with no floor, text, labels, numbers or arrows. Wide 16:9 sheet, 4K.
```

Доработка:
```
Make all four views exactly the same height and stand them on one shared ground line, keeping the character design identical.
```

**`dictator_rig.png`** — детали для рига: торс спереди и сбоку, руки и ноги по суставам, кисти, стопы, реквизит. Фон зелёный. Руки и ноги нарисованы целиком и отдельно — ими можно махать широко.

Приложи: `dictator_turn`, `tpl_rig_green_left`

```
A cut-out puppet parts sheet in a grimy underground-comix sticker style, 16:9, that takes the character from the attached turnaround apart for skeletal animation, every piece at exactly the scale of the turnaround figures. Copy the attached grey template: three rows with wide empty gaps so nothing touches. Top row, left to right: the torso seen from the front with the neck hole and both shoulder sockets, the same torso in side profile facing left, the pelvis in side profile as a short briefs-like block cut from the trousers with two round hip sockets and no trouser legs, and a short neck cylinder. Middle row: an upper arm from shoulder to elbow and a forearm from elbow to wrist, both hanging perfectly straight and vertical, then four hands in side view — open and relaxed, a clenched fist, gripping a round handle with an empty hole through the grip, and pointing forward with the index finger. Bottom row: a thigh from hip to knee and a shin from knee to ankle, both straight and vertical, then the foot in side profile with the toes toward the left, and the same foot seen from the front. The character is a satirical caricature of a furious 1940s dictator dressed as a ballerina: a small angry man with a black side-parted fringe glued flat and a small rectangular toothbrush moustache from the attached turnaround; the tutu is drawn as part of the pelvis piece, sticking out sideways; the tights split at the knee; the feet stand on pointe. Props laid out at the far right of the middle and bottom rows: none, leave the props area empty. As a hallucination every piece carries a thin solid neon pink-and-cyan rim line just inside the dark outline, with no soft glow. Every piece is drawn complete, including the part normally hidden under its neighbour, and every joint end — shoulder, elbow, wrist, hip, knee, ankle and both ends of the neck — is a fully rounded cap that runs a little past the joint, so pieces overlap without gaps when they rotate. Use flat even light with one hard cel-shading step and no cast shadows; thick uneven dark-purple #1B1030 marker outlines, faint paper grain inside the fills, no white sticker border. The background is one perfectly flat pure chroma green #00FF00 reaching all four edges, with no text, labels, numbers or guide lines. Wide 16:9 sheet, 4K.
```

Доработка:
```
Separate any touching pieces with wider gaps and straighten the arm and leg pieces so they hang vertically, keeping every design and scale identical.
```

**`dictator_emote.png`** — эмоции: восемь лиц на одной голове. Фон зелёный. Голова в том же ракурсе, что на развёртке: в игре лица подменяются.

Приложи: `dictator_turn`, `tpl_faces_green_left`

```
An expression sheet for head swapping in 2D cut-out animation, in a grimy underground-comix sticker style, 16:9. Copy the attached grey template: eight heads in a four-by-two grid with wide empty gaps. All eight are the exact head of the character from the attached turnaround in its three-quarter view turned to the left — identical size, outline, angle, hair, hat and headwear — and each ends at the jaw with no neck. Only the face changes, in reading order: top row (1) neutral, (2) blink with eyes fully closed, (3) biting with the mouth wide open showing teeth, (4) chewing with a full mouth; bottom row: (5) hurt and wincing with one eye shut, (6) furious, (7) stunned with spiral eyes and the tongue out, (8) fading away with the eyes rolled up and the mouth hanging open. The default mood is furious and humiliated, so even the neutral face carries it. Each head keeps the thin solid neon pink-and-cyan rim line of the hallucination, with no soft glow. Use flat even light with one hard cel-shading step and no cast shadows; thick uneven dark-purple #1B1030 marker outlines, faint paper grain inside the fills, no white sticker border. The background is one perfectly flat pure chroma green #00FF00 reaching all four edges, with no shadows, text, labels or numbers. Wide 16:9 sheet, 4K.
```

Доработка:
```
Make all eight heads exactly the same size and angle, changing only the facial expressions.
```

### Сосед с перфоратором

*Ремонт с 2009 года. Начинает в 7 утра в субботу. Босс.* В игре: босс: оглушает предметы в ряду, сносит стены.

**`neighbor_turn.png`** — развёртка: спереди, три четверти, сбоку, сзади. Фон маджента. Это эталон модели: по нему собирается риг и рисуются детали.

Приложи: `style_anchor`, `tpl_turn_magenta_left`

```
A character turnaround sheet in a grimy underground-comix sticker style, 16:9, made as a construction reference for rigging a 2D game puppet. Copy the attached grey template exactly: four full-body views of the same character standing side by side on one invisible ground line, all at the identical height and evenly spaced — in the left quarter the front view, then a three-quarter view turned to the left, then a strict side profile facing left, and in the right quarter the back view. In every view the character stands in a relaxed A-pose with both arms held about twenty degrees away from the body so the hands never overlap the torso, feet shoulder-width apart. The character is a huge burly neighbor in a stretched white tank top, sweatpants and flip-flops, a hairy belly, a sunburnt bald head with a pencil behind the ear, safety goggles pushed up on the forehead, covered in grey plaster dust. Plaster dust settles in the folds of the tank top and puffs off with every step, the sweatpants sag under the belly, and the flip-flops slap the floor, and these folds stay consistent from view to view. As a hallucination the character carries a thin solid neon pink-and-cyan rim line just inside the dark outline in every view, with no soft glow. Every view uses the same flat even light with one hard cel-shading step and no cast shadows, so the four figures read as one model; thick uneven dark-purple #1B1030 marker outlines, faint paper grain inside the fills, no white sticker border. The background is one perfectly flat pure magenta #FF00FF reaching all four edges, with no floor, text, labels, numbers or arrows. Wide 16:9 sheet, 4K.
```

Доработка:
```
Make all four views exactly the same height and stand them on one shared ground line, keeping the character design identical.
```

**`neighbor_rig.png`** — детали для рига: торс спереди и сбоку, руки и ноги по суставам, кисти, стопы, реквизит. Фон маджента. Руки и ноги нарисованы целиком и отдельно — ими можно махать широко.

Приложи: `neighbor_turn`, `tpl_rig_magenta_left`

```
A cut-out puppet parts sheet in a grimy underground-comix sticker style, 16:9, that takes the character from the attached turnaround apart for skeletal animation, every piece at exactly the scale of the turnaround figures. Copy the attached grey template: three rows with wide empty gaps so nothing touches. Top row, left to right: the torso seen from the front with the neck hole and both shoulder sockets, the same torso in side profile facing left, the pelvis in side profile as a short briefs-like block cut from the trousers with two round hip sockets and no trouser legs, and a short neck cylinder. Middle row: an upper arm from shoulder to elbow and a forearm from elbow to wrist, both hanging perfectly straight and vertical, then four hands in side view — open and relaxed, a clenched fist, gripping a round handle with an empty hole through the grip, and pointing forward with the index finger. Bottom row: a thigh from hip to knee and a shin from knee to ankle, both straight and vertical, then the foot in side profile with the toes toward the left, and the same foot seen from the front. The character is a huge burly neighbor in a stretched white tank top from the attached turnaround; bare arms, the sweatpants split at the knee. Props laid out at the far right of the middle and bottom rows: a heavy industrial hammer drill with a long concrete bit, and a coiled orange extension cord. As a hallucination every piece carries a thin solid neon pink-and-cyan rim line just inside the dark outline, with no soft glow. Every piece is drawn complete, including the part normally hidden under its neighbour, and every joint end — shoulder, elbow, wrist, hip, knee, ankle and both ends of the neck — is a fully rounded cap that runs a little past the joint, so pieces overlap without gaps when they rotate. Use flat even light with one hard cel-shading step and no cast shadows; thick uneven dark-purple #1B1030 marker outlines, faint paper grain inside the fills, no white sticker border. The background is one perfectly flat pure magenta #FF00FF reaching all four edges, with no text, labels, numbers or guide lines. Wide 16:9 sheet, 4K.
```

Доработка:
```
Separate any touching pieces with wider gaps and straighten the arm and leg pieces so they hang vertically, keeping every design and scale identical.
```

**`neighbor_emote.png`** — эмоции: восемь лиц на одной голове. Фон маджента. Голова в том же ракурсе, что на развёртке: в игре лица подменяются.

Приложи: `neighbor_turn`, `tpl_faces_magenta_left`

```
An expression sheet for head swapping in 2D cut-out animation, in a grimy underground-comix sticker style, 16:9. Copy the attached grey template: eight heads in a four-by-two grid with wide empty gaps. All eight are the exact head of the character from the attached turnaround in its three-quarter view turned to the left — identical size, outline, angle, hair, hat and headwear — and each ends at the jaw with no neck. Only the face changes, in reading order: top row (1) neutral, (2) blink with eyes fully closed, (3) biting with the mouth wide open showing teeth, (4) chewing with a full mouth; bottom row: (5) hurt and wincing with one eye shut, (6) furious, (7) stunned with spiral eyes and the tongue out, (8) fading away with the eyes rolled up and the mouth hanging open. The default mood is cheerful and relentless, so even the neutral face carries it. Each head keeps the thin solid neon pink-and-cyan rim line of the hallucination, with no soft glow. Use flat even light with one hard cel-shading step and no cast shadows; thick uneven dark-purple #1B1030 marker outlines, faint paper grain inside the fills, no white sticker border. The background is one perfectly flat pure magenta #FF00FF reaching all four edges, with no shadows, text, labels or numbers. Wide 16:9 sheet, 4K.
```

Доработка:
```
Make all eight heads exactly the same size and angle, changing only the facial expressions.
```

### Тамагочи-переросток

*Умер от голода в 2003-м, потому что хозяин уехал на дачу. Помнит.* В игре: быстрый: катится и таранит.

**`tamagotchi.png`** — не гуманоид, один лист. Фон зелёный.

Приложи: `style_anchor`

```
A game sprite sheet in a grimy underground-comix sticker style, 1:1, of a rolling hallucination enemy: a giant egg-shaped handheld digital pet device made of scratched pastel-pink plastic, with three round buttons below a small pixel screen and a broken keychain chain dangling from the top loop. Six versions of the same object at exactly the same size in a three-by-two grid with wide gaps, nothing touching. Top row: the pixel screen showing an angry pixel-art face; the screen showing a wide-open biting pixel mouth; the shell cracked with a dead pixel skull on the screen. Bottom row: the screen blinking; the screen showing spiral pixel eyes; the plain back side of the shell with a battery cover and no screen, for the rolling animation. The pastel plastic carries scuff marks, fingerprint smudges and one sticker peeling at the corner; the screen glows flat green with visible pixel grid. A thin solid neon pink-and-cyan rim line runs just inside the dark outline, with no soft glow. Use flat even light with one hard cel-shading step and no cast shadows; thick uneven dark-purple #1B1030 marker outlines, faint paper grain inside the fills, no white sticker border. The background is one perfectly flat pure chroma green #00FF00 reaching all four edges, with no text, labels or numbers. Square 1:1 sheet, 4K.
```

Доработка:
```
Make all six versions exactly the same size and shape, changing only the screen and the cracks.
```

<!-- foes:end -->


<!-- items:start -->
## 5. Предметы

Вместо обороны из бытовой техники — хлам из хаты гика-укурка, который комбинируется. Правила и дерево рецептов — в `docs/ITEMS.md`, книга рецептов — в арт-пульте.

Предметы — реальный мир: приглушённые цвета, без неонового ореола, у каждого маленькое мультяшное лицо, как у чайника и холодильника. Все смотрят вправо, на глюков, и стоят на полу так, чтобы влезать в одну клетку поля.

Лист — 4 предмета в колонках. Сверху предмет в покое, снизу он же в действии: в той же позе и того же размера, меняются только детали действия. Звёзды (★) рисую в игре, на листе их нет.

Промты по гайду Nano Banana Pro: одно плотное описание листа без служебных блоков — формат и стиль, предметы с материалами и физикой действия, раскладка, свет, исполнение, формат в конце. Ниже каждого промта — команда доработки для второго сообщения в том же чате.

**`items_base_1.png`** — Базовые 1: Зажигалка, Пустая бутылка, Гриндер, Батарейка. Фон маджента.

Приложи: `style_anchor`, `tpl_items_magenta`

```
A flat 2D game sprite sheet in a grimy underground-comix sticker style, 16:9, of 4 living objects from a stoner geek's apartment. Copy the attached grey template: four columns, two rows, wide empty gaps; each column is one object, idle on top and in action directly below at the identical size, angle and footprint. Column 1: a cheap plastic disposable LIGHTER, bright orange, standing upright; below, in action: flicking a big flame jet to the right. Column 2: an empty brown glass BEER BOTTLE with a blank peeling label; below, in action: cracked all over and wobbling, a few glass shards flying. Column 3: a round four-piece metal HERB GRINDER, shiny silver with visible teeth; below, in action: lid flipped open like a jaw, metal teeth biting forward. Column 4: a big chunky AA-style BATTERY standing upright, copper top, lightning bolt label; below, in action: crackling with small blue electric arcs all around. Each object stands in a three-quarter view facing right, fits one floor tile and has a small cartoon face with heavy-lidded eyes, like the attached style reference. Wear shows as texture, not gloss: scuffed plastic, chipped paint, greasy cardboard, smudged glass, dented metal; only action effects may glow, the objects keep a muted real-world palette. Flat even light, one hard cel-shading step, no cast shadows; thick uneven dark-purple #1B1030 marker outlines, faint paper grain, no white sticker border. Background: one perfectly flat pure magenta #FF00FF to all four edges, no text, labels, numbers or stars. 16:9 sheet, 4K.
```

Доработка:
```
Keep the layout, every other object and the flat background exactly the same, and redraw only the bottom cell of column 2 so the object has the same size and angle as the idle cell above it.
```

**`items_base_2.png`** — Базовые 2: Фигурка, Плакат, Чипсы, Кубик D20. Фон зелёный.

Приложи: `style_anchor`, `tpl_items_green`

```
A flat 2D game sprite sheet in a grimy underground-comix sticker style, 16:9, of 4 living objects from a stoner geek's apartment. Copy the attached grey template: four columns, two rows, wide empty gaps; each column is one object, idle on top and in action directly below at the identical size, angle and footprint. Column 1: a small plastic ACTION FIGURE of an original muscular space hero in a cape on a round base; below, in action: throwing a tiny plastic part forward with one arm. Column 2: a rolled-up psychedelic POSTER with a rubber band, slightly unrolled showing a trippy spiral; below, in action: unrolled flat on the ground with sticky tape strips on the corners. Column 3: a crinkled bag of paprika POTATO CHIPS with no brand name; below, in action: bag torn open, chips flying out and a glowing yellow lightbulb popping out. Column 4: a big translucent purple twenty-sided D20 DICE; below, in action: spinning in the air, glowing, the 20 face pointing at the viewer. Each object stands in a three-quarter view facing right, fits one floor tile and has a small cartoon face with heavy-lidded eyes, like the attached style reference. Wear shows as texture, not gloss: scuffed plastic, chipped paint, greasy cardboard, smudged glass, dented metal; only action effects may glow, the objects keep a muted real-world palette. Flat even light, one hard cel-shading step, no cast shadows; thick uneven dark-purple #1B1030 marker outlines, faint paper grain, no white sticker border. Background: one perfectly flat pure chroma green #00FF00 to all four edges, no text, labels, numbers or stars. 16:9 sheet, 4K.
```

Доработка:
```
Keep the layout, every other object and the flat background exactly the same, and redraw only the bottom cell of column 2 so the object has the same size and angle as the idle cell above it.
```

**`items_t2_1.png`** — Второй уровень 1: Бонг, Кола с ментосом, Электрогриндер, Крошкомёт. Фон маджента.

Приложи: `style_anchor`, `tpl_items_magenta`, `items_base_1`, `items_base_2`

```
A flat 2D game sprite sheet in a grimy underground-comix sticker style, 16:9, of 4 living objects from a stoner geek's apartment. Copy the attached grey template: four columns, two rows, wide empty gaps; each column is one object, idle on top and in action directly below at the identical size, angle and footprint. Column 1: a tall glass WATER PIPE (bong) with a little bowl on the side, bubbling blue water inside; below, in action: puffing a big round smoke ring forward. Column 2: a plastic SODA BOTTLE with no brand, white candy mints stuck in the open neck; below, in action: erupting a huge fountain of brown foam. Column 3: the metal grinder with a battery duct-taped to its side and a little motor on top; below, in action: spinning wildly, sparks flying, teeth a blur. Column 4: the metal grinder mounted on a chips bag like a stubby shotgun barrel; below, in action: blasting a wide cone of chip crumbs forward. Parts taken from the attached item sheets are drawn exactly as there, so each combination stays recognizable. Each object stands in a three-quarter view facing right, fits one floor tile and has a small cartoon face with heavy-lidded eyes, like the attached style reference. Wear shows as texture, not gloss: scuffed plastic, chipped paint, greasy cardboard, smudged glass, dented metal; only action effects may glow, the objects keep a muted real-world palette. Flat even light, one hard cel-shading step, no cast shadows; thick uneven dark-purple #1B1030 marker outlines, faint paper grain, no white sticker border. Background: one perfectly flat pure magenta #FF00FF to all four edges, no text, labels, numbers or stars. 16:9 sheet, 4K.
```

Доработка:
```
Keep the layout, every other object and the flat background exactly the same, and redraw only the bottom cell of column 2 so the object has the same size and angle as the idle cell above it.
```

**`items_t2_2.png`** — Второй уровень 2: Лава-лампа, Неоновая вывеска, Аниме-плакат, Благовония. Фон зелёный.

Приложи: `style_anchor`, `tpl_items_green`, `items_base_1`, `items_base_2`

```
A flat 2D game sprite sheet in a grimy underground-comix sticker style, 16:9, of 4 living objects from a stoner geek's apartment. Copy the attached grey template: four columns, two rows, wide empty gaps; each column is one object, idle on top and in action directly below at the identical size, angle and footprint. Column 1: a retro LAVA LAMP with slow orange and yellow blobs in a tapered glass; below, in action: blobs glowing hot, soft light rays around the lamp. Column 2: a buzzing NEON SIGN shaped like a mushroom on a small black frame, tubes unlit pale; below, in action: tubes blazing bright pink and cyan with light rays. Column 3: a poster of an original cute anime girl with big sparkly eyes, standing on a small easel; below, in action: poster glowing, pink hearts flying out of it. Column 4: an INCENSE holder: a little carved wooden stand with three thin smoking sticks; below, in action: thick purple smoke curling up and spreading around. Parts taken from the attached item sheets are drawn exactly as there, so each combination stays recognizable. Each object stands in a three-quarter view facing right, fits one floor tile and has a small cartoon face with heavy-lidded eyes, like the attached style reference. Wear shows as texture, not gloss: scuffed plastic, chipped paint, greasy cardboard, smudged glass, dented metal; only action effects may glow, the objects keep a muted real-world palette. Flat even light, one hard cel-shading step, no cast shadows; thick uneven dark-purple #1B1030 marker outlines, faint paper grain, no white sticker border. Background: one perfectly flat pure chroma green #00FF00 to all four edges, no text, labels, numbers or stars. 16:9 sheet, 4K.
```

Доработка:
```
Keep the layout, every other object and the flat background exactly the same, and redraw only the bottom cell of column 2 so the object has the same size and angle as the idle cell above it.
```

**`items_t2_3.png`** — Второй уровень 3: Попкорн-пушка, Фигурка-самурай, Робот-трансформер, Коробки от пиццы. Фон маджента.

Приложи: `style_anchor`, `tpl_items_magenta`, `items_base_1`, `items_base_2`

```
A flat 2D game sprite sheet in a grimy underground-comix sticker style, 16:9, of 4 living objects from a stoner geek's apartment. Copy the attached grey template: four columns, two rows, wide empty gaps; each column is one object, idle on top and in action directly below at the identical size, angle and footprint. Column 1: a red-and-white striped POPCORN BUCKET turned into a little cannon with a lighter for a fuse; below, in action: blasting popcorn kernels forward in a fan. Column 2: the action figure now in samurai armor, holding a tiny katana, on a round base; below, in action: mid-slash with a white crescent arc. Column 3: a chunky toy ROBOT figure with a battery backpack and one round visor eye; below, in action: firing a thick red laser beam from the eye. Column 4: a stack of three greasy PIZZA BOXES with a stern face drawn in marker; below, in action: dented and bitten, grease stains, still standing. Parts taken from the attached item sheets are drawn exactly as there, so each combination stays recognizable. Each object stands in a three-quarter view facing right, fits one floor tile and has a small cartoon face with heavy-lidded eyes, like the attached style reference. Wear shows as texture, not gloss: scuffed plastic, chipped paint, greasy cardboard, smudged glass, dented metal; only action effects may glow, the objects keep a muted real-world palette. Flat even light, one hard cel-shading step, no cast shadows; thick uneven dark-purple #1B1030 marker outlines, faint paper grain, no white sticker border. Background: one perfectly flat pure magenta #FF00FF to all four edges, no text, labels, numbers or stars. 16:9 sheet, 4K.
```

Доработка:
```
Keep the layout, every other object and the flat background exactly the same, and redraw only the bottom cell of column 2 so the object has the same size and angle as the idle cell above it.
```

**`items_t3_1.png`** — Третий уровень 1: Кальян, Диско-шар, Алтарь фигурок, Голограмма. Фон зелёный.

Приложи: `style_anchor`, `tpl_items_green`, `items_t2_1`, `items_t2_2`, `items_t2_3`

```
A flat 2D game sprite sheet in a grimy underground-comix sticker style, 16:9, of 4 living objects from a stoner geek's apartment. Copy the attached grey template: four columns, two rows, wide empty gaps; each column is one object, idle on top and in action directly below at the identical size, angle and footprint. Column 1: a fancy ornate HOOKAH with four hoses and a glowing lava-lamp glass base; below, in action: billowing a huge wall of colorful smoke. Column 2: a big mirrored DISCO BALL hanging from a bent floor-lamp stand; below, in action: spinning, throwing colorful light beams in every direction. Column 3: a small wooden shelf SHRINE crowded with action figures, incense and candles, an anime poster behind; below, in action: glowing, a tiny figure jumping off the shelf. Column 4: a small projector robot projecting a glitchy translucent hologram of an anime girl; below, in action: hologram flickering bigger with scanlines. Parts taken from the attached item sheets are drawn exactly as there, so each combination stays recognizable. Each object stands in a three-quarter view facing right, fits one floor tile and has a small cartoon face with heavy-lidded eyes, like the attached style reference. Wear shows as texture, not gloss: scuffed plastic, chipped paint, greasy cardboard, smudged glass, dented metal; only action effects may glow, the objects keep a muted real-world palette. Flat even light, one hard cel-shading step, no cast shadows; thick uneven dark-purple #1B1030 marker outlines, faint paper grain, no white sticker border. Background: one perfectly flat pure chroma green #00FF00 to all four edges, no text, labels, numbers or stars. 16:9 sheet, 4K.
```

Доработка:
```
Keep the layout, every other object and the flat background exactly the same, and redraw only the bottom cell of column 2 so the object has the same size and angle as the idle cell above it.
```

**`items_t3_2.png`** — Третий уровень 2: Вейп-мортира, Попкорн-миномёт, Огнемёт из баллончика, Пицца-крепость. Фон маджента.

Приложи: `style_anchor`, `tpl_items_magenta`, `items_t2_1`, `items_t2_2`, `items_t2_3`

```
A flat 2D game sprite sheet in a grimy underground-comix sticker style, 16:9, of 4 living objects from a stoner geek's apartment. Copy the attached grey template: four columns, two rows, wide empty gaps; each column is one object, idle on top and in action directly below at the identical size, angle and footprint. Column 1: a giant chunky VAPE MOD with a soda-bottle tank, mounted on a stand like a mortar; below, in action: launching a dense ball of vapor upward. Column 2: a little red POPCORN MACHINE on wheels with a launch tube on top; below, in action: launching a flaming popcorn bucket upward. Column 3: an AEROSOL SPRAY CAN with a lighter duct-taped in front of the nozzle; below, in action: spraying a big cone of fire forward. Column 4: a little fortress built from pizza boxes with a grinder turret on top; below, in action: turret firing a stream of crumbs. Parts taken from the attached item sheets are drawn exactly as there, so each combination stays recognizable. Each object stands in a three-quarter view facing right, fits one floor tile and has a small cartoon face with heavy-lidded eyes, like the attached style reference. Wear shows as texture, not gloss: scuffed plastic, chipped paint, greasy cardboard, smudged glass, dented metal; only action effects may glow, the objects keep a muted real-world palette. Flat even light, one hard cel-shading step, no cast shadows; thick uneven dark-purple #1B1030 marker outlines, faint paper grain, no white sticker border. Background: one perfectly flat pure magenta #FF00FF to all four edges, no text, labels, numbers or stars. 16:9 sheet, 4K.
```

Доработка:
```
Keep the layout, every other object and the flat background exactly the same, and redraw only the bottom cell of column 2 so the object has the same size and angle as the idle cell above it.
```

**`items_t3_3.png`** — Третий уровень 3: Тесла-лампа, Неоновая катана, Мега-меха, Блендер. Фон зелёный.

Приложи: `style_anchor`, `tpl_items_green`, `items_t2_1`, `items_t2_2`, `items_t2_3`

```
A flat 2D game sprite sheet in a grimy underground-comix sticker style, 16:9, of 4 living objects from a stoner geek's apartment. Copy the attached grey template: four columns, two rows, wide empty gaps; each column is one object, idle on top and in action directly below at the identical size, angle and footprint. Column 1: a PLASMA BALL lamp on a base built from grinder parts and a battery; below, in action: shooting forked purple lightning forward. Column 2: a KATANA with a glowing neon-tube blade stuck upright in a small stand; below, in action: releasing a long glowing slash wave forward. Column 3: a big toy MECHA robot in samurai armor with a katana and a laser visor; below, in action: firing the laser and swinging the katana at once. Column 4: a kitchen BLENDER jar full of grinder teeth, with a hungry face on the jar; below, in action: spinning with a vortex and splashes, lid rattling. Parts taken from the attached item sheets are drawn exactly as there, so each combination stays recognizable. Each object stands in a three-quarter view facing right, fits one floor tile and has a small cartoon face with heavy-lidded eyes, like the attached style reference. Wear shows as texture, not gloss: scuffed plastic, chipped paint, greasy cardboard, smudged glass, dented metal; only action effects may glow, the objects keep a muted real-world palette. Flat even light, one hard cel-shading step, no cast shadows; thick uneven dark-purple #1B1030 marker outlines, faint paper grain, no white sticker border. Background: one perfectly flat pure chroma green #00FF00 to all four edges, no text, labels, numbers or stars. 16:9 sheet, 4K.
```

Доработка:
```
Keep the layout, every other object and the flat background exactly the same, and redraw only the bottom cell of column 2 so the object has the same size and angle as the idle cell above it.
```

**`items_t3_4.png`** — Третий уровень 4 и секреты: Картонный танк, Третий глаз, Пати-хата. Фон маджента.

Приложи: `style_anchor`, `tpl_items_magenta`, `items_t2_1`, `items_t2_2`, `items_t2_3`

```
A flat 2D game sprite sheet in a grimy underground-comix sticker style, 16:9, of 3 living objects from a stoner geek's apartment. Copy the attached grey template: four columns, two rows, wide empty gaps; each column is one object, idle on top and in action directly below at the identical size, angle and footprint. Column 1: a cardboard-box TANK with a paper-tube cannon and a toy robot driver in the hatch; below, in action: rolling forward, the cardboard cannon firing. Column 2: a small floating stone PYRAMID with one giant glowing eye, wisps of smoke around; below, in action: the eye opening wide and sweeping a golden beam. Column 3: a tiny house made of pizza boxes with a disco ball on the roof and two speakers; below, in action: bass shockwave rings, confetti and party lights. Column 4 stays empty. Parts taken from the attached item sheets are drawn exactly as there, so each combination stays recognizable. Each object stands in a three-quarter view facing right, fits one floor tile and has a small cartoon face with heavy-lidded eyes, like the attached style reference. Wear shows as texture, not gloss: scuffed plastic, chipped paint, greasy cardboard, smudged glass, dented metal; only action effects may glow, the objects keep a muted real-world palette. Flat even light, one hard cel-shading step, no cast shadows; thick uneven dark-purple #1B1030 marker outlines, faint paper grain, no white sticker border. Background: one perfectly flat pure magenta #FF00FF to all four edges, no text, labels, numbers or stars. 16:9 sheet, 4K.
```

Доработка:
```
Keep the layout, every other object and the flat background exactly the same, and redraw only the bottom cell of column 2 so the object has the same size and angle as the idle cell above it.
```

**`fx_items_1.png`** — Эффекты 1: снаряды и удары. Фон зелёный.

Приложи: `style_anchor`, `tpl_items_green`

```
A flat 2D game effects sprite sheet in a grimy underground-comix sticker style, 16:9, following the attached grey layout template: eight cells in four columns and two rows with wide empty gaps, nothing touching, each cell holding one separate centered effect of about the same size. In reading order: a white smoke ring; a purple poison cloud; three popped popcorn kernels; a short thick red laser beam segment; a cone-shaped blast of chip crumbs; a brown foam explosion splash; a glowing pink-and-cyan crescent slash wave; a forked purple lightning bolt. Each effect is built from bold flat shapes with crisp edges and one hard cel-shading step, never soft blur or airbrush, so it can be cut out and layered over the game; glows are drawn as flat solid halo bands. Thick uneven dark-purple #1B1030 marker outlines, faint paper grain, no white sticker border. The background is one perfectly flat pure chroma green #00FF00 reaching all four edges, with no shadows, text, labels or numbers. 16:9 sheet, 4K.
```

Доработка:
```
Replace any soft blur with flat solid shapes and crisp edges, keeping every effect and the layout identical.
```

**`fx_items_2.png`** — Эффекты 2: ауры и вспышки. Фон маджента.

Приложи: `style_anchor`, `tpl_items_magenta`

```
A flat 2D game effects sprite sheet in a grimy underground-comix sticker style, 16:9, following the attached grey layout template: eight cells in four columns and two rows with wide empty gaps, nothing touching, each cell holding one separate centered effect of about the same size. In reading order: a cone of orange fire; a sticky grey duct-tape puddle on the floor; three pink hearts; a cluster of colorful disco light beams; a white-and-gold starburst flash for merging items; a small dust poof for an item landing on the ground; a tiny walking action figure helper; a glitchy translucent cyan hologram square with scanlines. Each effect is built from bold flat shapes with crisp edges and one hard cel-shading step, never soft blur or airbrush, so it can be cut out and layered over the game; glows are drawn as flat solid halo bands. Thick uneven dark-purple #1B1030 marker outlines, faint paper grain, no white sticker border. The background is one perfectly flat pure magenta #FF00FF reaching all four edges, with no shadows, text, labels or numbers. 16:9 sheet, 4K.
```

Доработка:
```
Replace any soft blur with flat solid shapes and crisp edges, keeping every effect and the layout identical.
```

Пылесос (`roomba`) остаётся последним рубежом в каждом ряду — он уже загружен.
<!-- items:end -->





## 6. Окружение

Промты по гайду Nano Banana Pro: плотное режиссёрское описание без тегов-усилителей, чёткие планы (передний, средний, задний), физика света и материалов, формат в конце. Для фонов-вариантов — редактирование готового двора, чтобы планировка совпала пиксель в пиксель. Под каждым промтом — команда для точечной доработки, её пишешь вторым сообщением в тот же чат генератора.

**`bg_yard_night.png`** (16:9, 4K) — основной фон. Готово, уже загружено.

Приложи: `style_anchor`

```
[STYLE]
Game background, 16:9, no characters. The same shabby backyard as in the attached style reference, at night, seen from a high 3/4 top-down side angle like a board game. LEFT 20% of the frame: the back wall of the same weathered wooden house with the open back door spilling warm yellow light and the wooden porch with steps, empty, no characters. RIGHT 80% of the frame, lower 80% of the height: one large flat rectangular yard of trampled dirt and patchy dry grass with a few cracked concrete paving slabs, completely EMPTY and evenly lit so game pieces can be placed on it, no objects, no furniture, no holes, no strong shadows crossing it. TOP 20% strip above the yard: a sagging wooden fence, a clothesline with laundry, a rusty garage wall, dark trees, one yellow street lamp. FAR RIGHT edge: the fence is broken and a swirling psychedelic neon fog in pink, cyan and acid green leaks in. Muted dusty purple night palette with warm lamp yellow; neon only in the fog on the right. No text.
```


**`bg_yard_fog.png`** — туманная ночь. Туман стелется справа от портала и редеет к крыльцу, фонарь даёт объёмный луч, площадка остаётся читаемой для игры.

Приложи: `bg_yard_night`

```
Edit the attached backyard illustration while keeping the camera, the layout and every object exactly where they are. A low, dense ground fog rolls in through the broken fence on the far right and creeps leftward across the yard, knee-high and thickest in the right third, thinning to wisps before it reaches the porch steps. Where the fog touches the swirling neon portal it picks up a faint sickly mint-green tint that fades to neutral grey further left. The street lamp dims slightly, and its warm 2700K cone becomes a visible volumetric beam cutting through the haze in the upper midground. The trampled dirt of the central yard stays evenly lit and fully readable through the thin fog so game pieces remain clear on it. Keep the same thick dark-purple marker outlines, flat cel-shaded fills and paper grain. Cinematic 16:9 widescreen framing.
```

Доработка:
```
Make the fog thinner over the central yard so the ground is fully visible, keeping everything else identical.
```

**`bg_yard_rain.png`** — дождливая ночь. Дождь косой, лужи отражают фонарь, мокрая грязь бликует — но без бликов, мешающих видеть поле.

Приложи: `bg_yard_night`

```
Edit the attached backyard illustration while keeping the camera, the layout and every object exactly where they are. Heavy night rain falls in thin slanted streaks drawn as flat light-blue strokes, angled from the upper right to the lower left as if driven by wind. Shallow puddles form in the low spots of the trampled yard, each reflecting a stretched, wobbling smear of the yellow street lamp; raindrops break the reflections into rings. The dirt turns darker and wet with soft flat highlights, the laundry on the clothesline hangs soaked and heavy, and water drips off the porch roof edge in a thin curtain in the left foreground. The swirling neon portal on the far right hisses where rain hits it, throwing small pink and cyan sparks. Keep the central yard evenly lit and readable for game pieces, the same thick dark-purple marker outlines, flat cel-shaded fills and paper grain. Cinematic 16:9 widescreen framing.
```

Доработка:
```
Reduce the number of rain streaks over the central yard by half, keeping everything else identical.
```

**`bg_yard_trip.png`** — двор «плывёт». Реальность плавится только по краям кадра, центр поля остаётся спокойным для игры.

Приложи: `bg_yard_night`

```
Edit the attached backyard illustration while keeping the camera, the layout and every object exactly where they are. Reality starts to melt at the edges of the frame: the night sky in the upper band twists into slow concentric swirls of hot pink, mint green and cyan, the fence planks in the background bend and drip like warm wax, and the full moon opens a single huge heavy-lidded eye that looks down at the yard. The trampled dirt of the central yard stays solid and calm, with only faint rainbow ripple rings spreading across it, so game pieces remain clear. The warm porch light on the left stays real and untouched, a small island of normality, and casts a clean yellow wedge onto the steps. Neon colors spill as flat tinted reflections onto the house siding and the fence. Same thick dark-purple marker outlines, flat cel-shaded fills and paper grain. Cinematic 16:9 widescreen framing.
```

Доработка:
```
Make the melting effect weaker on the fence and stronger in the sky, keeping the rest of the image identical.
```

**`bg_yard_kraken.png`** — затопленный двор для босса. Детский бассейн у правого края светится изнутри, на заборе тени щупалец.

Приложи: `bg_yard_night`, `kraken`

```
Edit the attached backyard illustration while keeping the camera, the layout and every object exactly where they are. The whole yard is flooded ankle-deep with dark still water that mirrors the street lamp and the house windows in long rippled reflections. At the far right edge, in front of the broken fence, a cheap blue inflatable kiddie pool printed with cartoon ducks sags and overflows, glowing violet from inside as if something huge lurks beneath; that violet light spills across the water surface in a widening fan. Giant tentacle shadows from the attached kraken sheet fall across the fence planks in the background. Floating debris drifts in the midground: a flip-flop, a chip bag, a rubber duck. The central yard stays evenly lit and readable through the shallow water so game pieces remain clear. Same thick dark-purple marker outlines, flat cel-shaded fills and paper grain. Cinematic 16:9 widescreen framing.
```

Доработка:
```
Make the water in the central yard clearer and lighter so the ground shows through, keeping everything else identical.
```

**`bg_livingroom.png`** (16:9) — для меню и катсцен. Готово, уже загружено.

Приложи: `style_anchor`

```
[STYLE]
Game background, 16:9, no characters. A messy bachelor LIVING ROOM at night seen straight-on like a theatre stage. An old brown sofa in the centre facing the viewer, a low table with pizza boxes, instant-noodle cups and mugs, a carpet hanging on the wall, a floor lamp, a window on the right showing a dark backyard, a door to the yard on the far right. The only light is the flickering blue-white glow of a TV that sits off-frame in front of the sofa. Muted dusty purple palette. No text.
```


**`fg_props.png`** — передний план для параллакса. Отдельные предметы, одинаково освещённые, чтобы их можно было расставить у нижнего края экрана.

Приложи: `style_anchor`, `bg_yard_night`

```
A flat 2D game prop sprite sheet in a grimy underground-comix sticker style, 16:9, holding nine separate backyard foreground objects laid out in a loose three-by-three grid with wide empty gaps so nothing touches: a rusty kettle barbecue grill with flaking black paint, a leaning stack of three bald car tyres, a tipped-over garden gnome with a chipped nose, a dented galvanised metal bucket, a broken section of grey wooden fence with two missing planks, a tuft of dry weeds with seed heads, a coiled green garden hose, a cracked white plastic chair, and a street lamp post with a warm yellow glass head. Each object matches the house and yard of the attached background in color and wear, is seen from the same high three-quarter angle, and rests on an unseen floor. Lighting is flat and even with one hard cel-shading step and no cast shadows. Thick uneven dark-purple #1B1030 marker outlines, faint paper grain, no white sticker border. The background is one perfectly flat pure magenta #FF00FF reaching all four edges, with no text or labels. 16:9 sheet, 4K.
```

Доработка:
```
Move the objects further apart so none of them touch, keeping their designs identical.
```

## 7. Катсцены

Статичные кадры 16:9 без текста и облачков: подписи, панорамы, тряску и звук добавлю сам. К каждому прикладывай `style_anchor`, листы Вована и Димона (лица должны совпасть) и то, что указано в строке «Приложи». Белая обводка-стикер на персонажах здесь уместна — это стиль обложки.

Три варианта у каждого кадра: **1 — точный** (ровно сюжет, чистая постановка), **2 — атмосферный** (драматичный свет и необычный ракурс), **3 — фактурный** (печатная фактура комикса). Выбирай любой, но лучше держать все кадры интро в одном варианте, чтобы они смотрелись одной сценой.

**`cs_intro_01.png`** — сидят у телека. Готово, уже загружено.

```
[STYLE]
Interior night. Vovan and Dimon slumped on an old brown sofa, seen from the front, faces lit by flickering blue TV light, empty noodle cups and pizza boxes on the table, the fat orange cat asleep between them. Both stare blankly at the screen with huge pupils. Calm, cosy, stupid.
[хвост]
```


**`cs_intro_02.png`** — грохот во дворе. Кадр держится на внезапности: оба дёргаются к окну, кружка на лету, кот дыбом.

Приложи: `style_anchor`, `vovan`, `dimon`, `bg_livingroom`

Вариант 1 — точный:
```
A cinematic comic-book panel in a grimy underground-comix sticker style, 16:9. In the messy living room from the attached background, Vovan and Dimon from the attached character sheets jolt upright on the sagging brown sofa at the exact moment a crash sounds from the backyard: both heads snap toward the dark window on the right, Vovan's bloodshot eyes bulging under his red beanie, Dimon's round glasses sliding down his nose under the olive bucket hat. In the immediate foreground a mug tips off the low table, cold tea arcing through the air over pizza boxes and noodle cups; the fat orange cat between them puffs up with every hair on end. In the background the window glass rattles inside jagged comic shock lines. The only light is the cold blue-white flicker of an off-frame TV, giving hard rim light on their faces and long shadows across the carpet. Thick uneven dark-purple marker outlines, flat fills with one hard cel step, faint paper grain, no text. Cinematic 16:9 widescreen framing.
```

Вариант 2 — атмосферный:
```
A cinematic comic-book panel in a grimy underground-comix sticker style, 16:9, staged as a low Dutch-angle shot from carpet level behind the coffee table. In the immediate foreground a tipping mug and a spilled bag of chips fill the lower left corner, slightly out of scale. In the midground Vovan and Dimon from the attached character sheets freeze mid-flinch on the sofa, heads snapped toward the window on the right; the fat orange cat between them is a puffed-up silhouette. Through the cracked window in the background a sickly glow of magenta and mint neon leaks in from the yard and spills across their cheeks, fighting the cold 6500K blue flicker of the off-frame TV. Deep indigo shadows swallow the room's corners. Split-complementary grade of cold TV blue and hot neon magenta. Thick uneven dark-purple marker outlines, flat cel fills, no text. Cinematic 16:9 widescreen framing.
```

Вариант 3 — фактурный:
```
A cinematic comic-book panel printed like a cheap 1990s risograph zine, 16:9, with two-ink misregistration, coarse halftone dot shading and visible paper fibers under thick uneven dark-purple marker lines. In the living room from the attached background, Vovan and Dimon from the attached character sheets jolt on the sagging sofa toward a crash from the backyard: both heads snapped to the window on the right, Vovan's red beanie and Dimon's olive bucket hat and round glasses unchanged. A mug tips off the low table in the foreground, its tea splash printed in flat halftone; the fat orange cat puffs up between them. Shock lines burst around the window in the background. Light from an off-frame TV is rendered as a single flat pale-blue ink pass layered over warm paper. Flat inks, slight ink bleed at the edges, no text. Cinematic 16:9 widescreen framing.
```

Доработка:
```
Make the shock lines around the window bigger and add a faint neon glow leaking through the window cracks, keeping both characters and the composition identical.
```

**`cs_intro_03.png`** — выходят посмотреть. Взгляд из тёмного двора на дом: щель двери, тёплый свет, две головы одна над другой.

Приложи: `style_anchor`, `vovan`, `dimon`, `bg_yard_night`

Вариант 1 — точный:
```
A cinematic comic-book panel in a grimy underground-comix sticker style, 16:9, seen from the dark backyard of the attached background looking back at the house. In the midground the back door opens a hand's width and warm 2700K light spills out in a sharp wedge across the porch boards; Vovan and Dimon from the attached character sheets peek through the gap one above the other, Dimon's olive bucket hat and round glasses on top, Vovan's red beanie and wide bloodshot eyes below. Vovan clutches a chips bag to his chest, Dimon holds a pink fluffy slipper raised like a weapon. Their long shadows stretch out of the doorway across the trampled yard toward the viewer in the immediate foreground. The yard around the camera is cold blue night, with a faint neon flicker from the off-frame right edge. Thick uneven dark-purple marker outlines, flat cel fills, faint paper grain, no text. Cinematic 16:9 widescreen framing.
```

Вариант 2 — атмосферный:
```
A cinematic comic-book panel in a grimy underground-comix sticker style, 16:9, shot from ground level among weeds in the dark yard, with tall dry grass blades blurred in the immediate foreground framing the view. Far in the midground the back door of the house cracks open and a narrow blade of warm 2700K light cuts across the porch; Vovan and Dimon from the attached character sheets peer out, stacked, only their faces and hats lit, eyes catching the light. Their shadows stretch impossibly long across the yard right up to the camera. Cold moonlight rims the house roof, and an unseen neon source off the right edge throws a thin magenta streak across the siding. Heavy chiaroscuro: most of the frame is deep indigo with two warm faces in it. Thick uneven dark-purple marker outlines, flat cel fills, no text. Cinematic 16:9 widescreen framing.
```

Вариант 3 — фактурный:
```
A cinematic comic-book panel printed like a cheap 1990s risograph zine, 16:9, with two-ink misregistration, coarse halftone shading and visible paper fibers under thick dark-purple marker lines. Seen from the dark backyard of the attached background, the back door opens a hand's width; warm yellow ink floods the doorway and porch boards in one flat pass. Vovan and Dimon from the attached character sheets peek out one above the other, hats and faces unchanged, Vovan hugging a chips bag, Dimon raising a pink fluffy slipper. Their shadows stretch across the yard toward the viewer as flat dark-blue ink shapes with slight bleed at the edges. The night yard is a single cold blue halftone field. Flat inks, no gradients, no text. Cinematic 16:9 widescreen framing.
```

Доработка:
```
Make the door gap narrower and the light wedge sharper, keeping both faces and the composition identical.
```

**`cs_intro_04.png`** — зомби-сосед. Первый глюк крупно: жуёт садового гнома посреди двора, вокруг опрокинутое ведро — источник грохота.

Приложи: `style_anchor`, `zombie`, `bg_yard_night`

Вариант 1 — точный:
```
A cinematic comic-book panel in a grimy underground-comix sticker style, 16:9. In the center of the trampled backyard from the attached background stands the zombie neighbour from the attached sheet, pot-bellied in a stained white tank top and blue tracksuit pants, gnawing on a garden gnome held in both green hands, ceramic crumbs falling from its chipped hat; he stares straight at the viewer with mismatched eyes. Around his slippers lie the culprits of the crash: a knocked-over galvanised bucket still rolling and a toppled trash can spilling cans in the foreground. Behind him in the background the yellow street lamp throws a warm 2700K cone, while the zombie alone is outlined by a thin solid neon pink-and-cyan rim line, as if pasted over reality. The rest of the yard stays muted dusty purple. Thick uneven dark-purple marker outlines, flat cel fills, faint paper grain, no text. Cinematic 16:9 widescreen framing.
```

Вариант 2 — атмосферный:
```
A cinematic comic-book panel in a grimy underground-comix sticker style, 16:9, shot from an extreme low angle near the ground, a rolling dented bucket huge in the immediate foreground. Towering in the midground, the zombie neighbour from the attached sheet gnaws a garden gnome, crumbs raining down toward the lens, his belly and slack jaw dominating the frame. The street lamp directly behind his head creates a harsh warm backlight halo, so his face is in shadow except for two glinting mismatched eyes and a thin solid neon pink-and-cyan rim line around his silhouette. Cold blue night fills the sky behind. Strong silhouette contrast, deep indigo shadows, one warm 2700K source, neon accent only on the zombie. Thick uneven dark-purple marker outlines, flat cel fills, no text. Cinematic 16:9 widescreen framing.
```

Вариант 3 — фактурный:
```
A cinematic comic-book panel printed like a cheap 1990s risograph zine, 16:9, with misregistered fluorescent pink and teal inks over muted purple, coarse halftone dots and visible paper fibers. In the center of the backyard from the attached background the zombie neighbour from the attached sheet chews a garden gnome, ceramic crumbs printed as scattered flat dots, staring at the viewer. A knocked-over bucket and toppled trash can lie in the foreground. The zombie is printed with a fluorescent pink ink pass that sits slightly off his outline, so he looks pasted onto the muted yard. Thick uneven dark-purple marker lines, flat inks, slight bleed, no text. Cinematic 16:9 widescreen framing.
```

Доработка:
```
Make the gnome bigger in his hands and add a few more ceramic crumbs falling, keeping the zombie's design and the composition identical.
```

**`cs_intro_05.png`** — их там много. Кадр через плечи друзей: за забором под психоделическим небом шагает толпа силуэтов.

Приложи: `style_anchor`, `vovan`, `dimon`, `bg_yard_night`, `zombie`, `alien`, `ballerina`, `pirate`

Вариант 1 — точный:
```
A cinematic comic-book panel in a grimy underground-comix sticker style, 16:9, an over-the-shoulder wide shot from the porch. In the immediate foreground Vovan and Dimon from the attached character sheets are dark backlit silhouettes seen from behind, the red beanie and the olive bucket hat still readable at the frame's lower left and right. In the midground the backyard from the attached background stretches to the broken fence. Beyond the fence, under a swirling sky of hot pink, mint and cyan, dozens of hallucinations shuffle toward the yard: the zombie neighbour, the grey alien, the ballerina caricature and the pirate from the attached sheets in front, a crowd of glowing silhouettes behind them, and a giant tentacle rising in the deep background. Only the hallucinations carry a thin solid neon rim line; the real yard stays muted. Thick uneven dark-purple marker outlines, flat cel fills, no text. Cinematic 16:9 widescreen framing.
```

Вариант 2 — атмосферный:
```
A cinematic comic-book panel in a grimy underground-comix sticker style, 16:9, an ultra-wide shot from low behind the porch railing. Vovan and Dimon from the attached character sheets fill the left and right edges of the immediate foreground as black cut-out silhouettes, their hats outlined in warm doorway light. The entire upper two thirds of the frame is a churning psychedelic sky that pours down like a waterfall of hot pink, mint and cyan into the deep background, where a horde of glowing hallucinations, led by the zombie, alien, ballerina and pirate from the attached sheets, marches through a breached fence toward the camera. The neon floods the yard with colored spill, casting long multicolored shadows back toward the porch. Extreme scale contrast, deep indigo foreground, saturated neon background. Thick uneven dark-purple marker outlines, flat cel fills, no text. Cinematic 16:9 widescreen framing.
```

Вариант 3 — фактурный:
```
A cinematic comic-book panel printed like a cheap 1990s risograph zine, 16:9, with fluorescent pink, teal and yellow inks misregistered over muted purple, coarse halftone dots and visible paper fibers. Over the shoulders of Vovan and Dimon from the attached character sheets, printed as flat black silhouettes in the foreground, the backyard stretches to a broken fence; beyond it a crowd of hallucinations, the zombie, alien, ballerina and pirate from the attached sheets in front, shuffles forward under a sky of overprinted spirals where the inks overlap into new colors. A giant tentacle rises in the deep background as a single teal ink shape. Thick uneven dark-purple marker lines, flat inks with slight bleed, no text. Cinematic 16:9 widescreen framing.
```

Доработка:
```
Push the crowd further back and make the sky swirls larger, keeping the two silhouettes in the foreground identical.
```

**`cs_intro_06.png`** — решили отбиваться. Героический нижний ракурс: друзья выносят из хаты хлам, из которого дальше собирается оборона.

Приложи: `style_anchor`, `vovan`, `dimon`, `items_base_1`, `items_base_2`

Вариант 1 — точный:
```
A cinematic comic-book panel in a grimy underground-comix sticker style, 16:9, a heroic low-angle shot on the porch. Vovan and Dimon from the attached character sheets stride out of the warm doorway carrying the apartment's junk as weapons: Vovan hugs an armful of chips bags, a big battery and a rolled psychedelic poster, Dimon carries a crate overflowing with action figures, a grinder and an empty beer bottle, all matching the attached item sheets. The fat orange cat rides on top of a stack of greasy pizza boxes between them. In the background the doorway blazes with warm 2700K light, rim-lighting their hats and shoulders, while a hint of neon from the yard tints their faces from the right. Determined and ridiculous. Thick uneven dark-purple marker outlines, flat cel fills, faint paper grain, no text. Cinematic 16:9 widescreen framing.
```

Вариант 2 — атмосферный:
```
A cinematic comic-book panel in a grimy underground-comix sticker style, 16:9, an extreme low angle from the porch boards, wide lens distortion making the two friends tower over the camera. Vovan and Dimon from the attached character sheets stand shoulder to shoulder like an action-movie poster, backlit by the blazing doorway so their silhouettes are edged in hot gold, arms full of junk from the attached item sheets: chips bags, a battery, a poster tube, a crate of action figures, a grinder. Dust motes swirl in the light shaft between them. Their faces are lit from below by magenta and mint neon spilling from the yard, giving a heroic, slightly unhinged glow. Teal-and-orange grade, deep indigo sky. Thick uneven dark-purple marker outlines, flat cel fills, no text. Cinematic 16:9 widescreen framing.
```

Вариант 3 — фактурный:
```
A cinematic comic-book panel printed like a cheap 1990s risograph zine, 16:9, with misregistered warm yellow and fluorescent pink inks over muted purple, coarse halftone shading and visible paper fibers. A low-angle shot on the porch: Vovan and Dimon from the attached character sheets march out of the doorway carrying junk from the attached item sheets, chips bags, a battery, a rolled poster, a crate of action figures and a grinder, while the fat orange cat rides a stack of pizza boxes between them. The doorway behind them is one flat yellow ink block. Thick uneven dark-purple marker lines, flat inks with slight bleed, no text. Cinematic 16:9 widescreen framing.
```

Доработка:
```
Make Dimon carry the crate higher so it does not cover his face, keeping everything else identical.
```

### Остальные

**`cs_boss.png`** — выход кракена. Масштаб: огромный монстр из детского бассейна и крошечные друзья на переднем плане.

Приложи: `style_anchor`, `vovan`, `dimon`, `kraken`, `bg_yard_night`

Вариант 1 — точный:
```
A cinematic comic-book panel in a grimy underground-comix sticker style, 16:9. In the flooded backyard from the attached background, a cheap blue inflatable kiddie pool printed with cartoon ducks bulges and bursts at the seams as the giant purple kraken from the attached sheet rises out of it, water sheeting off its warty head, yellow slit eyes glaring, tentacles curling over the broken fence in the background. Water from the burst pool surges across the yard in the midground in a flat, scalloped wave. In the immediate foreground, tiny by comparison, Vovan and Dimon from the attached character sheets stand on the porch with jaws dropped, seen from behind and slightly to the side. Only the kraken carries the thin solid neon pink-and-cyan rim line; the yard stays muted, lit by the street lamp. Thick uneven dark-purple marker outlines, flat cel fills, no text. Cinematic 16:9 widescreen framing.
```

Вариант 2 — атмосферный:
```
A cinematic comic-book panel in a grimy underground-comix sticker style, 16:9, an extreme worm's-eye view from the waterline of the flooded yard. The giant kraken from the attached sheet erupts out of a bursting blue kiddie pool and fills the whole upper frame, its belly and tentacles lit from below by a violet glow coming from the pool water, while the cold street lamp rims its head from behind. Spray and droplets hang frozen in the air in the foreground. At the very bottom edge, small and half-submerged in shadow, Vovan and Dimon from the attached character sheets look up in horror, their faces catching violet light. Deep indigo and violet grade with one warm lamp highlight. Thick uneven dark-purple marker outlines, flat cel fills, no text. Cinematic 16:9 widescreen framing.
```

Вариант 3 — фактурный:
```
A cinematic comic-book panel printed like a cheap 1990s risograph zine, 16:9, with misregistered violet and teal inks over muted purple, coarse halftone dots and visible paper fibers. The giant kraken from the attached sheet rises from a bursting blue kiddie pool printed with ducks, its warty skin rendered in overlapping halftone layers, tentacles curling over the fence. Tiny Vovan and Dimon from the attached character sheets stand on the porch in the foreground with jaws dropped. Water is printed as flat scalloped teal shapes with slight ink bleed. Thick uneven dark-purple marker lines, flat inks, no text. Cinematic 16:9 widescreen framing.
```

Доработка:
```
Make the kraken bigger so its head reaches the top edge, keeping the friends and the composition identical.
```

**`cs_win.png`** — «отпустило». Утро, всё нормальное, ни капли неона: контраст с остальными кадрами — и есть пуанта.

Приложи: `style_anchor`, `vovan`, `dimon`, `bg_yard_night`

Вариант 1 — точный:
```
A cinematic comic-book panel in a grimy underground-comix sticker style, 16:9, set in early morning. The backyard from the attached background is completely normal and empty: trash, a tipped-over bucket and an intact garden gnome on the dewy grass, no monsters and no neon anywhere. In the foreground Vovan and Dimon from the attached character sheets sit exhausted on the porch steps wrapped together in one checked blanket, hats on, Dimon's glasses askew, both sipping tea from chipped mugs; the fat orange cat sleeps on Dimon's lap. In the background an ordinary, alive, slightly annoyed neighbour in a white tank top waves from behind the fence. Soft pink-and-gold 4000K sunrise light rakes in from the right, long gentle shadows, dew sparkling on the grass. Thick uneven dark-purple marker outlines, flat cel fills, faint paper grain, no text. Cinematic 16:9 widescreen framing.
```

Вариант 2 — атмосферный:
```
A cinematic comic-book panel in a grimy underground-comix sticker style, 16:9, a quiet wide shot from the far end of the yard looking back at the house at sunrise. The sun rises directly behind the roof, flooding the scene with hazy gold backlight and visible morning mist over the wet grass. Small on the porch steps in the midground, Vovan and Dimon from the attached character sheets sit wrapped in a blanket, silhouettes softened by the glare, steam curling from their mugs; the cat is a small orange curl beside them. In the immediate foreground lie the night's leftovers, a crushed chips bag and a lone action figure face-down in the dew. No neon anywhere, only gold, rose and pale blue. Thick uneven dark-purple marker outlines, flat cel fills, no text. Cinematic 16:9 widescreen framing.
```

Вариант 3 — фактурный:
```
A cinematic comic-book panel printed like a cheap 1990s risograph zine, 16:9, with two soft inks, rose and gold, misregistered over warm cream paper, fine halftone shading and visible paper fibers. Vovan and Dimon from the attached character sheets sit on the porch steps wrapped in one blanket, sipping tea, the fat orange cat asleep on Dimon's lap. The yard is calm and empty, a normal neighbour waves from behind the fence. No neon, no fluorescent inks. Thick uneven dark-purple marker lines, flat inks with slight bleed, no text. Cinematic 16:9 widescreen framing.
```

Доработка:
```
Make the sunrise warmer and add more steam from the mugs, keeping both characters and the composition identical.
```

**`cs_lose.png`** — «вас накрыло». Глюки захватили хату и смотрят телек, друзья лежат на ковре со спиралями в глазах.

Приложи: `style_anchor`, `vovan`, `dimon`, `vovan_faces`, `dimon_faces`, `bg_livingroom`, `zombie`, `alien`, `pirate`

Вариант 1 — точный:
```
A cinematic comic-book panel in a grimy underground-comix sticker style, 16:9. The living room from the attached background is overrun: on the sagging sofa in the midground the zombie neighbour, the grey alien and the pirate from the attached sheets lounge watching TV, eating the friends' instant noodles and chips, the pirate's boots up on the table. In the immediate foreground Vovan and Dimon from the attached character sheets lie flat on their backs on the carpet staring at the ceiling, faces matching the dizzy spiral-eyed expressions on the attached face sheets, the cat sitting on Vovan's chest unimpressed. The walls in the background melt and drip, glowing hot pink, mint and cyan; the neon spill tints everything, including the friends' clothes. Thick uneven dark-purple marker outlines, flat cel fills, faint paper grain, no text. Cinematic 16:9 widescreen framing.
```

Вариант 2 — атмосферный:
```
A cinematic comic-book panel in a grimy underground-comix sticker style, 16:9, a top-down shot looking straight down from the ceiling. Vovan and Dimon from the attached character sheets lie spread-eagled on the carpet in the center, spiral eyes from the attached face sheets, the cat asleep on Vovan's chest. Around them the room's edges melt inward in concentric drips of hot pink, mint and cyan, and from the top edge the legs and snack-filled hands of the zombie, alien and pirate from the attached sheets dangle off the sofa. The only light is the flickering TV, painting the scene in pulsing neon spill. Disorienting, claustrophobic, saturated grade. Thick uneven dark-purple marker outlines, flat cel fills, no text. Cinematic 16:9 widescreen framing.
```

Вариант 3 — фактурный:
```
A cinematic comic-book panel printed like a cheap 1990s risograph zine, 16:9, with fluorescent pink and teal inks overprinted heavily over muted purple until the colors mix, coarse halftone and visible paper fibers. The zombie, alien and pirate from the attached sheets lounge on the sofa eating noodles and watching TV, while Vovan and Dimon from the attached character sheets lie on the carpet in the foreground with spiral eyes. The walls drip as overprinted ink runs. Thick uneven dark-purple marker lines, flat inks with heavy bleed, no text. Cinematic 16:9 widescreen framing.
```

Доработка:
```
Make the friends' spiral eyes bigger and more visible, keeping everything else identical.
```

**`cs_endless.png`** — заставка бесконечного режима. Двор распался в чистую психоделию, друзья спина к спине в центре.

Приложи: `style_anchor`, `vovan`, `dimon`, `items_base_1`, `items_base_2`

Вариант 1 — точный:
```
A cinematic comic-book panel in a grimy underground-comix sticker style, 16:9. The backyard has dissolved into pure psychedelia: the ground is a checkerboard of dusty purple tiles bending away into a spiral tunnel that recedes into the deep background, fence planks float apart in the midground, and endless rows of glowing hallucinations march out of a giant heavy-lidded eye in the sky. In the exact center of the foreground, small and determined, Vovan and Dimon from the attached character sheets stand back to back on a single real patch of trampled dirt, holding a grinder and a pink fluffy slipper, junk from the attached item sheets orbiting around them. Hot pink, mint and cyan dominate everything except the two friends, who stay in muted real-world colors lit by a warm 2700K glow from below. Thick uneven dark-purple marker outlines, flat cel fills, no text. Cinematic 16:9 widescreen framing.
```

Вариант 2 — атмосферный:
```
A cinematic comic-book panel in a grimy underground-comix sticker style, 16:9, a dizzying overhead spiral composition: the camera looks down a vortex of checkerboard floor tiles that twists toward a giant eye at the center of the frame. On a small solid island of dirt in the lower third, Vovan and Dimon from the attached character sheets stand back to back, foreshortened, weapons raised, a halo of floating junk from the attached item sheets circling them. Hallucinations pour out of the eye along the spiral arms. Strong radial motion, saturated neon grade, one warm light source on the friends. Thick uneven dark-purple marker outlines, flat cel fills, no text. Cinematic 16:9 widescreen framing.
```

Вариант 3 — фактурный:
```
A cinematic comic-book panel printed like a cheap 1990s risograph zine, 16:9, with four fluorescent inks overprinted in misregistered layers, coarse halftone and visible paper fibers. A checkerboard floor bends into a spiral tunnel toward a giant eye; hallucinations march out of it. In the center Vovan and Dimon from the attached character sheets stand back to back holding a grinder and a pink slipper, junk from the attached item sheets floating around them, printed in one warm ink pass. Thick uneven dark-purple marker lines, flat inks with bleed, no text. Cinematic 16:9 widescreen framing.
```

Доработка:
```
Make the spiral tunnel deeper and the friends slightly bigger, keeping the composition identical.
```

## 8. Интерфейс

**`logo.png`** — логотип. Кириллица только в кавычках, шрифт и способ нанесения заданы явно — так Nano Banana Pro рендерит текст точнее всего. Проверь каждую букву; если не выйдет, логотип останется шрифтом в игре.

Приложи: `style_anchor`

Вариант 1 — точный:
```
A game logo lettering piece in a grimy underground-comix sticker style, 16:9, centered on one perfectly flat pure chroma green #00FF00 background reaching all four edges. Two stacked lines of chunky hand-painted letters: the top line reads exactly "ГЛЮКИ" in huge heavy rounded brush capitals, hot pink #FF5AD1, with thick paint drips running off the bottom of every letter; the bottom line, smaller and slightly offset to the right, reads exactly "vs КОРЕША" in mint green #7DFFB0 drippy capitals with a lowercase "vs". Both lines carry thick uneven dark-purple #1B1030 marker outlines and a single hard cel-shading step on the lower half of each letter, plus faint paper grain inside the fills. The letters wobble slightly as if painted by hand on a wall. No other words, no symbols, no characters, no shadows on the background. 16:9, 4K.
```

Вариант 2 — атмосферный:
```
A game logo lettering piece in a grimy underground-comix sticker style, 16:9, centered on one perfectly flat pure chroma green #00FF00 background reaching all four edges. The words are built as bent glass neon tubes mounted on a dark-purple backing board cut to the letter shapes: the top line reads exactly "ГЛЮКИ" in thick hot pink tubes, the bottom line reads exactly "vs КОРЕША" in thinner mint-green tubes. The glow is drawn as flat solid halo shapes hugging each tube, not soft blur, so the logo can be cut out cleanly; small mounting clips and a flickering half-dead tube in the letter "Ю" add wear. Thick uneven dark-purple marker outlines, one hard cel step, faint paper grain. No other words, no symbols, no shadows on the background. 16:9, 4K.
```

Вариант 3 — фактурный:
```
A game logo lettering piece styled as a peeling vinyl bumper sticker, 16:9, centered on one perfectly flat pure chroma green #00FF00 background reaching all four edges. The sticker is an irregular die-cut shape with a dark-purple border; the top line reads exactly "ГЛЮКИ" in fat hot pink drippy capitals, the bottom line reads exactly "vs КОРЕША" in mint green, both printed with slight misregistration and a coarse halftone in the shadows. One corner of the sticker curls up, showing the pale paper backing, and fine scratches cross the vinyl surface. Thick uneven dark-purple marker outlines, flat inks. No other words, no symbols, no shadows on the background. 16:9, 4K.
```

Доработка:
```
Fix the letter shapes so the text reads exactly "ГЛЮКИ" and "vs КОРЕША", keeping the style, colors and layout identical.
```

**`ui.png`** — набор интерфейса. Всё из хлама квартиры: картон, скотч, маркер — пустые элементы без текста, текст наложу в игре.

Приложи: `style_anchor`, `items_base_1`

```
A flat 2D game UI kit sprite sheet in a grimy underground-comix sticker style, 16:9, every element separate with wide empty gaps so nothing touches and all of them blank with no text. Across the top third: a wide horizontal top-bar panel made of torn brown cardboard held together with silver duct tape, its edges slightly frayed. In the middle third, left to right: an empty item-slot tile cut from a cardboard box flap with a soft grease stain, the same tile in a highlighted selected state with a hand-drawn yellow marker outline, a large rounded hot-pink #FF5AD1 button and a smaller dark-purple button both blank, a round pause button and a round sound button with simple flat icons. In the bottom third: an empty progress-bar frame of taped cardboard, a separate pink fill strip, a small skull-flag wave marker, a blank speech bubble, a blank wooden sign board, and a small gold star badge. Flat even lighting, no cast shadows, thick uneven dark-purple #1B1030 marker outlines, faint paper grain, no white sticker border. The background is one perfectly flat pure chroma green #00FF00 reaching all four edges. 16:9 sheet, 4K.
```

Доработка:
```
Make the selected tile's yellow outline thicker and remove any text that appeared, keeping all other elements identical.
```

**`icon.png`** — иконка игры. Читается в 48 пикселях: два лица нос к носу, крупно, без мелочей.

Приложи: `style_anchor`, `zombie`, `items_base_2`

Вариант 1 — точный:
```
A square app icon in a grimy underground-comix sticker style, 1:1, full bleed. An extreme close-up of two faces nose to nose: on the right, the dopey green zombie neighbour from the attached sheet with mismatched eyes and missing teeth, a thin solid neon pink-and-cyan rim line around his head; on the left, the fat grumpy orange tabby cat glaring back with half-closed eyes and flattened ears. The faces fill the frame edge to edge, overlapping slightly where the noses touch in the center. The background behind them is a flat swirl of hot pink and deep purple bands. Bold silhouettes, few details, so the icon reads at a tiny size. Thick uneven dark-purple #1B1030 marker outlines, flat fills with one hard cel step, no text. Square 1:1 composition.
```

Вариант 2 — атмосферный:
```
A square app icon in a grimy underground-comix sticker style, 1:1, full bleed, framed as a low-angle close-up. The zombie neighbour's green face from the attached sheet looms from the upper right, lit from below by a hot pink neon glow, jaw hanging open, while a bag of paprika chips from the attached item sheet sits in the lower left foreground, torn open, a glowing lightbulb popping out of it and throwing warm yellow light up into the zombie's face. Deep indigo background with a single cyan rim light. High contrast, bold shapes, readable at a tiny size. Thick uneven dark-purple marker outlines, flat cel fills, no text. Square 1:1 composition.
```

Вариант 3 — фактурный:
```
A square app icon styled as a round vinyl sticker on a laptop lid, 1:1, full bleed with the laptop surface as a flat dark-grey border. On the sticker, the green zombie neighbour's face from the attached sheet and the fat grumpy orange cat press nose to nose over a pink-and-purple swirl, printed with slight misregistration and coarse halftone shadows. Fine scratches cross the vinyl, one edge lifts a little. Bold shapes readable at a tiny size. Thick uneven dark-purple marker outlines, flat inks, no text. Square 1:1 composition.
```

Доработка:
```
Simplify the background to a flat two-tone swirl and make both faces bigger, keeping the characters identical.
```

## 9. Чек-лист файлов

| Очередь | Файлы |
|---|---|
| 1. Пилот: развёртка Вована | `vovan_turn`, `vovan_rig`, `vovan_emote` |
| 2. Предметы | `items_base_1`, `items_base_2`, `items_t2_1`, `items_t2_2`, `items_t2_3`, `items_t3_1`, `items_t3_2`, `items_t3_3`, `items_t3_4`, `fx_items_1`, `fx_items_2` |
| 3. Новые глюки (после пилота) | `mod_turn`, `mod_rig`, `mod_emote`, `courier_turn`, `courier_rig`, `courier_emote`, `raider_turn`, `raider_rig`, `raider_emote`, `torrent_turn`, `torrent_rig`, `torrent_emote`, `streamer_turn`, `streamer_rig`, `streamer_emote`, `sysadmin_turn`, `sysadmin_rig`, `sysadmin_emote`, `collector_turn`, `collector_rig`, `collector_emote`, `dm_turn`, `dm_rig`, `dm_emote`, `reptiloid_turn`, `reptiloid_rig`, `reptiloid_emote`, `dictator_turn`, `dictator_rig`, `dictator_emote`, `neighbor_turn`, `neighbor_rig`, `neighbor_emote`, `tamagotchi` |
| 4. Катсцены | `cs_intro_02`, `cs_intro_03`, `cs_intro_04`, `cs_intro_05`, `cs_intro_06`, `cs_boss`, `cs_win`, `cs_lose`, `cs_endless` |
| 5. Полировка | `bg_yard_fog`, `bg_yard_rain`, `bg_yard_trip`, `bg_yard_kraken`, `fg_props`, `logo`, `ui`, `icon` |
| 6. Уже готово | `style_anchor`, `vovan`, `vovan_faces`, `dimon`, `dimon_faces`, `bg_yard_night`, `bg_livingroom`, `cs_intro_01` |

Что проверить перед тем, как отдавать лист:

- части не касаются друг друга и не обрезаны краем;
- фон ровный, одного цвета, без теней и текста;
- лицо и одежда на частях совпадают с собранным персонажем слева;
- конечности висят прямо вниз, а не согнуты;
- у глюков ореол тонкой линией, а не размытым свечением на фоне;
- на листе тела все 12 деталей: голова, шея, грудь, таз, плечо, предплечье, три кисти, бедро, голень, стопа;
- нет белой обводки вокруг деталей и белой полосы по краю листа;
- таз без штанин, рукав и штанина разрезаны по суставу;
- детали того же размера, что и на собранной фигуре слева;
- у корешей шапка на голове, волос не видно; у глюков шляпы, бороды и волосы — часть головы, отдельно только пачка, роба, плащ и деревянная нога.
