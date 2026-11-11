# Промты для арта «Глюки vs Кореша»

Всё для Nano Banana Pro. Промты на английском — так модель точнее. Имя файла над каждым промтом: под этим именем клади результат в `assets/raw/`.

## 0. Как работать

1. **Сначала сделай якорь стиля** (раздел 2). Пока он не нравится — дальше не иди.
2. **Ко всем остальным генерациям прикладывай якорь как референс** и начинай промт с блока `STYLE`. Так персонажи будут из одного мира.
3. Для листов с частями тела добавляй ещё блок `SHEET`.
4. Разрешение: 2K минимум, лучше 4K. Листы и фоны — 16:9, одиночные предметы — 1:1.
5. Готовое кидай в `assets/raw/` (в репо или прямо в чат). Дальше режу, собираю риг и анимирую я.
6. Если на персонаже свои вещи совпали по цвету с фоном листа — меняй фон на второй вариант (зелёный ↔ маджента), в промтах это уже учтено.

**Чего не просить:** чужих персонажей по именам (Джек Воробей, герои фильмов и игр). Модель либо откажет, либо выдаст то, что нельзя выпускать. У нас свои типажи и общественное достояние.

**Если модель отказывает на Гитлере:** в промте ниже он уже описан без имени, как «карикатурный диктатор 1940-х». Не добавляй имя и символику — карикатура читается по чёлке и усам.

## 1. Стиль

**Идея:** «дворовый трип». Реальный мир — тёплый, пыльный, приглушённый, ночной двор под жёлтым фонарём. Глюки — кислотные, с неоновым контуром, будто наклеены поверх реальности. По цвету сразу видно, что настоящее, а что мерещится.

- **Линия:** толстый неровный чернильный контур, как маркером, цвет контура тёмно-фиолетовый `#1B1030`, не чёрный.
- **Заливка:** плоские цвета, тень одним пятном (cel shading, одна ступень), лёгкая зернистая текстура бумаги. Никаких градиентов, 3D и глянца.
- **Пропорции:** большая голова (около трети роста), короткие ноги, крупные кисти и ступни, глаза с тяжёлыми веками.
- **Палитра реального мира:** ночной фиолетовый `#241536`, пыльный синий `#3A2F5A`, тёплый фонарь `#FFD27A`, ржавчина `#B5562F`, выцветший зелёный `#6F8A5E`.
- **Палитра глюков:** розовый `#FF5AD1`, кислотный зелёный `#7DFFB0`, жёлтый `#FFE14A`, циан `#5AE0FF`. У каждого глюка тонкий светящийся розово-циановый ореол по контуру.
- **Настроение:** андеграундный комикс и стикеры, смешно и грязновато, без чернухи и крови.

### Блок STYLE (вставлять в начало каждого промта)

```
STYLE: 2D cartoon game art in an underground comix sticker style. Thick uneven hand-inked marker outlines in dark purple (#1B1030), never pure black. Flat colors with a single hard cel-shading step and a subtle paper grain texture. No gradients, no 3D, no glossy highlights, no photorealism. Chunky proportions: head about one third of body height, short legs, big hands and feet, heavy-lidded eyes. Grimy but funny adult-cartoon mood, no gore. Match the attached style reference image exactly: same line weight, same proportions, same palette logic.
```

### Блок SHEET (добавлять для листов с частями тела)

```
SHEET: A character parts sheet for 2D cut-out skeletal animation, 16:9. On the LEFT third: the fully assembled character in a neutral standing pose, side-on 3/4 view. On the RIGHT two thirds: the same character disassembled into separate body parts laid out in a tidy grid with wide empty gaps between them, no part touching or overlapping another. Parts, each drawn complete including the areas normally hidden under other parts, with rounded overlapping joint ends: (1) head, neutral face; (2) head, mouth wide open biting; (3) head, hurt expression; (4) torso; (5) upper arm; (6) forearm with hand; (7) thigh; (8) shin with foot. Limbs hang straight down vertically. Then any accessories as separate parts. Background: one perfectly flat solid color {BG}, no shadows on the background, no floor, no text, no labels, no numbers, no arrows, no frame.
```

`{BG}` — подставь `pure chroma green #00FF00` или `pure magenta #FF00FF`, как указано у персонажа.

## 2. Якорь стиля

**`style_anchor.png`** (16:9). Он же пойдёт на титульный экран.

