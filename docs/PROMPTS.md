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

## 3. Кореша (смотрят вправо)

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

## 4. Глюки (смотрят влево)

Та же схема, что у корешей: лист тела + лист эмоций. Шаблоны для глюков зеркальные — с хвостом `_left`, собранная фигура справа. Неоновый ореол рисуется тонкой сплошной линией по контуру, а не размытым свечением: свечение добавлю в игре, иначе оно не вырезается из фона.

Шапки, бороды, волосы, нимбы и воротники — часть головы или груди, отдельно не болтаются. Отдельной деталью идёт только то, что закрывает суставы: пачка, роба, плащ, деревянная нога.

### Блок FOE_FACES (эмоции глюков)

```
FOE_FACES: An expression sheet for head swapping in 2D cut-out animation, 16:9, 4K. Follow the attached grey layout template: eight heads in a 4 by 2 grid with wide empty gaps. Draw eight copies of the EXACT head from the attached puppet sheet of this character: identical size, identical outline, identical 3/4 angle turned toward the LEFT, identical hat, hair, beard and other headwear. Only the face changes: eyes, eyebrows, mouth, small drops and lines. Each head ends at the jaw, no neck, no body.
Top row: (1) neutral; (2) blink, eyes fully closed; (3) biting, mouth wide open showing teeth; (4) chewing with a full mouth.
Bottom row: (5) hurt, wincing with one eye shut; (6) furious; (7) stunned, spiral eyes and tongue out; (8) fading away, eyes rolled up, mouth hanging open.
Hallucination look: a thin solid neon pink-and-cyan rim line just inside the dark outline, no soft glow. Each head has only the dark purple ink outline, no white sticker border. Background: one perfectly flat solid {BG} reaching all four edges of the image, no white margin or strip at any edge, no shadows, no text, no labels, no numbers. Do not copy the grey colour of the template.
```

**`zombie.png`** — базовый враг, лист тела. Фон маджента (кожа зелёная).

Приложи: `style_anchor`, `tpl_body_magenta_left`

```
[STYLE]
[PUPPET with {BG} = pure magenta #FF00FF, {DIR} = LEFT]
Character: ZOMBIE NEIGHBOUR, a hallucination. A middle-aged pot-bellied neighbour turned zombie: sickly green skin with darker blotches, almost bald with three long hairs, one eye bigger than the other, missing teeth, dopey hungry face. Dirty white sleeveless tank top stretched over the belly on the chest piece, bare green arms, blue tracksuit pants with white side stripes split at the knee, worn brown house slippers as feet. Hallucination look: acid neon accents and a thin solid neon pink-and-cyan rim line just inside the dark outline of every piece, no soft glow.
Props: a dented cooking-pot lid.
```

**`zombie_faces.png`** — эмоции зомби.

Приложи: `zombie`, `tpl_faces_magenta_left`

```
[STYLE]
[FOE_FACES with {BG} = pure magenta #FF00FF]
Character: ZOMBIE NEIGHBOUR from the attached puppet sheet: green bald head with three long hairs, mismatched eyes, missing teeth. Default mood: dopey and hungry.
```

**`zombie_tough.png`** — усиленный зомби для поздних ночей. Фон маджента.

Приложи: `style_anchor`, `zombie`, `tpl_body_magenta_left`

```
[STYLE]
[PUPPET with {BG} = pure magenta #FF00FF, {DIR} = LEFT]
Character: ZOMBIE GYM BRO, a hallucination from the same world as the attached zombie neighbour, drawn at the same scale but a head taller. Huge muscular chest and upper arms, thin legs, a tiny head with a green buzz cut and tiny angry eyes. Green skin, torn neon-yellow gym tank top, black shorts split at the knee, a flip-flop on each foot. An old car tyre is worn around the chest like armour and is drawn as part of the chest piece. Hallucination look: acid neon accents and a thin solid neon pink-and-cyan rim line just inside the dark outline of every piece, no soft glow.
Props: a heavy dumbbell.
```

**`zombie_tough_faces.png`** — эмоции качка.

Приложи: `zombie_tough`, `tpl_faces_magenta_left`

```
[STYLE]
[FOE_FACES with {BG} = pure magenta #FF00FF]
Character: ZOMBIE GYM BRO from the attached puppet sheet: tiny green head with a buzz cut and tiny angry eyes. Default mood: aggressive and dumb.
```