```
STYLE: 2D cartoon game art in an underground comix sticker style. Thick uneven hand-inked marker outlines in dark purple (#1B1030), never pure black. Flat colors with a single hard cel-shading step and a subtle paper grain texture. No gradients, no 3D, no glossy highlights, no photorealism. Chunky proportions: head about one third of body height, short legs, big hands and feet, heavy-lidded eyes. Grimy but funny adult-cartoon mood, no gore.

Key art, 16:9. Night-time backyard of a shabby suburban house lit by one yellow street lamp. In the foreground left, two slacker friends in their twenties stand back to back, scared but ready to fight. Friend one: short and stocky, red beanie, green hoodie, baggy blue jeans, white sneakers, wide bloodshot eyes, holding an old blue enamel kettle like a weapon. Friend two: tall and lanky, long brown hair, round glasses, purple t-shirt with a yellow smiley, dark jeans, red sneakers, holding a pink house slipper raised to throw. A fat orange cat sits between their feet, unimpressed. From the right, a crowd of absurd hallucinations approaches: a green-skinned zombie neighbour in a white tank top and tracksuit pants, a skinny grey-green alien, a drunk pirate with an orange beard. The real world is painted in muted dusty purples and warm lamp yellow; the hallucinations are painted in acid neon pink, green and cyan with a thin glowing pink-and-cyan halo around their outlines. Swirling psychedelic sky on the right side only. No text, no logo.
```

## 3. Кореша (смотрят вправо)

**`vovan.png`** — фон зелёный нельзя (зелёное худи), берём маджента.

```
[STYLE]
[SHEET with {BG} = pure magenta #FF00FF]
Character: VOVAN, a short stocky slacker in his twenties, facing RIGHT. Red beanie pulled low, green hoodie with white drawstrings and a front pocket, baggy blue jeans, white sneakers. Round face, wide bloodshot eyes with huge pupils, permanently startled. Real-world muted palette, no neon glow. Replace head variants with: (1) neutral dazed; (2) screaming with mouth wide open; (3) panicking. Accessories as separate parts: blue enamel kettle, hand cupped next to mouth for yelling.
```

**`dimon.png`** — фон зелёный.

```
[STYLE]
[SHEET with {BG} = pure chroma green #00FF00]
Character: DIMON, a tall lanky slacker in his twenties, facing RIGHT. Long straight brown hair past the shoulders, round glasses with pale lenses, purple t-shirt with a yellow smiley face, dark grey jeans, red sneakers. Sleepy relaxed smile, half-closed eyes. Real-world muted palette, no neon glow. Replace head variants with: (1) neutral sleepy smile; (2) laughing; (3) panicking with glasses askew. Accessories as separate parts: pink fluffy house slipper, forearm with hand in a throwing grip.
```

## 4. Глюки (смотрят влево)

У всех глюков в конце промта одна и та же фраза про ореол — она уже вписана.

**`zombie.png`** — базовый враг. Фон маджента (кожа зелёная).

```
[STYLE]
[SHEET with {BG} = pure magenta #FF00FF]
Character: ZOMBIE NEIGHBOUR, facing LEFT. A middle-aged pot-bellied neighbour turned zombie: sickly green skin, almost bald with three hairs, one eye bigger than the other, missing teeth, dopey hungry face. Dirty white sleeveless tank top stretched over the belly, blue tracksuit pants with white side stripes, worn brown house slippers. Arms reach forward. Acid neon accents with a thin glowing pink-and-cyan halo around the outline. Accessories as separate parts: a dented cooking-pot lid, a rolled-up newspaper.
```

**`zombie_tough.png`** — усиленная версия для поздних ночей.

```
[STYLE]
[SHEET with {BG} = pure magenta #FF00FF]
Character: ZOMBIE GYM BRO, facing LEFT. Same world as the zombie neighbour but huge and muscular with a tiny head: green skin, buzz cut, tiny angry eyes, torn neon-yellow gym tank top, black shorts, one flip-flop. Carries a car tyre worn around the torso like armour (tyre as a separate accessory part). Acid neon accents with a thin glowing pink-and-cyan halo around the outline.
```

**`ballerina.png`** — «Гитлер в пачке». Фон зелёный (костюм розовый).

```
[STYLE]
[SHEET with {BG} = pure chroma green #00FF00]
Character: a satirical caricature of a furious 1940s dictator dressed as a ballerina, facing LEFT. Small angry man with a black side-parted fringe and a small rectangular toothbrush moustache, scowling. Pink ballet leotard, fluffy layered pink tutu, white tights, pink pointe shoes with ribbons. No military uniform, no symbols, no armbands, no insignia of any kind. Ridiculous and humiliating, pure mockery. Replace head variants with: (1) scowling; (2) shouting with mouth wide open; (3) dizzy with spiral eyes. Accessories as separate parts: the tutu skirt as its own ring-shaped part, both arms in a raised rounded ballet pose. Acid neon accents with a thin glowing pink-and-cyan halo around the outline.
```