**`ballerina.png`** — «Гитлер в пачке». Фон зелёный (костюм розовый).

Приложи: `style_anchor`, `tpl_body_green_left`

```
[STYLE]
[PUPPET with {BG} = pure chroma green #00FF00, {DIR} = LEFT]
Character: a hallucination, a satirical caricature of a furious 1940s dictator dressed as a ballerina. Small angry man with a black side-parted fringe glued flat to the head and a small rectangular toothbrush moustache. Pink ballet leotard on the chest piece, bare arms. The fluffy layered pink tutu is drawn as part of the pelvis piece, sticking out sideways. White tights split at the knee, pink pointe shoes with ribbons as feet, standing on tiptoe. No military uniform, no symbols, no armbands, no insignia of any kind. Ridiculous and humiliating, pure mockery. Hallucination look: acid neon accents and a thin solid neon pink-and-cyan rim line just inside the dark outline of every piece, no soft glow.
Props: none, leave the props area empty.
```

**`ballerina_faces.png`** — эмоции балерины.

Приложи: `ballerina`, `tpl_faces_green_left`

```
[STYLE]
[FOE_FACES with {BG} = pure chroma green #00FF00]
Character: the dictator ballerina from the attached puppet sheet: black side-parted fringe, small rectangular moustache. Default mood: furious and offended. No symbols of any kind.
```

**`alien.png`** — пришелец. Фон маджента.

Приложи: `style_anchor`, `tpl_body_magenta_left`

```
[STYLE]
[PUPPET with {BG} = pure magenta #FF00FF, {DIR} = LEFT]
Character: GREY ALIEN, a hallucination. A skinny little grey-green alien a head shorter than a man, with an oversized bulb head, huge glossy black almond eyes, a tiny mouth and one antenna on top ending in a pink ball; the antenna is part of the head. Very thin neck, narrow chest, noodle-thin arms and legs, hands with three long fingers. Wears only white socks with sandals; the feet are the socks and sandals. Hallucination look: acid neon accents and a thin solid neon pink-and-cyan rim line just inside the dark outline of every piece, no soft glow.
Props: a tiny toy ray gun, sized to fit the gripping hand.
```

**`alien_faces.png`** — эмоции пришельца.

Приложи: `alien`, `tpl_faces_magenta_left`

```
[STYLE]
[FOE_FACES with {BG} = pure magenta #FF00FF]
Character: GREY ALIEN from the attached puppet sheet: bulb head, huge black almond eyes, tiny mouth, antenna with a pink ball. The eyes stay big and black; emotions show through eyelids, brows and the mouth. Default mood: curious and blank.
```

**`pirate.png`** — свой пьяный пират. Фон зелёный.

Приложи: `style_anchor`, `tpl_body_green_left`

```
[STYLE]
[PUPPET with {BG} = pure chroma green #00FF00, {DIR} = LEFT]
Character: DRUNK PIRATE CAPTAIN, an original character and a hallucination. Barrel-chested, with a huge bushy orange beard, a black eyepatch and a red nose; the dark tricorn hat with a white skull badge and the beard are part of the head piece. Red-and-white striped shirt with a wide leather belt on the chest piece, dark purple breeches split at the knee, buckled boots as feet. Must not resemble any existing film character: no dreadlocks, no bandana, no beads, no eyeliner. Hallucination look: acid neon accents and a thin solid neon pink-and-cyan rim line just inside the dark outline of every piece, no soft glow.
Props: a green glass bottle sized to fit the gripping hand; a wooden peg leg drawn as one straight vertical piece the length of shin plus foot.
```

**`pirate_faces.png`** — эмоции пирата.

Приложи: `pirate`, `tpl_faces_green_left`

```
[STYLE]
[FOE_FACES with {BG} = pure chroma green #00FF00]
Character: DRUNK PIRATE CAPTAIN from the attached puppet sheet: tricorn hat with a skull badge, bushy orange beard, eyepatch, red nose. The eyepatch stays on in every face. Default mood: drunk, cross-eyed grin.
```

**`jesus.png`** — Иисус. Фон зелёный.

Приложи: `style_anchor`, `tpl_body_green_left`

```
[STYLE]
[PUPPET with {BG} = pure chroma green #00FF00, {DIR} = LEFT]
Character: a friendly cartoon JESUS as a hallucination, good-natured and funny, not mocking. Calm blissful smile, short beard; the shoulder-length brown hair and a golden ring halo floating above it are part of the head piece. Cream-white robe top with a red sash over one shoulder on the chest piece, wide robe sleeves split at the elbow. Under the robe the legs are drawn plain: cream trouser legs split at the knee, leather sandals as feet. Hallucination look: acid neon accents and a thin solid neon pink-and-cyan rim line just inside the dark outline of every piece, no soft glow.
Props: the lower robe drawn as one separate bell-shaped skirt piece from the waist to the ankles, open at the bottom.
```

**`jesus_faces.png`** — эмоции Иисуса.

Приложи: `jesus`, `tpl_faces_green_left`

```
[STYLE]
[FOE_FACES with {BG} = pure chroma green #00FF00]
Character: JESUS from the attached puppet sheet: shoulder-length brown hair, short beard, golden halo above the head, all identical in every face. Replace (6) furious with mildly disappointed. Default mood: calm and blissful.
```

**`dracula.png`** — Дракула. Фон зелёный.

Приложи: `style_anchor`, `tpl_body_green_left`

```
[STYLE]
[PUPPET with {BG} = pure chroma green #00FF00, {DIR} = LEFT]
Character: COUNT DRACULA in the classic public-domain look, a hallucination. Pale blue-grey skin, slicked black hair with a sharp widow's peak as part of the head, red eyes, two long fangs, smug aristocratic sneer. Black tailcoat with a white shirt and red bow tie on the chest piece, the high stiff cape collar is part of the chest piece. Black trousers split at the knee, shiny black shoes. Hallucination look: acid neon accents and a thin solid neon pink-and-cyan rim line just inside the dark outline of every piece, no soft glow.
Props: the cape drawn as one separate flat piece seen from behind the body, from the shoulders down to the knees, black outside with crimson lining showing at the edge; a small cartoon bat with spread wings.
```

**`dracula_faces.png`** — эмоции Дракулы.

Приложи: `dracula`, `tpl_faces_green_left`

```
[STYLE]
[FOE_FACES with {BG} = pure chroma green #00FF00]
Character: COUNT DRACULA from the attached puppet sheet: pale blue-grey face, slicked black hair with a widow's peak, red eyes, fangs. Default mood: smug sneer.
```

**`kolobok.png`** (1:1) — колобок, не гуманоид. Фон маджента.

Приложи: `style_anchor`

```
[STYLE]
A sprite sheet, 1:1, 4K, of a KOLOBOK hallucination: a round golden-brown bread bun creature from a folk tale, angry and feral, with a crusty baked texture drawn as flat shapes, red eyes, thick angry eyebrows and a wide mouth full of sharp teeth. No arms, no legs, a perfect ball, the face turned slightly to the LEFT. All balls exactly the same size. Six versions in a 3 by 2 grid with wide gaps: top row: neutral angry; mouth wide open biting; hurt with a crack. Bottom row: blink; stunned with spiral eyes; the back side, a plain crusty ball with no face, for the rolling animation. Hallucination look: acid neon accents and a thin solid neon pink-and-cyan rim line just inside the dark outline, no soft glow. Only the dark purple ink outline, no white sticker border. Background: one perfectly flat solid pure magenta #FF00FF reaching all four edges of the image, no white margin or strip at any edge, no shadows, no text, no labels.
```

**`kraken.png`** (16:9) — босс, лист тела. Фон зелёный.

Приложи: `style_anchor`

```
[STYLE]
A boss puppet sheet for 2D cut-out animation, 16:9, 4K. A giant purple KRAKEN hallucination crawling out of a cheap inflatable kiddie pool, turned toward the LEFT. On the RIGHT quarter: the assembled monster. On the LEFT three quarters, as separate pieces at exactly the same scale with wide gaps, nothing touching: (1) the huge bulbous head-body with warty spots, angry yellow slit-pupil eyes, heavy brows and a closed beak, ending at the bottom in a rounded base where the tentacles attach; (2) three tentacle segments of decreasing thickness, each drawn straight and vertical with fully rounded ends and pink suckers along one side, so they can be chained into a bending tentacle; (3) a tentacle tip curled into a hook; (4) a blue inflatable kiddie pool with cartoon ducks printed on it, seen from the side, with water splashing over the rim. Hallucination look: acid neon accents and a thin solid neon pink-and-cyan rim line just inside the dark outline of every piece, no soft glow. Only the dark purple ink outline, no white sticker border. Background: one perfectly flat solid pure chroma green #00FF00 reaching all four edges of the image, no white margin or strip at any edge, no shadows, no floor, no text, no labels.
```