**`alien.png`** — фон маджента.

```
[STYLE]
[SHEET with {BG} = pure magenta #FF00FF]
Character: GREY ALIEN, facing LEFT. Classic skinny little grey-green alien with an oversized bulb head, huge glossy black almond eyes, tiny mouth, one antenna ending in a pink glowing ball, thin noodle limbs with three long fingers. Wears only white socks with sandals. Runs leaning forward. Acid neon accents with a thin glowing pink-and-cyan halo around the outline. Accessories as separate parts: a tiny toy ray gun.
```

**`pirate.png`** — свой пьяный пират. Фон зелёный.

```
[STYLE]
[SHEET with {BG} = pure chroma green #00FF00]
Character: DRUNK PIRATE CAPTAIN, an original character, facing LEFT. Barrel-chested pirate with a huge bushy orange beard, black eyepatch, red nose, dark tricorn hat with a white skull badge, red-and-white striped shirt, wide leather belt, dark purple breeches, one wooden peg leg and one buckled boot. Cross-eyed and swaying. Must not resemble any existing film character: no dreadlocks, no bandana, no beads, no eyeliner. Replace head variants with: (1) drunk grin; (2) mouth wide open biting; (3) hiccuping with a bubble. Accessories as separate parts: green bottle, forearm with hand gripping the bottle, the peg leg. Acid neon accents with a thin glowing pink-and-cyan halo around the outline.
```

**`jesus.png`** — фон зелёный.

```
[STYLE]
[SHEET with {BG} = pure chroma green #00FF00]
Character: a friendly cartoon JESUS as a hallucination, facing LEFT. Long brown hair, short beard, calm blissful smile, long cream-white robe to the ankles with a red sash over one shoulder, leather sandals. Arms spread wide in a welcoming gesture. Good-natured and funny, not mocking. Because of the long robe, replace thigh and shin parts with: the lower robe as one bell-shaped part, and two sandalled feet. Replace head variants with: (1) calm smile; (2) mouth open singing; (3) eyes closed, peaceful. Accessories as separate parts: golden ring halo, a soft round glow disc. Acid neon accents with a thin glowing pink-and-cyan halo around the outline.
```

**`dracula.png`** — фон зелёный.

```
[STYLE]
[SHEET with {BG} = pure chroma green #00FF00]
Character: COUNT DRACULA in the classic public-domain look, facing LEFT. Pale blue-grey skin, slicked black hair with a sharp widow's peak, red eyes, two long fangs, smug aristocratic sneer. Black tailcoat, white shirt, red bow tie, high-collared black cape with crimson lining. Replace head variants with: (1) smug sneer; (2) mouth wide open with fangs; (3) hissing and shielding eyes. Accessories as separate parts: the cape as one large part seen from the side, a small cartoon bat. Acid neon accents with a thin glowing pink-and-cyan halo around the outline.
```

**`kolobok.png`** (1:1) — не гуманоид, отдельный лист. Фон маджента.

```
[STYLE]
A sprite sheet, 1:1, of a KOLOBOK: a round golden-brown bread bun creature from a folk tale, angry and feral, with a crusty baked texture drawn as flat shapes, red eyes, thick angry eyebrows and a wide mouth full of sharp teeth. No arms, no legs, a perfect ball. Six separate versions in a 3x2 grid with wide gaps: neutral angry; mouth wide open biting; hurt with a crack; and the same three again as a plain ball without a face (back side for the rolling animation). Acid neon accents with a thin glowing pink-and-cyan halo around the outline. Background: one perfectly flat solid pure magenta #FF00FF, no shadows, no text, no labels.
```

**`kraken.png`** (16:9) — босс. Фон зелёный.

```
[STYLE]
A boss parts sheet, 16:9, for cut-out animation. A giant purple KRAKEN crawling out of a cheap inflatable kiddie pool, facing LEFT. On the LEFT third: the assembled monster. On the RIGHT two thirds, as separate non-touching parts with wide gaps: (1) the huge bulbous head with warty spots, angry yellow slit-pupil eyes and heavy brows; (2) the same head roaring with a beak-like mouth open; (3) the same head hurt, eyes squeezed shut; (4) three tentacle segments of decreasing thickness, each drawn straight and vertical with rounded ends and pink suckers on one side, so they can be chained into a bending tentacle; (5) a tentacle tip curled into a hook; (6) a blue inflatable kiddie pool with cartoon ducks printed on it, with water splashing over the rim. Acid neon accents with a thin glowing pink-and-cyan halo around the outline. Background: one perfectly flat solid pure chroma green #00FF00, no shadows, no floor, no text, no labels.
```