**`kraken_faces.png`** — эмоции кракена.

Приложи: `kraken`, `tpl_faces_green_left`

```
[STYLE]
[FOE_FACES with {BG} = pure chroma green #00FF00]
Character: the KRAKEN from the attached puppet sheet. Instead of a head, draw eight copies of the whole bulbous head-body piece, identical size and outline; only the eyes, brows and beak change. Default mood: menacing.
```

### Запас на потом (свои типажи, тот же шаблон)

Лист тела собирается из `[STYLE] + [PUPPET] + Character: ...` с фоном и шаблоном, указанными ниже. Эмоции к ним — по образцу любого глюка выше.

- **`unicorn.png`** — `GOPNIK UNICORN, facing LEFT: a bipedal white unicorn squatting-type street tough in a black tracksuit with three stripes and a flat cap, rainbow mane, gold tooth, sunflower seeds in one hoof.` Фон зелёный.
- **`knight.png`** — `CARDBOARD KNIGHT, facing LEFT: a kid-sized knight in armour made of taped cardboard boxes, a colander helmet, a pot-lid shield and a mop for a lance.` Фон зелёный.
- **`hamster.png`** — `GIANT HAMSTER, facing LEFT: a human-sized fat orange-and-white hamster walking upright with stuffed cheeks and tiny furious eyes.` Фон зелёный.
- **`grandma.png`** — `GHOST GRANDMA, facing LEFT: a translucent floating granny in a headscarf and floral dress with a rolling pin; instead of thigh, shin and foot draw one ghostly wisp tail piece in the leg row.` Фон маджента.

## 5. Оборона

Одиночные предметы, 1:1, по несколько состояний на листе. Предметы — реальный мир, значит приглушённые цвета и без неонового ореола. Все в три четверти и смотрят вправо, на глюков. Все состояния одного предмета — одного размера и в одной позе, чтобы я подменял их на месте.

Приложи к каждому: `style_anchor`.

Общий хвост для этого раздела (вставлять в конец):

```
4K. Every state is the same object at exactly the same size, angle and position in its cell, only the listed details change. Each state is a separate sprite with wide empty gaps between them, nothing touching. Real-world muted palette, no neon glow. Only the dark purple ink outline, no white sticker border. Background: one perfectly flat solid pure magenta #FF00FF reaching all four edges of the image, no white margin or strip at any edge, no shadows on the background, no floor, no text, no labels, no numbers.
```

**`kettle.png`**

```
[STYLE]
Sprite sheet, 1:1, of the old blue enamel stovetop KETTLE from the attached style reference, with chipped enamel, a black arched handle and a cute sleepy face, 3/4 view facing RIGHT. Three states in a row: idle; puffed up and whistling with cheeks blown; lid popping off. Plus a separate small steam puff cloud.
[хвост]
```

**`cat.png`**

```
[STYLE]
Sprite sheet, 1:1, of the fat grumpy orange tabby CAT from the attached style reference, sitting upright, 3/4 view facing RIGHT. Four states in a 2x2 grid: idle with half-closed eyes; cheeks puffed, about to spit; mouth wide open spitting; annoyed with ears flat. Plus as separate parts: the tail on its own, and a brown hairball projectile.
[хвост]
```

**`fridge.png`**

```
[STYLE]
Sprite sheet, 1:1, of an old white Soviet-style FRIDGE with a chrome handle, a few colourful magnets and a stern frowning face on the door, facing RIGHT. Three damage states in a row: intact; dented with cracks and a bite mark; badly wrecked, door hanging, leaking a puddle.
[хвост]
```

**`doshik.png`**

```
[STYLE]
Sprite sheet, 1:1, of a CUP OF INSTANT NOODLES in a white-and-red plastic cup with no readable brand name. Three states in a row: lid closed, cold; lid half open with a little steam; fully open, overflowing with yellow curly noodles and steaming. Plus a separate burst of flying noodles for the explosion.
[хвост]
```

**`fan.png`**

```
[STYLE]
Sprite sheet, 1:1, of an old pedestal FAN, facing RIGHT. As separate parts: the stand with motor housing and round wire cage; the three-blade pale blue propeller seen exactly front-on, perfectly symmetrical so it can be rotated; a motion-blurred disc version of the spinning propeller; an icy snowflake projectile; a small cold wind streak.
[хвост]
```

**`microwave.png`**

```
[STYLE]
Sprite sheet, 1:1, of a beige 1990s MICROWAVE OVEN with a dial and a worried face in the door window, facing RIGHT. Three states in a row: idle and dark; humming with an orange glow inside and a fork sparking; critical, glowing red-hot, bulging, about to explode.
[хвост]
```

**`tv.png`**

```
[STYLE]
Sprite sheet, 1:1, of a chunky wooden-cased CRT TV with rabbit-ear antennas and two knobs, facing RIGHT. Three states in a row: screen showing grey static with a simple green pixel face; screen flashing bright yellow-white; screen cracked and dark. Plus a separate jagged yellow static lightning bolt projectile.
[хвост]
```

**`roomba.png`**

```
[STYLE]
Sprite sheet, 1:1, of a round white ROBOT VACUUM CLEANER seen from a low 3/4 side angle, facing RIGHT. Two states: idle with a green light; berserk with a red light, kitchen knife taped on top and speed lines behind it.
[хвост]
```

**`fx.png`** (16:9) — эффекты и мелочь.

```
[STYLE]
Sprite sheet, 16:9, of small game effects in a grid with wide gaps, nothing touching: a glowing yellow lightbulb (the game currency) in three brightness steps; the pink fluffy house slipper from the attached style reference; four frames of a cartoon explosion from small to large; four frames of a rainbow smoke puff dissolving; three dizzy stars; a "sleepy Z"; a splash of water; a broom; a cracked-ground dust cloud; a speech bubble, empty. Only the dark purple ink outline, no white sticker border. Background: one perfectly flat solid pure chroma green #00FF00 reaching all four edges of the image, no white margin or strip at any edge, no shadows on the background, no text, no labels, no numbers.
```

## 6. Окружение

Фоны без персонажей и без предметов на игровом поле. Камера как в настольной игре: вид сбоку-сверху, поле плоское. Игровое поле занимает правые 80% кадра и нижние 80% высоты — там 5 рядов по 9 клеток, сетку наложу сам.

**`bg_yard_night.png`** (16:9, 4K) — основной фон.

Приложи: `style_anchor`

```
[STYLE]
Game background, 16:9, no characters. The same shabby backyard as in the attached style reference, at night, seen from a high 3/4 top-down side angle like a board game. LEFT 20% of the frame: the back wall of the same weathered wooden house with the open back door spilling warm yellow light and the wooden porch with steps, empty, no characters. RIGHT 80% of the frame, lower 80% of the height: one large flat rectangular yard of trampled dirt and patchy dry grass with a few cracked concrete paving slabs, completely EMPTY and evenly lit so game pieces can be placed on it, no objects, no furniture, no holes, no strong shadows crossing it. TOP 20% strip above the yard: a sagging wooden fence, a clothesline with laundry, a rusty garage wall, dark trees, one yellow street lamp. FAR RIGHT edge: the fence is broken and a swirling psychedelic neon fog in pink, cyan and acid green leaks in. Muted dusty purple night palette with warm lamp yellow; neon only in the fog on the right. No text.
```

Варианты ночей делай **редактированием** основного фона (приложи `bg_yard_night.png` и попроси изменить), чтобы планировка совпала пиксель в пиксель:

- **`bg_yard_fog.png`** — `Edit the attached image, keep the exact same layout and camera: add thick low green-tinted fog over the right half of the yard and around the fence, dim the street lamp.`
- **`bg_yard_rain.png`** — `Edit the attached image, keep the exact same layout and camera: heavy rain, puddles reflecting the yellow lamp, wet shiny mud, laundry soaked.`
- **`bg_yard_trip.png`** — `Edit the attached image, keep the exact same layout and camera: the sky and the fence melt into swirling psychedelic patterns, the yard ground gets faint rainbow ripples, a giant eye opens in the moon.`
- **`bg_yard_kraken.png`** — `Edit the attached image, keep the exact same layout and camera: the yard is flooded ankle-deep with dark water, a blue inflatable kiddie pool at the far right edge overflows and glows purple from inside, tentacle shadows on the fence.`

**`bg_livingroom.png`** (16:9) — для меню и катсцен.