### Запас на потом (свои типажи, тот же шаблон)

Подставляй в шаблон `[STYLE] + [SHEET] + Character: ...`:

- **`unicorn.png`** — `GOPNIK UNICORN, facing LEFT: a bipedal white unicorn squatting-type street tough in a black tracksuit with three stripes and a flat cap, rainbow mane, gold tooth, sunflower seeds in one hoof.` Фон зелёный.
- **`knight.png`** — `CARDBOARD KNIGHT, facing LEFT: a kid-sized knight in armour made of taped cardboard boxes, a colander helmet, a pot-lid shield and a mop for a lance.` Фон зелёный.
- **`hamster.png`** — `GIANT HAMSTER, facing LEFT: a human-sized fat orange-and-white hamster walking upright with stuffed cheeks and tiny furious eyes.` Фон зелёный.
- **`grandma.png`** — `GHOST GRANDMA, facing LEFT: a translucent floating granny in a headscarf and floral dress with a rolling pin, legs fading into a wisp.` Фон маджента.

## 5. Оборона

Одиночные предметы, 1:1, по несколько состояний на листе. Предметы — реальный мир, значит приглушённые цвета и без неонового ореола. Все смотрят вправо.

Общий хвост для этого раздела (вставлять в конец):

```
Each state is a separate sprite with wide empty gaps between them, nothing touching. Real-world muted palette, no neon glow. Background: one perfectly flat solid pure magenta #FF00FF, no shadows on the background, no floor, no text, no labels, no numbers.
```

**`kettle.png`**

```
[STYLE]
Sprite sheet, 1:1, of an old blue enamel stovetop KETTLE with a white stripe, a black arched handle and a cute sleepy face, facing RIGHT. Three states in a row: idle; puffed up and whistling with cheeks blown; lid popping off. Plus a separate small steam puff cloud.
[хвост]
```

**`cat.png`**

```
[STYLE]
Sprite sheet, 1:1, of a fat grumpy orange tabby CAT sitting upright, facing RIGHT. Four states in a 2x2 grid: idle with half-closed eyes; cheeks puffed, about to spit; mouth wide open spitting; annoyed with ears flat. Plus as separate parts: the tail on its own, and a brown hairball projectile.
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
Sprite sheet, 16:9, of small game effects in a grid with wide gaps, nothing touching: a glowing yellow lightbulb (the game currency) in three brightness steps; a pink fluffy house slipper; four frames of a cartoon explosion from small to large; four frames of a rainbow smoke puff dissolving; three dizzy stars; a "sleepy Z"; a splash of water; a broom; a cracked-ground dust cloud; a speech bubble, empty. Background: one perfectly flat solid pure chroma green #00FF00, no shadows on the background, no text, no labels, no numbers.
```

## 6. Окружение

Фоны без персонажей и без предметов на игровом поле. Камера как в настольной игре: вид сбоку-сверху, поле плоское. Игровое поле занимает правые 80% кадра и нижние 80% высоты — там 5 рядов по 9 клеток, сетку наложу сам.

**`bg_yard_night.png`** (16:9, 4K) — основной фон.

```
[STYLE]
Game background, 16:9, no characters. A shabby suburban BACKYARD at night seen from a high 3/4 top-down side angle like a board game. LEFT 20% of the frame: the back wall of a small house with an open back door spilling warm yellow light, two concrete steps, and an old brown sofa dragged out onto a wooden porch. RIGHT 80% of the frame, lower 80% of the height: one large flat rectangular yard of trampled dirt and patchy dry grass with a few cracked concrete paving slabs, completely EMPTY and evenly lit so game pieces can be placed on it, no objects, no furniture, no holes, no strong shadows crossing it. TOP 20% strip above the yard: a sagging wooden fence, a clothesline with laundry, a rusty garage wall, dark trees, one yellow street lamp. FAR RIGHT edge: the fence is broken and a swirling psychedelic neon fog in pink, cyan and acid green leaks in. Muted dusty purple night palette with warm lamp yellow; neon only in the fog on the right. No text.
```

Варианты ночей делай **редактированием** основного фона (приложи `bg_yard_night.png` и попроси изменить), чтобы планировка совпала пиксель в пиксель:

- **`bg_yard_fog.png`** — `Edit the attached image, keep the exact same layout and camera: add thick low green-tinted fog over the right half of the yard and around the fence, dim the street lamp.`
- **`bg_yard_rain.png`** — `Edit the attached image, keep the exact same layout and camera: heavy rain, puddles reflecting the yellow lamp, wet shiny mud, laundry soaked.`
- **`bg_yard_trip.png`** — `Edit the attached image, keep the exact same layout and camera: the sky and the fence melt into swirling psychedelic patterns, the yard ground gets faint rainbow ripples, a giant eye opens in the moon.`
- **`bg_yard_kraken.png`** — `Edit the attached image, keep the exact same layout and camera: the yard is flooded ankle-deep with dark water, a blue inflatable kiddie pool at the far right edge overflows and glows purple from inside, tentacle shadows on the fence.`

**`bg_livingroom.png`** (16:9) — для меню и катсцен.

```
[STYLE]
Game background, 16:9, no characters. A messy bachelor LIVING ROOM at night seen straight-on like a theatre stage. An old brown sofa in the centre facing the viewer, a low table with pizza boxes, instant-noodle cups and mugs, a carpet hanging on the wall, a floor lamp, a window on the right showing a dark backyard, a door to the yard on the far right. The only light is the flickering blue-white glow of a TV that sits off-frame in front of the sofa. Muted dusty purple palette. No text.
```

**`fg_props.png`** (16:9) — передний план для параллакса.

```
[STYLE]
Sprite sheet, 16:9, of backyard foreground props as separate non-touching objects with wide gaps: a rusty barbecue grill, a stack of old car tyres, a tipped-over garden gnome, a dented metal bucket, a broken wooden fence section, a tuft of dry weeds, a garden hose coil, a plastic chair, a street lamp post with a yellow lamp. Real-world muted palette. Background: one perfectly flat solid pure magenta #FF00FF, no shadows on the background, no text, no labels.
```

## 7. Катсцены

Статичные кадры 16:9 без текста и без облачков — подписи, панорамы, тряску, вспышки и звук добавлю сам. Ко всем прикладывай якорь стиля и готовые листы Вована и Димона, чтобы лица совпадали.

Общий хвост:

```
Cinematic comic panel, 16:9. Keep both friends exactly as in the attached character references. No text, no speech bubbles, no captions, no panel borders.
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
Heroic low-angle shot on the porch: Vovan and Dimon carry household stuff out of the house to build a defence — Vovan with the kettle raised like a torch, Dimon hugging an old CRT TV, the fat orange cat riding on top of a fridge pushed between them. Determined, ridiculous, backlit by the warm doorway.
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
Game logo on one perfectly flat solid pure chroma green #00FF00 background. Two lines of chunky hand-drawn dripping-paint lettering with thick dark purple outlines. Top line, large, hot pink: the Russian word "ГЛЮКИ". Bottom line, smaller, acid mint green: "vs КОРЕША". Spell the Cyrillic letters exactly as written. No extra words, no extra symbols, no characters.
```

**`ui.png`** (16:9)

```
[STYLE]
Game UI kit sprite sheet, 16:9, separate non-touching elements with wide gaps, all empty with no text: a wide horizontal top bar panel made of taped cardboard and duct tape; a vertical item card frame made of a torn cardboard box flap with a blank picture area and a small blank price tag at the bottom; the same card frame in a highlighted selected state with a yellow marker outline; a large rounded hot-pink button and a smaller dark purple button, both blank; a round pause button and a round sound button with simple icons; an empty progress bar frame and a pink fill strip; a small skull-flag marker for the wave indicator; a blank speech bubble; a blank wooden sign for level titles. Background: one perfectly flat solid pure chroma green #00FF00, no shadows on the background, no text, no numbers.
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
| 2. Минимум, чтобы игра ожила | `vovan`, `dimon`, `zombie`, `alien`, `kettle`, `cat`, `fridge`, `doshik`, `roomba`, `fx`, `bg_yard_night` |
| 3. Остальные глюки и оборона | `ballerina`, `kolobok`, `pirate`, `jesus`, `dracula`, `kraken`, `zombie_tough`, `fan`, `microwave`, `tv` |
| 4. Катсцены | `bg_livingroom`, `cs_intro_01`–`06`, `cs_boss`, `cs_win`, `cs_lose`, `cs_endless` |
| 5. Полировка | `bg_yard_fog`, `bg_yard_rain`, `bg_yard_trip`, `bg_yard_kraken`, `fg_props`, `logo`, `ui`, `icon` |

Что проверить перед тем, как отдавать лист:

- части не касаются друг друга и не обрезаны краем;
- фон ровный, одного цвета, без теней и текста;
- лицо и одежда на частях совпадают с собранным персонажем слева;
- конечности висят прямо вниз, а не согнуты.