Приложи: `style_anchor`

```
[STYLE]
Game background, 16:9, no characters. A messy bachelor LIVING ROOM at night seen straight-on like a theatre stage. An old brown sofa in the centre facing the viewer, a low table with pizza boxes, instant-noodle cups and mugs, a carpet hanging on the wall, a floor lamp, a window on the right showing a dark backyard, a door to the yard on the far right. The only light is the flickering blue-white glow of a TV that sits off-frame in front of the sofa. Muted dusty purple palette. No text.
```

**`fg_props.png`** (16:9) — передний план для параллакса.

```
[STYLE]
Sprite sheet, 16:9, of backyard foreground props as separate non-touching objects with wide gaps: a rusty barbecue grill, a stack of old car tyres, a tipped-over garden gnome, a dented metal bucket, a broken wooden fence section, a tuft of dry weeds, a garden hose coil, a plastic chair, a street lamp post with a yellow lamp. Real-world muted palette. Only the dark purple ink outline, no white sticker border. Background: one perfectly flat solid pure magenta #FF00FF reaching all four edges of the image, no white margin or strip at any edge, no shadows on the background, no text, no labels.
```

## 7. Катсцены

Статичные кадры 16:9 без текста и без облачков — подписи, панорамы, тряску, вспышки и звук добавлю сам. Ко всем прикладывай якорь стиля и готовые листы Вована и Димона, чтобы лица совпадали. Белая обводка-стикер на персонажах здесь уместна — это стиль обложки.

Общий хвост:

```
Cinematic comic panel, 16:9. Keep both friends exactly as in the attached character references: Vovan in the red beanie and green hoodie, Dimon in the olive bucket hat, round glasses and purple smiley t-shirt, no hair showing under the hats. Same drawing style as the attached style reference. No text, no speech bubbles, no captions, no panel borders.
```

### Интро

**`cs_intro_01.png`** — сидят у телека.

```
[STYLE]
Interior night. Vovan and Dimon slumped on an old brown sofa, seen from the front, faces lit by flickering blue TV light, empty noodle cups and pizza boxes on the table, the fat orange cat asleep between them. Both stare blankly at the screen with huge pupils. Calm, cosy, stupid.
[хвост]
```

**`cs_intro_02.png`** — грохот.

```
[STYLE]
Same living room, same angle. A loud crash comes from the backyard: both friends jolt upright and turn their heads to the dark window on the right, the cat's fur stands on end, a mug tips over. Shock lines around the window. Still no text.
[хвост]
```

**`cs_intro_03.png`** — идут смотреть.

```
[STYLE]
Seen from outside in the dark backyard looking at the house: the back door opens a crack, warm yellow light spills out, Vovan and Dimon peek out one above the other, Vovan gripping a blue kettle, Dimon holding a pink slipper. Their long shadows stretch across the yard toward the viewer.
[хвост]
```

**`cs_intro_04.png`** — зомби.

```
[STYLE]
Backyard at night under a yellow street lamp. In the middle of the yard stands the zombie neighbour in a white tank top and tracksuit pants, green skin, chewing on a garden gnome, staring at the viewer. Around him a knocked-over metal bucket and trash cans — the source of the noise. He glows with a thin neon pink-and-cyan halo while the yard stays muted.
[хвост]
```

**`cs_intro_05.png`** — их там много.

```
[STYLE]
Wide shot over the friends' shoulders from the porch: beyond the broken fence, under a swirling psychedelic neon sky, dozens of absurd glowing silhouettes shuffle toward the yard — zombies, a ballerina shape, a pirate hat, an alien head, a tentacle in the distance. The two friends in the foreground are dark silhouettes seen from behind.
[хвост]
```

**`cs_intro_06.png`** — решили отбиваться.

```
[STYLE]
Heroic low-angle shot on the porch: Vovan and Dimon carry household stuff out of the house to build a defence — Vovan with the blue kettle raised like a torch, Dimon hugging an old wooden CRT TV, the fat orange cat riding on top of a fridge pushed between them. Determined, ridiculous, backlit by the warm doorway.
[хвост]
```

### Остальные

**`cs_boss.png`** — выход Кракена перед пятой ночью.

```
[STYLE]
Flooded backyard at night. A blue inflatable kiddie pool with ducks on it bulges and bursts as a giant purple kraken with yellow slit eyes rises out of it, tentacles curling over the fence. Tiny in the foreground, Vovan and Dimon look up with their jaws dropped. Neon halo on the monster only.
[хвост]
```

**`cs_win.png`** — «Отпустило».

```
[STYLE]
Early morning, soft pink sunrise, the same backyard completely normal and empty: no monsters, just trash, a tipped-over bucket and a garden gnome. Vovan and Dimon sit exhausted on the porch steps wrapped in a blanket, sipping tea from the blue kettle, the cat asleep on Dimon's lap. A normal, alive, slightly annoyed neighbour in a white tank top waves from behind the fence. No neon anywhere.
[хвост]
```

**`cs_lose.png`** — «Вас накрыло».

```
[STYLE]
The living room overrun by hallucinations: the zombie neighbour, the alien and the pirate sit on the sofa watching TV and eating the friends' noodles, while Vovan and Dimon lie flat on the carpet staring at the ceiling with spiral eyes. Everything, including the walls, now glows neon and melts slightly.
[хвост]
```

**`cs_endless.png`** — заставка бесконечного режима.

```
[STYLE]
The backyard dissolved into pure psychedelia: the ground is a checkerboard bending into a spiral tunnel, the fence floats in pieces, endless rows of glowing hallucinations march out of a giant eye in the sky. Vovan and Dimon stand back to back in the centre, tiny, armed with the kettle and the slipper.
[хвост]
```

## 8. Интерфейс

**`logo.png`** (16:9). Кириллицу модель может исказить — проверь каждую букву. Если не выйдет, логотип останется шрифтом, как сейчас.

```
[STYLE]
Game logo on one perfectly flat solid pure chroma green #00FF00 background reaching all four edges, no white margin. Two lines of chunky hand-drawn dripping-paint lettering with thick dark purple outlines. Top line, large, hot pink: the Russian word "ГЛЮКИ". Bottom line, smaller, acid mint green: "vs КОРЕША". Spell the Cyrillic letters exactly as written. No extra words, no extra symbols, no characters.
```

**`ui.png`** (16:9)

```
[STYLE]
Game UI kit sprite sheet, 16:9, separate non-touching elements with wide gaps, all empty with no text: a wide horizontal top bar panel made of taped cardboard and duct tape; a vertical item card frame made of a torn cardboard box flap with a blank picture area and a small blank price tag at the bottom; the same card frame in a highlighted selected state with a yellow marker outline; a large rounded hot-pink button and a smaller dark purple button, both blank; a round pause button and a round sound button with simple icons; an empty progress bar frame and a pink fill strip; a small skull-flag marker for the wave indicator; a blank speech bubble; a blank wooden sign for level titles. Only the dark purple ink outline, no white sticker border. Background: one perfectly flat solid pure chroma green #00FF00 reaching all four edges of the image, no white margin or strip at any edge, no shadows on the background, no text, no numbers.
```

**`icon.png`** (1:1) — иконка игры.

```
[STYLE]
App icon, 1:1, full bleed. Close-up of the zombie neighbour's dopey green face on the right and the fat orange cat's grumpy face on the left, nose to nose, on a hot-pink-to-purple swirling flat background. Thick outlines, bold and readable at tiny size. No text.
```

## 9. Чек-лист файлов

| Очередь | Файлы |
|---|---|
| 1. Стиль | `style_anchor` |
| 2. Минимум, чтобы игра ожила | `vovan`, `vovan_faces`, `dimon`, `dimon_faces`, `zombie`, `zombie_faces`, `alien`, `alien_faces`, `kettle`, `cat`, `fridge`, `doshik`, `roomba`, `fx`, `bg_yard_night` |
| 3. Остальные глюки и оборона | `ballerina`, `ballerina_faces`, `kolobok`, `pirate`, `pirate_faces`, `jesus`, `jesus_faces`, `dracula`, `dracula_faces`, `kraken`, `kraken_faces`, `zombie_tough`, `zombie_tough_faces`, `fan`, `microwave`, `tv` |
| 4. Катсцены | `bg_livingroom`, `cs_intro_01`–`06`, `cs_boss`, `cs_win`, `cs_lose`, `cs_endless` |
| 5. Полировка | `bg_yard_fog`, `bg_yard_rain`, `bg_yard_trip`, `bg_yard_kraken`, `fg_props`, `logo`, `ui`, `icon` |

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
