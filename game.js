/* Глюки vs Кореша — lane defense на чистом canvas, без зависимостей.
   Все персонажи собраны из частей тела (риг), чтобы позже подменить вектор спрайтами: см. README. */
(() => {
'use strict';
const W = 1280, H = 720, COLS = 9, ROWS = 5, CELL = 110, GX = 260, GY = 150;
const cv = document.getElementById('game'), c = cv.getContext('2d');
const DISPLAY = '"Rubik Wet Paint", Impact, "Arial Black", sans-serif';
const BODY = 'Rubik, "Segoe UI", Roboto, Arial, sans-serif';
const OUT = '#1b1030';
const rnd = (a, b) => a + Math.random() * (b - a);
const pick = a => a[Math.floor(Math.random() * a.length)];
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const rowY = r => GY + r * CELL + 98;
const colX = col => GX + col * CELL + 55;
let T = 0, btns = [], mouse = { x: -99, y: -99 }, G = null, screen = 'menu';
/* Поле рисуется в «полевых» координатах и вписывается в двор на фоне: FX, FY — левый верх поля на экране, K — масштаб. */
const FX = 412, FY = 250, K = 84 / CELL;
const toField = p => ({ x: GX + (p.x - FX) / K, y: GY + (p.y - FY) / K });
const PORCH = [{ x: 228, y: 508, h: 150, spr: 'vovan' }, { x: 318, y: 522, h: 172, spr: 'dimon' }];
const IMG = {};
function load(name, src) { const im = new Image(); im.src = src; IMG[name] = im; }
for (const n of ['vovan', 'dimon', 'zombie', 'alien', 'ballerina', 'tough', 'kettle', 'kettle_blow', 'kettle_pop', 'doshik_0', 'doshik_1', 'doshik_2', 'fridge_0', 'fridge_1', 'fridge_2', 'roomba', 'roomba_on', 'bulb', 'slipper',
  'boom_0', 'boom_1', 'boom_2', 'boom_3', 'boom_4', 'puff_0', 'puff_1', 'puff_2', 'puff_3', 'stars']) load(n, `assets/sprites/${n}.png`);
load('bg', 'assets/sprites/bg_yard_night.jpg'); load('cover', 'assets/sprites/style_anchor.jpg');
for (const w of ['vovan', 'dimon']) for (const f of ['neutral', 'yell', 'laugh', 'scared']) load(`${w}_${f}`, `assets/chars/${w}/head_${f}.png`);
const has = n => IMG[n] && IMG[n].complete && IMG[n].naturalWidth > 0;
/* Куклы с костями (puppet.js): ноги шагают, голова и корпус качаются, лица подменяются. */
const { PUP, loadPuppet, drawPuppet, CLIPS } = window.Puppets;
for (const n of ['vovan', 'dimon', 'zombie', 'alien', 'ballerina', 'tough']) loadPuppet(n);
const FACE_FIT = { vovan: [1.02, 0, 0], dimon: [1, 0, 0] };
const COARSE = matchMedia('(pointer: coarse)').matches;
/* Спрайт высотой h, якорь по умолчанию — низ по центру. */
function spr(n, h, ax = 0.5, ay = 1) { const im = IMG[n], w = im.naturalWidth * h / im.naturalHeight; c.drawImage(im, -w * ax, -h * ay, w, h); }

/* ---------- сохранение ---------- */
let save = { level: 1, sound: true, best: 0 };
try { Object.assign(save, JSON.parse(localStorage.getItem('glyuki') || '{}')); } catch (e) {}
const persist = () => { try { localStorage.setItem('glyuki', JSON.stringify(save)); } catch (e) {} };

/* ---------- звук ---------- */
let ac = null;
function sfx(f, d = 0.1, type = 'square', v = 0.05, slide = 0) {
  if (!save.sound) return;
  try {
    ac = ac || new (window.AudioContext || window.webkitAudioContext)();
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = type; o.frequency.setValueAtTime(f, ac.currentTime);
    if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(30, f + slide), ac.currentTime + d);
    g.gain.setValueAtTime(v, ac.currentTime); g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + d);
    o.connect(g); g.connect(ac.destination); o.start(); o.stop(ac.currentTime + d);
  } catch (e) {}
}

/* ---------- примитивы ---------- */
function rr(x, y, w, h, r, fill, stroke, lw = 3) { c.beginPath(); c.roundRect(x, y, w, h, r); if (fill) { c.fillStyle = fill; c.fill(); } if (stroke) { c.strokeStyle = stroke; c.lineWidth = lw; c.stroke(); } }
function ell(x, y, rx, ry, fill, stroke, lw = 3) { c.beginPath(); c.ellipse(x, y, rx, ry, 0, 0, 7); if (fill) { c.fillStyle = fill; c.fill(); } if (stroke) { c.strokeStyle = stroke; c.lineWidth = lw; c.stroke(); } }
const circ = (x, y, r, fill, stroke, lw) => ell(x, y, r, r, fill, stroke, lw);
function line(x1, y1, x2, y2, col, lw = 3) { c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.strokeStyle = col; c.lineWidth = lw; c.lineCap = 'round'; c.stroke(); }
function poly(pts, fill, stroke, lw = 3) { c.beginPath(); pts.forEach((p, i) => i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])); c.closePath(); if (fill) { c.fillStyle = fill; c.fill(); } if (stroke) { c.strokeStyle = stroke; c.lineWidth = lw; c.lineJoin = 'round'; c.stroke(); } }
function txt(s, x, y, size, col = '#fff', align = 'center', font = BODY, stroke = null, weight = 700) {
  c.font = `${weight} ${size}px ${font}`; c.textAlign = align; c.textBaseline = 'middle';
  if (stroke) { c.strokeStyle = stroke; c.lineWidth = Math.max(3, size / 6); c.lineJoin = 'round'; c.strokeText(s, x, y); }
  c.fillStyle = col; c.fillText(s, x, y);
}
function shadow(rx = 28) { ell(0, 2, rx, rx * 0.25, 'rgba(0,0,0,.35)'); }

/* ---------- риг: части тела + подмена спрайтами ----------
   SPRITES[id][part] = HTMLImageElement. Части: head, body, arm, leg.
   Точка крепления: у arm/leg — верх по центру, у head/body — низ по центру. */
const SPRITES = {};
window.GlyukiSprites = {
  load(id, parts, scale = 1) { // parts: {head:'assets/x/head.png', ...}
    SPRITES[id] = SPRITES[id] || { scale };
    for (const k in parts) { const im = new Image(); im.onload = () => SPRITES[id][k] = im; im.src = parts[k]; }
  }
};
function drawPart(id, name, x, y, rot, fn) {
  c.save(); c.translate(x, y); c.rotate(rot);
  const sp = SPRITES[id], im = sp && sp[name];
  if (im) { const s = sp.scale, w = im.width * s, h = im.height * s; c.drawImage(im, -w / 2, (name === 'arm' || name === 'leg') ? 0 : -h, w, h); }
  else fn();
  c.restore();
}
function limb(w, len, col, back) { rr(-w / 2, -3, w, len + 3, w / 2, col, OUT); if (back) rr(-w / 2, -3, w, len + 3, w / 2, 'rgba(0,0,0,.25)'); }
function mkSkin(o) {
  const s = Object.assign({ leg: 34, torso: 40, armLen: 30, bw: 30, legW: 11, armW: 9, skin: '#f0c9a0', shoe: '#222' }, o);
  s.fLeg = b => { limb(s.legW, s.leg, s.pants, b); ell(-4, s.leg, 10, 5, s.shoe, OUT); };
  s.fArm = b => { limb(s.armW, s.armLen, s.sleeve || s.shirt, b); circ(0, s.armLen, 6, s.skin, OUT, 2); if (!b && s.hand) s.hand(); };
  s.fBody = () => { rr(-s.bw / 2, -s.torso, s.bw, s.torso + 5, 10, s.shirt, OUT); if (s.bodyX) s.bodyX(); };
  return s;
}
function humanoid(s, p) {
  const hip = -s.leg, sh = hip - s.torso + 7;
  c.save(); c.translate(0, p.bob || 0); c.rotate(p.lean || 0);
  if (s.behind) s.behind(p);
  drawPart(s.id, 'arm', 9, sh, p.armB || 0, () => s.fArm(true));
  drawPart(s.id, 'leg', 6, hip, p.legB || 0, () => s.fLeg(true));
  drawPart(s.id, 'leg', -6, hip, p.legF || 0, () => s.fLeg(false));
  drawPart(s.id, 'body', 0, hip, 0, s.fBody);
  drawPart(s.id, 'head', 0, hip - s.torso + 2, p.head || 0, s.fHead);
  drawPart(s.id, 'arm', -9, sh, p.armF || 0, () => s.fArm(false));
  c.restore();
}
function eyes(pup = '#111', dx = 0, r = 4.5) {
  circ(-11, -19, r, '#fff', OUT, 1.5); circ(-1, -19, r, '#fff', OUT, 1.5);
  circ(-12 + dx, -19, r * 0.45, pup); circ(-2 + dx, -19, r * 0.45, pup);
}
const headBase = col => circ(-2, -16, 17, col, OUT);

/* ---------- скины глюков (смотрят влево) ---------- */
const SK = {};
SK.hitler = mkSkin({ id: 'hitler', pants: '#f4f0f5', shirt: '#ff7ac0', sleeve: '#f0c9a0', shoe: '#ff4fa3', leg: 38, torso: 34, bw: 26,
  bodyX() { for (let i = 0; i < 5; i++) ell(-24 + i * 12, 2, 11, 7, i % 2 ? '#ffb3dc' : '#ff8fcb', OUT, 2); ell(0, -2, 26, 6, '#ffd0ea', OUT, 2); },
  fHead() { headBase('#f0c9a0'); c.beginPath(); c.arc(-2, -16, 17, Math.PI * 1.05, Math.PI * 2.05); c.lineTo(8, -22); c.quadraticCurveTo(-6, -22, -16, -14); c.closePath(); c.fillStyle = '#18130f'; c.fill();
    eyes(); line(-16, -26, -8, -23, OUT, 3); line(4, -25, -3, -23, OUT, 3); rr(-10, -12, 8, 5, 1, '#18130f'); line(-10, -4, -2, -4, OUT, 2); } });
SK.zombie = mkSkin({ id: 'zombie', pants: '#2f4f9a', shirt: '#f1efe8', sleeve: '#9db88a', skin: '#9db88a', shoe: '#7a4a2a', bw: 32,
  bodyX() { ell(0, -8, 15, 10, '#e2dfd4'); rr(-16, -4, 32, 8, 2, '#2f4f9a', OUT, 2); circ(6, -22, 3, '#b9b28f'); },
  fHead() { headBase('#9db88a'); line(-6, -33, -8, -40, OUT, 2); line(0, -33, 2, -41, OUT, 2); circ(-11, -19, 6, '#fff', OUT, 1.5); circ(0, -19, 4, '#fff', OUT, 1.5); circ(-12, -19, 2, '#111'); circ(-1, -19, 1.6, '#111');
    rr(-12, -9, 13, 7, 2, '#3a1a20', OUT, 1.5); rr(-10, -9, 3, 3, 0, '#fff'); rr(-4, -5, 3, 3, 0, '#fff'); line(8, -8, 12, -2, '#6f8a5e', 2); } });
SK.alien = mkSkin({ id: 'alien', pants: '#8fbf9a', shirt: '#9fd0aa', skin: '#9fd0aa', shoe: '#6f9f7a', leg: 30, torso: 30, bw: 20, legW: 8, armW: 6, armLen: 32,
  fHead() { ell(-2, -22, 20, 25, '#a9dbb4', OUT); c.save(); c.translate(-12, -22); c.rotate(0.35); ell(0, 0, 6, 10, '#0c0c14'); c.restore(); c.save(); c.translate(2, -22); c.rotate(-0.35); ell(0, 0, 6, 10, '#0c0c14'); c.restore();
    circ(-13, -25, 2, '#fff'); circ(1, -25, 2, '#fff'); line(-8, -5, -3, -5, OUT, 2); line(-6, -45, -12, -58, OUT, 2); circ(-12, -59, 3, '#ff5ad1'); } });
SK.pirate = mkSkin({ id: 'pirate', pants: '#3b2f55', shirt: '#f2efe6', shoe: '#2a1a12', bw: 32, skin: '#e0a779',
  bodyX() { for (let i = 0; i < 3; i++) rr(-15, -34 + i * 11, 30, 5, 0, '#d33b3b'); rr(-16, -6, 32, 7, 2, '#7a4a21', OUT, 2); },
  hand() { rr(-5, 30, 9, 20, 3, '#3f8f4a', OUT, 2); rr(-3, 48, 5, 7, 1, '#3f8f4a', OUT, 2); },
  fHead() { headBase('#e0a779'); poly([[-16, -8], [12, -8], [4, 14], [-8, 14]], '#d9772b', OUT); eyes(); rr(-17, -24, 11, 10, 3, '#111'); line(-20, -27, 14, -24, '#111', 2);
    line(-10, -6, -1, -6, OUT, 2); poly([[-30, -28], [24, -28], [10, -44], [-2, -50], [-16, -44]], '#2b2338', OUT); circ(-3, -38, 5, '#f2efe6', OUT, 2); line(-6, -41, 0, -35, OUT, 2); line(0, -41, -6, -35, OUT, 2); } });
SK.jesus = mkSkin({ id: 'jesus', pants: '#f7f3e8', shirt: '#f7f3e8', shoe: '#8a5a2b', leg: 26, torso: 50, bw: 34, legW: 13, skin: '#d9a877', armW: 11,
  behind() { c.save(); c.globalAlpha = 0.25 + Math.sin(T * 3) * 0.08; circ(0, -70, 62, '#fff6b0'); c.restore(); },
  bodyX() { poly([[-17, -50], [-6, -50], [17, -8], [17, 2], [8, 2]], '#c8322f', OUT, 2); rr(-18, 0, 36, 22, 5, '#f7f3e8', OUT); },
  fHead() { poly([[-19, -22], [15, -22], [18, 16], [-8, 8]], '#6b4326', OUT); headBase('#d9a877'); c.beginPath(); c.arc(-2, -16, 17, Math.PI * 1.1, Math.PI * 2.0); c.closePath(); c.fillStyle = '#6b4326'; c.fill();
    poly([[-15, -10], [10, -10], [2, 8], [-9, 8]], '#6b4326', OUT, 2); eyes('#3a2a1a'); line(-9, -5, -3, -5, '#f7f3e8', 2); ell(-2, -42, 20, 6, null, '#ffd84a', 5); } });
SK.dracula = mkSkin({ id: 'dracula', pants: '#17131f', shirt: '#17131f', shoe: '#000', skin: '#d8dde8', bw: 30, sleeve: '#17131f',
  behind(p) { const s = Math.sin(T * 4) * 5; poly([[-16, -72], [16, -72], [34 + s, 0], [-24, 0]], '#0e0b14', OUT); poly([[-10, -66], [14, -66], [26 + s, -4], [-14, -4]], '#b0162c'); },
  bodyX() { poly([[-8, -40], [8, -40], [0, -22]], '#f4f4f4', OUT, 2); circ(0, -30, 3, '#b0162c'); poly([[-15, -40], [-24, -52], [-8, -44]], '#b0162c', OUT, 2); poly([[15, -40], [24, -52], [8, -44]], '#b0162c', OUT, 2); },
  fHead() { headBase('#d8dde8'); c.beginPath(); c.arc(-2, -16, 17, Math.PI * 1.0, Math.PI * 2.05); c.lineTo(6, -24); c.lineTo(-4, -17); c.lineTo(-13, -25); c.closePath(); c.fillStyle = '#0e0b14'; c.fill();
    eyes('#c0102a'); line(-16, -27, -8, -24, OUT, 2.5); line(4, -27, -3, -24, OUT, 2.5); rr(-12, -8, 12, 5, 2, '#5a0d18', OUT, 1.5); poly([[-11, -8], [-8, -8], [-9.5, -2]], '#fff'); poly([[-4, -8], [-1, -8], [-2.5, -2]], '#fff'); } });

/* ---------- кореша (рисуются зеркально — смотрят вправо) ---------- */
SK.vovan = mkSkin({ id: 'vovan', pants: '#2c3a66', shirt: '#3fa35a', shoe: '#eee',
  bodyX() { rr(-9, -16, 18, 12, 4, '#348a4b', OUT, 2); line(-4, -38, -4, -26, '#fff', 2); line(3, -38, 3, -26, '#fff', 2); },
  fHead() { headBase('#f0c9a0'); c.beginPath(); c.arc(-2, -18, 18, Math.PI * 0.98, Math.PI * 2.02); c.closePath(); c.fillStyle = '#e0483e'; c.fill(); c.strokeStyle = OUT; c.lineWidth = 3; c.stroke(); rr(-21, -22, 38, 7, 3, '#b93a32', OUT, 2);
    circ(-11, -12, 5.5, '#ffd9d9', OUT, 1.5); circ(-1, -12, 5.5, '#ffd9d9', OUT, 1.5); circ(-11, -12, 3.6, '#111'); circ(-1, -12, 3.6, '#111'); ell(-6, -3, 5, 2.5 + Math.abs(Math.sin(T * 2)) * 2, '#5a2020', OUT, 1.5); } });
SK.dimon = mkSkin({ id: 'dimon', pants: '#3a3a3a', shirt: '#7a4fd0', sleeve: '#f0c9a0', shoe: '#c33', leg: 38, torso: 42, bw: 28,
  bodyX() { circ(0, -24, 8, '#ffd84a', OUT, 2); circ(-3, -26, 1.3, OUT); circ(3, -26, 1.3, OUT); c.beginPath(); c.arc(0, -23, 4, 0.2, 2.9); c.strokeStyle = OUT; c.lineWidth = 1.5; c.stroke(); },
  fHead() { poly([[-20, -26], [16, -26], [20, 14], [8, 16], [6, -8]], '#4a3320', OUT); headBase('#f0c9a0'); c.beginPath(); c.arc(-2, -16, 17, Math.PI * 1.02, Math.PI * 2.0); c.closePath(); c.fillStyle = '#4a3320'; c.fill();
    circ(-11, -14, 6, 'rgba(160,255,200,.5)', OUT, 2); circ(2, -14, 6, 'rgba(160,255,200,.5)', OUT, 2); line(-5, -14, -4, -14, OUT, 2); circ(-11, -14, 2.8, '#111'); circ(2, -14, 2.8, '#111'); c.beginPath(); c.arc(-5, -6, 5, 0.3, 2.8); c.strokeStyle = OUT; c.lineWidth = 2; c.stroke(); } });

/* ---------- глюки ---------- */
const ENEMY = {
  zombie:  { name: 'Зомби-сосед', hp: 190, speed: 20, dps: 80, w: 6 },
  hitler:  { name: 'Гитлер в пачке', hp: 250, speed: 23, dps: 80, w: 3 },
  tough:   { name: 'Зомби-качок', hp: 800, speed: 14, dps: 130, w: 2, tough: 1 },
  alien:   { name: 'Пришелец', hp: 130, speed: 32, dps: 60, w: 3 },
  kolobok: { name: 'Колобок', hp: 150, speed: 46, dps: 50, w: 2 },
  pirate:  { name: 'Пьяный пират', hp: 320, speed: 21, dps: 90, w: 3, tough: 1 },
  jesus:   { name: 'Иисус', hp: 300, speed: 15, dps: 70, w: 2, tough: 1 },
  dracula: { name: 'Дракула', hp: 460, speed: 17, dps: 100, w: 2, tough: 1 },
  kraken:  { name: 'Кракен', hp: 3200, speed: 9, dps: 420, w: 0, big: 1 }
};
function walkPose(e, amp = 0.5) {
  const s = Math.sin(e.ph);
  if (e.eating) return { legF: 0.1, legB: -0.1, armF: 1.25 + Math.sin(T * 14) * 0.45, armB: 1.0 - Math.sin(T * 14) * 0.45, head: Math.sin(T * 14) * 0.12, bob: 0 };
  return { legF: s * amp, legB: -s * amp, armF: -s * 0.4 + 0.2, armB: s * 0.4 + 0.2, bob: -Math.abs(s) * 3, head: Math.sin(e.ph * 0.5) * 0.05 };
}
const EDRAW = {
  zombie(e) { const p = walkPose(e, 0.4); p.lean = -0.1; if (!e.eating) { p.armF = 1.45 + Math.sin(e.ph) * 0.1; p.armB = 1.25 - Math.sin(e.ph) * 0.1; } p.head = 0.15 + Math.sin(e.ph * 0.5) * 0.1; humanoid(SK.zombie, p); },
  hitler(e) { const p = walkPose(e, 0.35), spin = Math.sin(T * 0.9 + e.seed) > 0.75 && !e.eating;
    if (!e.eating) { p.armF = 2.55 + Math.sin(T * 3) * 0.1; p.armB = -2.55; p.bob -= 5; }
    if (spin) c.scale(Math.cos(T * 9), 1); humanoid(SK.hitler, p); },
  alien(e) { const p = walkPose(e, 0.7); p.lean = -0.12; humanoid(SK.alien, p); },
  pirate(e) { const p = walkPose(e); p.lean = Math.sin(T * 2.2 + e.seed) * 0.2; if (!e.eating) p.armF = 2.2 + Math.sin(T * 2) * 0.3; humanoid(SK.pirate, p); },
  jesus(e) { const p = walkPose(e, 0.15); p.bob = -8 + Math.sin(T * 2 + e.seed) * 4; if (!e.eating) { p.armF = 1.1; p.armB = -1.1; } humanoid(SK.jesus, p); },
  dracula(e) { const p = walkPose(e, 0.4); if (!e.eating) { p.armF = 1.4; p.armB = 1.2; } humanoid(SK.dracula, p); },
  kolobok(e) { c.save(); c.translate(0, -26 - Math.abs(Math.sin(e.ph * 0.5)) * 6); c.rotate(-e.ph * 0.6); circ(0, 0, 26, '#e8b04a', OUT); c.save(); c.globalAlpha = 0.5; circ(8, 8, 14, '#d2913a'); c.restore();
    circ(-9, -6, 6, '#fff', OUT, 2); circ(7, -6, 6, '#fff', OUT, 2); circ(-10, -6, 2.5, '#c0102a'); circ(6, -6, 2.5, '#c0102a'); line(-16, -15, -4, -11, OUT, 3); line(14, -15, 2, -11, OUT, 3);
    rr(-11, 5, 22, 10, 3, '#5a1a10', OUT, 2); for (let i = 0; i < 4; i++) poly([[-10 + i * 5.3, 5], [-5 + i * 5.3, 5], [-7.5 + i * 5.3, 10]], '#fff'); c.restore(); },
  kraken(e) { const wh = e.eating ? 9 : 2.5;
    for (let i = 0; i < 6; i++) { const bx = -50 + i * 20, a = T * wh + i * 1.1; c.beginPath(); c.moveTo(bx * 0.6, -60);
      const reach = e.eating && i < 3 ? -60 : 0; c.bezierCurveTo(bx + Math.sin(a) * 26, -40, bx - Math.sin(a) * 30 + reach, -18, bx + Math.cos(a) * 18 + reach * 1.3, -2 - Math.abs(Math.sin(a)) * 14);
      c.lineCap = 'round'; c.strokeStyle = OUT; c.lineWidth = 19; c.stroke(); c.strokeStyle = i % 2 ? '#8a3fc0' : '#a04fd8'; c.lineWidth = 13; c.stroke(); }
    const b = Math.sin(T * 2) * 4; ell(0, -112 + b, 58, 66, '#a04fd8', OUT, 4); c.save(); c.globalAlpha = 0.35; ell(14, -130 + b, 26, 30, '#c98cf0'); c.restore();
    for (const sx of [-26, 14]) { ell(sx, -92 + b, 15, 12, '#ffe14a', OUT); ell(sx - 2, -92 + b, 4, 10, '#111'); line(sx - 16, -110 + b, sx + 12, -104 + b, OUT, 5); }
    for (let i = 0; i < 5; i++) circ(-40 + i * 9, -150 + b + (i % 2) * 14, 4, '#7a2fb0'); }
};
EDRAW.tough = e => { c.scale(1.2, 1.2); EDRAW.zombie(e); };
/* Глюки с готовым артом: бумажная кукла целиком — покачивание при ходьбе, выпады при укусе. */
const FOE_SPR = { zombie: ['zombie', 150], alien: ['alien', 130], hitler: ['ballerina', 146], tough: ['tough', 180] };
const foeH = e => FOE_SPR[e.type] && has(FOE_SPR[e.type][0]) ? FOE_SPR[e.type][1] * 1.25 : ENEMY[e.type].big ? 225 : 122;
function drawFoe(e) {
  const f = FOE_SPR[e.type]; if (!f || !has(f[0])) return EDRAW[e.type](e);
  const pup = PUP[f[0]];
  if (pup && pup.ready) {
    const clip = e.stun > 0 ? 'stun' : e.eating ? 'eat' : f[0] + '_walk', pose = CLIPS[clip](e.ph * 1.6, T + e.seed);
    if (e.type === 'hitler' && !e.eating && e.stun <= 0 && Math.sin(T * 0.9 + e.seed) > 0.75) c.scale(Math.cos(T * 9), 1);
    drawPuppet(c, pup, 0, 0, f[1], pose);
    if (e.hit > 0) { c.globalCompositeOperation = 'lighter'; c.globalAlpha = 0.55; drawPuppet(c, pup, 0, 0, f[1], pose); c.globalCompositeOperation = 'source-over'; }
    return;
  }
  const s = Math.sin(e.ph);
  if (e.eating) { c.translate(-Math.abs(Math.sin(T * 9)) * 10, 0); c.rotate(-0.1 + Math.sin(T * 18) * 0.04); }
  else if (e.stun > 0) c.rotate(Math.sin(T * 5) * 0.1);
  else { c.translate(0, -Math.abs(s) * 5); c.rotate(s * 0.07 - (e.type === 'alien' ? 0.08 : 0)); }
  if (e.type === 'hitler' && !e.eating && Math.sin(T * 0.9 + e.seed) > 0.75) c.scale(Math.cos(T * 9), 1);
  spr(f[0], f[1]);
}
const DEF_SPR = { kettle: d => [d.pop > 0 ? 'kettle_pop' : d.fire < 0.07 ? 'kettle_blow' : 'kettle', 92], fridge: d => ['fridge_' + (d.hp > 2400 ? 0 : d.hp > 1200 ? 1 : 2), 128], doshik: d => d.t >= 9 ? ['doshik_2', 92] : d.t >= 4.5 ? ['doshik_1', 76] : ['doshik_0', 62] };
function drawDef(type, d) {
  const f = DEF_SPR[type] && DEF_SPR[type](d); if (!f || !has(f[0])) return DDRAW[type](d);
  shadow(type === 'fridge' ? 34 : 28); const q = 1 + Math.sin(T * 4 + (d.seed || 0)) * 0.02; c.scale(1 / q, q);
  if (d.bite > 0) c.rotate(Math.sin(T * 40) * 0.03);
  spr(f[0], f[1]);
  if (type === 'doshik' && d.t < 9) { c.beginPath(); c.arc(0, -34, 40, -Math.PI / 2, -Math.PI / 2 + d.t / 9 * 6.28); c.strokeStyle = '#ffd84a'; c.lineWidth = 5; c.stroke(); }
}
function spawnEnemy(type, row, x = W + 40) {
  const d = ENEMY[type];
  G.enemies.push({ type, row, x, y: rowY(row), hp: d.hp, max: d.hp, ph: rnd(0, 6), seed: rnd(0, 9), slow: 0, stun: 0, hit: 0, lane: rnd(3, 6), eating: false, revived: false });
}

/* ---------- оборона ---------- */
const DEF = {
  kettle: { name: 'Чайник', cost: 50, hp: 300, cd: 6, tip: 'варит проблески' },
  cat:    { name: 'Кот', cost: 100, hp: 300, cd: 6, tip: 'плюётся шерстью' },
  fridge: { name: 'Холодос', cost: 50, hp: 3600, cd: 20, tip: 'стена' },
  doshik: { name: 'Дошик', cost: 25, hp: 200, cd: 18, tip: 'мина, греется 9 с' },
  fan:    { name: 'Вентилятор', cost: 175, hp: 300, cd: 8, tip: 'морозит и тормозит' },
  micro:  { name: 'Микроволновка', cost: 150, hp: 9999, cd: 30, tip: 'взрыв 3×3' },
  tv:     { name: 'Телек', cost: 200, hp: 300, cd: 8, tip: 'двойной залп помех' }
};
const DDRAW = {
  kettle(d) { const sq = 1 + Math.sin(T * 5 + d.seed) * 0.03 + (d.pop > 0 ? 0.15 : 0); c.scale(1 / sq, sq); shadow(26);
    c.beginPath(); c.arc(0, -52, 20, Math.PI, 0); c.strokeStyle = OUT; c.lineWidth = 9; c.stroke(); c.strokeStyle = '#333'; c.lineWidth = 4; c.stroke();
    poly([[20, -34], [42, -50], [44, -42], [26, -20]], '#3f7fd0', OUT); rr(-26, -52, 52, 52, 14, '#4f95e8', OUT); rr(-26, -22, 52, 8, 0, '#fff'); rr(-10, -58, 20, 8, 3, '#2a5ca0', OUT);
    circ(-8, -34, 4, '#fff', OUT, 1.5); circ(8, -34, 4, '#fff', OUT, 1.5); circ(-7, -34, 1.8, '#111'); circ(9, -34, 1.8, '#111'); c.beginPath(); c.arc(0, -28, 6, 0.3, 2.8); c.strokeStyle = OUT; c.lineWidth = 2; c.stroke();
    for (let i = 0; i < 3; i++) { const k = (T * 0.8 + i / 3 + d.seed) % 1; c.globalAlpha = (1 - k) * 0.6; circ(44 + Math.sin(k * 8) * 4, -52 - k * 30, 4 + k * 5, '#fff'); } c.globalAlpha = 1; },
  cat(d) { shadow(26); const sh = d.kick > 0; c.save(); c.translate(-22, -14); c.rotate(Math.sin(T * 3 + d.seed) * 0.4 - 0.6); rr(-4, -34, 8, 36, 4, '#e8882f', OUT); c.restore();
    ell(-4, -24, 24, 26, '#f29a3a', OUT); ell(0, -18, 12, 16, '#ffe2bd'); ell(-12, -2, 9, 5, '#fff', OUT, 2); ell(8, -2, 9, 5, '#fff', OUT, 2);
    c.save(); c.translate(6 + (sh ? 5 : 0), -52); poly([[-18, -10], [-14, -30], [-4, -16]], '#f29a3a', OUT); poly([[6, -16], [16, -30], [18, -8]], '#f29a3a', OUT); ell(0, 0, 22, 19, '#f29a3a', OUT);
    circ(-6, -3, 5, '#d8ff7a', OUT, 1.5); circ(10, -3, 5, '#d8ff7a', OUT, 1.5); ell(-5, -3, 1.5, 4, '#111'); ell(11, -3, 1.5, 4, '#111'); poly([[1, 3], [5, 3], [3, 6]], '#ff8fa8');
    if (sh) ell(4, 11, 6, 6, '#5a1a20', OUT, 2); else { line(3, 6, 0, 10, OUT, 2); line(3, 6, 7, 10, OUT, 2); }
    line(14, 4, 28, 1, OUT, 1.5); line(14, 7, 28, 9, OUT, 1.5); c.restore(); },
  fridge(d) { shadow(32); const k = d.hp / DEF.fridge.hp; c.rotate(d.bite > 0 ? Math.sin(T * 40) * 0.03 : 0);
    rr(-30, -100, 60, 98, 8, '#eef1f5', OUT); line(-30, -66, 30, -66, OUT, 3); rr(18, -92, 5, 18, 2, '#9aa3b0', OUT, 1.5); rr(18, -58, 5, 28, 2, '#9aa3b0', OUT, 1.5);
    circ(-14, -84, 5, '#ff5a5a', OUT, 1.5); rr(-4, -90, 10, 10, 2, '#ffd84a', OUT, 1.5); line(-20, -46, -8, -42, OUT, 3); line(12, -46, 0, -42, OUT, 3); circ(-13, -38, 3, '#111'); circ(5, -38, 3, '#111'); rr(-14, -28, 22, 5, 2, '#111');
    if (k < 0.66) { line(-28, -60, -10, -52, OUT, 2); line(-10, -52, -16, -40, OUT, 2); } if (k < 0.33) { line(28, -20, 8, -14, OUT, 2); line(8, -14, 14, -4, OUT, 2); rr(-30, -12, 60, 10, 4, 'rgba(120,80,60,.35)'); } },
  doshik(d) { const armed = d.t >= 9; shadow(22); if (!armed) c.scale(0.8, 0.8);
    poly([[-22, -34], [22, -34], [16, 0], [-16, 0]], '#f4f0e6', OUT); poly([[-21, -26], [21, -26], [19, -14], [-19, -14]], '#e8452f'); txt('ДОШИК', 0, -20, 9, '#fff');
    if (armed) { ell(0, -34, 22, 7, '#f5c542', OUT); for (let i = 0; i < 5; i++) { c.beginPath(); c.arc(-14 + i * 7, -36, 5, Math.PI, 0); c.strokeStyle = '#d99a1c'; c.lineWidth = 2.5; c.stroke(); }
      for (let i = 0; i < 2; i++) { const k = (T + i / 2) % 1; c.globalAlpha = 1 - k; circ(-6 + i * 12, -44 - k * 22, 4 + k * 4, '#fff'); } c.globalAlpha = 1; }
    else { ell(0, -34, 22, 6, '#c9c9c9', OUT); c.beginPath(); c.arc(0, -20, 30, -Math.PI / 2, -Math.PI / 2 + d.t / 9 * 6.28); c.strokeStyle = '#ffd84a'; c.lineWidth = 4; c.stroke(); } },
  fan(d) { shadow(24); rr(-20, -8, 40, 8, 4, '#55607a', OUT); rr(-4, -44, 8, 40, 3, '#7c88a6', OUT); circ(4, -62, 30, 'rgba(180,230,255,.25)', OUT);
    c.save(); c.translate(4, -62); c.rotate(T * 14); for (let i = 0; i < 3; i++) { c.rotate(2.094); ell(0, -14, 8, 14, '#7fd4ff', OUT, 2); } c.restore(); circ(4, -62, 6, '#fff', OUT, 2);
    for (let i = 0; i < 2; i++) { const k = (T * 1.5 + i / 2) % 1; c.globalAlpha = 1 - k; line(36 + k * 20, -72 + i * 18, 48 + k * 20, -72 + i * 18, '#bfeaff', 3); } c.globalAlpha = 1; },
  micro(d) { const k = clamp(d.t / 1.2, 0, 1); c.translate(Math.sin(T * 60) * 3 * k, 0); c.scale(1 + k * 0.15, 1 + k * 0.15); shadow(34);
    rr(-36, -52, 72, 50, 6, '#d9dde3', OUT); rr(-30, -46, 44, 38, 4, `rgb(${60 + k * 195},${40 + k * 80},30)`, OUT); rr(18, -46, 13, 38, 3, '#aab1bd', OUT, 2); circ(24.5, -16, 4, '#444', OUT, 1.5);
    c.globalAlpha = 0.5 + k * 0.5; circ(-8, -27, 9 + Math.sin(T * 30) * 3, '#ffd84a'); c.globalAlpha = 1; txt('!', -8, -27, 18, '#b0162c'); },
  tv(d) { shadow(32); line(-8, -70, -22, -96, OUT, 3); line(8, -70, 22, -96, OUT, 3); circ(-22, -96, 3, '#ff5a5a'); circ(22, -96, 3, '#ff5a5a');
    rr(-34, -72, 68, 60, 8, '#8a5a3a', OUT); rr(-28, -66, 44, 46, 6, '#1a2030', OUT);
    c.save(); c.beginPath(); c.roundRect(-28, -66, 44, 46, 6); c.clip(); for (let i = 0; i < 26; i++) { c.fillStyle = `rgba(255,255,255,${Math.random() * 0.5})`; c.fillRect(-28 + Math.random() * 44, -66 + Math.random() * 46, 6, 2); }
    if (d.kick > 0) { c.fillStyle = 'rgba(255,255,160,.7)'; c.fillRect(-28, -66, 44, 46); } c.restore();
    circ(-12, -48, 4, '#7dffb0'); circ(2, -48, 4, '#7dffb0'); rr(-12, -36, 14, 4, 2, '#7dffb0'); circ(24, -58, 4, '#333', OUT, 1.5); circ(24, -44, 4, '#333', OUT, 1.5); rr(-26, -12, 10, 12, 2, '#5a3a22', OUT, 2); rr(16, -12, 10, 12, 2, '#5a3a22', OUT, 2); }
};

/* ---------- уровни ---------- */
const cardsFor = L => ['kettle', 'cat', 'fridge', 'doshik'].concat(L >= 2 ? ['fan'] : [], L >= 3 ? ['micro'] : [], L >= 4 ? ['tv'] : []);
const poolFor = L => ['zombie', 'alien'].concat(L >= 2 ? ['hitler', 'kolobok'] : [], L >= 3 ? ['tough', 'pirate'] : [], L >= 4 ? ['jesus', 'dracula'] : []);
function makeSchedule(L, t0 = 0) {
  const pool = poolFor(L), total = 14 + L * 7, list = []; let t = t0 + (t0 ? 6 : 20);
  const choose = f => { const ws = pool.map(k => ENEMY[k].w * (ENEMY[k].tough ? 0.3 + f * 1.7 : 1)); let r = Math.random() * ws.reduce((a, b) => a + b, 0); for (let i = 0; i < pool.length; i++) { r -= ws[i]; if (r <= 0) return pool[i]; } return pool[0]; };
  for (let i = 0; i < total; i++) {
    const f = i / total; list.push({ t, type: choose(f), row: Math.floor(rnd(0, ROWS)) }); t += (9 - 6.5 * f) * rnd(0.7, 1.3) * (i < 3 ? 1.5 : 1) / (1 + Math.max(0, L - 5) * 0.15);
    if (i === Math.floor(total / 2) || i === total - 1) { t += 4; list.push({ t, wave: i === total - 1 ? 'ФИНАЛЬНЫЙ ПРИХОД!' : 'НАКРЫВАЕТ ВОЛНОЙ!' }); for (let k = 0; k < 3 + L; k++) list.push({ t: t + rnd(0.5, 5), type: choose(0.8), row: k % ROWS }); t += 9; }
  }
  if (L >= 5) list.push({ t: t - 6, type: 'kraken', row: 2 });
  return list.sort((a, b) => a.t - b.t);
}
function newGame(L) {
  const endless = L > 5;
  G = { L, endless, round: 0, t: 0, sun: endless ? 250 : 150, grid: Array.from({ length: ROWS }, () => Array(COLS).fill(null)), enemies: [], shots: [], suns: [], fx: [],
    roomba: Array.from({ length: ROWS }, () => ({ x: 226, on: false, gone: false })), sched: makeSchedule(Math.min(L, 5)), si: 0, cd: {}, cards: cardsFor(L), sel: null, sky: 5,
    ab: [8, 8], shake: 0, banner: null, bubble: null, bubT: 4, kills: 0, over: null, paused: false };
  G.spawnTotal = G.sched.length; screen = 'play';
}
const LEVEL_NAME = L => L > 5 ? 'Бесконечный приход' : `Ночь ${L}`;

/* ---------- эффекты ---------- */
function puff(x, y, n = 10, hue = null) { for (let i = 0; i < n; i++) G.fx.push({ k: 'p', x, y, vx: rnd(-90, 90), vy: rnd(-140, 20), life: rnd(0.4, 0.9), max: 0.9, r: rnd(5, 13), col: `hsl(${hue === null ? rnd(0, 360) : hue + rnd(-20, 20)},90%,65%)` }); }
function floatTxt(s, x, y, col = '#fff', size = 22) { G.fx.push({ k: 't', s, x, y, vx: 0, vy: -40, life: 1.2, max: 1.2, col, size }); }
function say(who, s) { G.bubble = { who, s, life: 3 }; }

/* ---------- логика ---------- */
function damage(e, dmg) {
  e.hp -= dmg; e.hit = 0.12;
  if (e.hp > 0) return;
  if (e.type === 'jesus' && !e.revived) { e.revived = true; e.hp = e.max * 0.6; e.stun = 1.6; floatTxt('ВОСКРЕС!', e.x, e.y - 120, '#ffe14a', 26); puff(e.x, e.y - 50, 14, 50); sfx(520, 0.5, 'sine', 0.06, 500); return; }
  e.dead = true; G.kills++; puff(e.x, e.y - 50, ENEMY[e.type].big ? 40 : 5); G.fx.push({ k: 'cloud', x: e.x, y: e.y, life: 0.5, max: 0.5 }); sfx(180, 0.18, 'sawtooth', 0.04, -120);
  if (ENEMY[e.type].big) { G.shake = 0.6; floatTxt('КРАКЕН ОТПУСТИЛ', e.x, e.y - 160, '#d9a0ff', 30); }
}
function explode(x, y, row, rad, rows, dmg) { G.shake = 0.35; puff(x, y - 30, 26, 30); sfx(90, 0.4, 'sawtooth', 0.09, -60); G.fx.push({ k: 'boom', x, y: y - 30, life: 0.35, max: 0.35, r: rad });
  for (const e of G.enemies) if (Math.abs(e.row - row) <= rows && Math.abs(e.x - x) < rad) damage(e, dmg); }
function place(type, r, col) {
  const d = DEF[type]; if (G.sun < d.cost || (G.cd[type] || 0) > 0 || G.grid[r][col]) { sfx(120, 0.1, 'square', 0.04); return; }
  G.sun -= d.cost; G.cd[type] = d.cd; G.grid[r][col] = { type, r, col, x: colX(col), hp: d.hp, t: 0, fire: rnd(0.3, 1), seed: rnd(0, 9), kick: 0, pop: 0, bite: 0 };
  puff(colX(col), rowY(r) - 10, 6, 280); sfx(440, 0.08, 'triangle', 0.06, 200); G.sel = null;
}
function ability(i) {
  if (G.ab[i] > 0 || G.over) return;
  if (i === 0) { G.ab[0] = 40; G.shake = 0.5; say(0, 'ААААААА!!!'); sfx(300, 0.7, 'sawtooth', 0.08, 500); for (const e of G.enemies) { e.x += ENEMY[e.type].big ? 30 : 90; e.stun = 3; } const o = toField({ x: PORCH[0].x, y: PORCH[0].y - 110 }); G.fx.push({ k: 'wave', x: o.x, y: o.y, life: 0.7, max: 0.7 }); }
  else { const e = G.enemies.filter(e => e.x < W).sort((a, b) => b.hp - a.hp)[0]; if (!e) { say(1, 'Не в кого кидать, братан'); return; }
    G.ab[1] = 25; say(1, 'Тапок судьбы!'); sfx(700, 0.25, 'square', 0.05, -500); const o = toField({ x: PORCH[1].x + 30, y: PORCH[1].y - 140 }); G.fx.push({ k: 'tapok', x: o.x, y: o.y, tx: e.x, ty: e.y - 50, e, life: 0.45, max: 0.45, wait: 0.32 }); }
}
function update(dt) {
  if (G.over || G.paused) return;
  G.t += dt; G.shake = Math.max(0, G.shake - dt);
  for (const k in G.cd) G.cd[k] = Math.max(0, G.cd[k] - dt);
  G.ab[0] = Math.max(0, G.ab[0] - dt); G.ab[1] = Math.max(0, G.ab[1] - dt);
  // спавн
  while (G.si < G.sched.length && G.sched[G.si].t <= G.t) { const s = G.sched[G.si++]; if (s.wave) { G.banner = { s: s.wave, life: 3 }; sfx(110, 0.8, 'sawtooth', 0.07, 80); } else spawnEnemy(s.type, s.row); }
  if (G.si >= G.sched.length) {
    if (G.endless) { G.round++; G.sched = makeSchedule(5 + G.round, G.t); G.si = 0; G.spawnTotal = G.sched.length; G.banner = { s: `КРУГ ${G.round + 1}`, life: 3 }; }
    else if (!G.enemies.length) { G.over = 'win'; if (G.L >= save.level) { save.level = G.L + 1; persist(); } sfx(523, 0.15, 'triangle', 0.08); setTimeout(() => sfx(784, 0.3, 'triangle', 0.08), 150); return; }
  }
  // проблески с потолка
  G.sky -= dt; if (G.sky <= 0) { G.sky = rnd(7, 10); G.suns.push({ x: rnd(GX + 40, W - 80), y: GY - 30, ty: rnd(GY + 80, H - 60), life: 12 }); }
  for (const s of G.suns) { if (s.y < s.ty) s.y = Math.min(s.ty, s.y + 70 * dt); s.life -= dt; const fm = toField(mouse); if (Math.hypot(fm.x - s.x, fm.y - s.y) < 40 || (COARSE && s.life < 8.5)) collect(s); }
  G.suns = G.suns.filter(s => s.life > 0 && !s.got);
  // оборона
  for (let r = 0; r < ROWS; r++) for (let col = 0; col < COLS; col++) {
    const d = G.grid[r][col]; if (!d) continue; d.t += dt; d.kick -= dt; d.pop -= dt; d.bite -= dt;
    const y = rowY(r), ahead = G.enemies.some(e => e.row === r && e.x > d.x - 20 && e.x < W + 10);
    if (d.type === 'kettle') { d.fire -= dt / 18; if (d.fire <= 0) { d.fire = 1; d.pop = 0.3; G.suns.push({ x: d.x + rnd(-20, 20), y: y - 60, ty: y - 20, life: 12 }); sfx(880, 0.12, 'sine', 0.04, 300); } }
    else if (d.type === 'cat' || d.type === 'fan' || d.type === 'tv') { d.fire -= dt; if (d.fire <= 0 && ahead) { d.fire = 1.45; d.kick = 0.18;
      const mk = (dx) => G.shots.push({ k: d.type, x: d.x + 30 + dx, y: y - 52, row: r, dmg: 20 }); mk(0); if (d.type === 'tv') mk(-28); sfx(d.type === 'cat' ? 600 : 900, 0.05, 'square', 0.02, -200); } }
    else if (d.type === 'doshik') { if (d.t >= 9) { const e = G.enemies.find(e => e.row === r && e.x - d.x < 48 && e.x - d.x > -40); if (e) { explode(d.x, y, r, 95, 0, 1800); floatTxt('ЛАПША!', d.x, y - 70, '#ffd84a'); G.grid[r][col] = null; } } }
    else if (d.type === 'micro') { if (d.t >= 1.2) { explode(d.x, y, r, 175, 1, 1800); floatTxt('ДЗЫНЬ!', d.x, y - 90, '#ff8a4a', 30); G.grid[r][col] = null; } }
    if (d.hp <= 0 && G.grid[r][col]) { G.grid[r][col] = null; puff(d.x, y - 30, 10, 0); sfx(140, 0.2, 'square', 0.05, -80); }
  }
  // снаряды
  for (const s of G.shots) { s.x += 400 * dt; if (s.x > W + 30) s.dead = true;
    for (const e of G.enemies) { const big = ENEMY[e.type].big; if (!e.dead && e.row === s.row && s.x > e.x - (big ? 50 : 22) && s.x < e.x + 34) { damage(e, s.dmg); if (s.k === 'fan') e.slow = 4; s.dead = true; G.fx.push({ k: 'p', x: s.x, y: s.y, vx: 0, vy: 0, life: 0.15, max: 0.15, r: 12, col: s.k === 'fan' ? '#bfeaff' : s.k === 'tv' ? '#ffffa0' : '#c9a57a' }); break; } } }
  G.shots = G.shots.filter(s => !s.dead);
  // глюки
  for (const e of G.enemies) {
    const d = ENEMY[e.type]; e.slow -= dt; e.stun -= dt; e.hit -= dt; e.y += (rowY(e.row) - e.y) * Math.min(1, dt * 5);
    if (e.stun > 0) { e.eating = false; continue; }
    const reach = d.big ? 85 : 50; let tgt = null;
    for (let col = 0; col < COLS; col++) { const p = G.grid[e.row][col]; if (p && e.x - p.x < reach && e.x - p.x > -25 && !(p.type === 'doshik' && p.t >= 9) && p.type !== 'micro') tgt = p; }
    e.eating = !!tgt; const k = e.slow > 0 ? 0.5 : 1;
    if (tgt) { tgt.hp -= d.dps * dt * k; tgt.bite = 0.1; if (e.type === 'dracula') e.hp = Math.min(e.max, e.hp + 35 * dt); if (Math.random() < dt * 3) sfx(rnd(140, 200), 0.04, 'square', 0.015); }
    else { e.x -= d.speed * dt * k; e.ph += dt * d.speed * 0.33 * k;
      if (e.type === 'pirate') { e.lane -= dt; if (e.lane <= 0) { e.lane = rnd(4, 7); const nr = clamp(e.row + pick([-1, 1]), 0, ROWS - 1); if (nr !== e.row && e.x < W - 60) { e.row = nr; floatTxt('ик!', e.x, e.y - 110, '#9fe0a8', 18); } } } }
    const rb = G.roomba[e.row];
    if (e.x < GX - 10 && !rb.gone && !rb.on) { rb.on = true; sfx(200, 0.6, 'sawtooth', 0.06, 400); }
    if (e.x < 175) { G.over = 'lose'; sfx(200, 0.9, 'sawtooth', 0.09, -150); if (G.endless && G.kills > save.best) { save.best = G.kills; persist(); } }
  }
  for (const rb of G.roomba) if (rb.on && !rb.gone) { rb.x += 520 * dt; const r = G.roomba.indexOf(rb); for (const e of G.enemies) if (e.row === r && Math.abs(e.x - rb.x) < 50 && !e.dead) { if (ENEMY[e.type].big) { if (!e.vac) { e.vac = 1; damage(e, 1200); } } else { e.revived = true; damage(e, 99999); } } if (rb.x > W + 60) rb.gone = true; }
  G.enemies = G.enemies.filter(e => !e.dead);
  // эффекты
  for (const f of G.fx) { if (f.wait > 0) { f.wait -= dt; continue; } f.life -= dt; if (f.k === 'p' || f.k === 't') { f.x += f.vx * dt; f.y += f.vy * dt; if (f.k === 'p') f.vy += 200 * dt; }
    if (f.k === 'tapok' && f.life <= 0 && !f.e.dead) { damage(f.e, 600); floatTxt('ШЛЁП!', f.tx, f.ty - 40, '#ff8fcb', 28); G.shake = 0.2; sfx(150, 0.15, 'square', 0.08, -80); } }
  G.fx = G.fx.filter(f => f.life > 0);
  if (G.banner && (G.banner.life -= dt) <= 0) G.banner = null;
  if (G.bubble && (G.bubble.life -= dt) <= 0) G.bubble = null;
  G.bubT -= dt; if (G.bubT <= 0 && !G.bubble) { G.bubT = rnd(9, 15); say(Math.random() < 0.5 ? 0 : 1, pick(PHRASES)); }
}
const PHRASES = ['Братан, ты тоже это видишь?', 'Это что, балерина?!', 'Я больше никогда...', 'Кот, фас!', 'Надо было просто чай пить', 'Кто впустил кракена?', 'Мам, я в порядке', 'Оно ненастоящее. Наверное.', 'Ставь холодос, холодос ставь!', 'Чайник — наше всё'];
function collect(s) { if (s.got) return; s.got = true; G.sun += 25; sfx(1100, 0.08, 'sine', 0.05, 400); G.fx.push({ k: 'fly', x: s.x, y: s.y, life: 0.4, max: 0.4 }); }

/* ---------- отрисовка сцены ---------- */
function drawSun(x, y, r = 22, a = 1) { c.save(); c.globalAlpha = a; c.translate(x, y);
  if (has('bulb')) { const g = c.createRadialGradient(0, 0, 2, 0, 0, r * 2); g.addColorStop(0, 'rgba(255,240,140,.85)'); g.addColorStop(1, 'rgba(255,240,140,0)'); circ(0, 0, r * 2, g); c.rotate(Math.sin(T * 2 + x) * 0.12); spr('bulb', r * 2.5, 0.5, 0.5); c.restore(); return; }
  const g = c.createRadialGradient(0, 0, 2, 0, 0, r * 1.7); g.addColorStop(0, 'rgba(255,240,140,.9)'); g.addColorStop(1, 'rgba(255,240,140,0)'); circ(0, 0, r * 1.7, g);
  c.rotate(Math.sin(T * 2) * 0.15); circ(0, -3, r * 0.72, '#ffe14a', OUT, 2.5); rr(-r * 0.3, r * 0.45, r * 0.6, r * 0.42, 3, '#b8bcc8', OUT, 2); line(-4, -2, 0, 4, '#fff7b0', 2); line(4, -2, 0, 4, '#fff7b0', 2); c.restore(); }
function drawBg() {
  if (has('bg')) c.drawImage(IMG.bg, 0, 0, W, H); else { c.fillStyle = '#241536'; c.fillRect(0, 0, W, H); c.fillStyle = '#4a4034'; c.fillRect(FX, FY, COLS * CELL * K, ROWS * CELL * K); }
  // живой неоновый портал справа
  c.save(); c.translate(W - 60, 370); c.globalCompositeOperation = 'lighter'; for (let i = 0; i < 6; i++) { c.rotate(T * 0.3 + i); ell(0, 0, 40 + i * 20, 170 - i * 10, null, `hsla(${(T * 40 + i * 50) % 360},95%,60%,.16)`, 8); } c.restore();
}
/* Клетки поля — еле заметная шахматка поверх двора. Рисуется уже в полевых координатах. */
function drawCells() {
  for (let r = 0; r < ROWS; r++) for (let col = 0; col < COLS; col++) { c.fillStyle = (r + col) % 2 ? 'rgba(255,240,200,.05)' : 'rgba(20,10,35,.09)'; c.fillRect(GX + col * CELL, GY + r * CELL, CELL, CELL); }
  c.strokeStyle = 'rgba(255,240,200,.14)'; c.lineWidth = 2; c.strokeRect(GX, GY, COLS * CELL, ROWS * CELL);
}
function drawFriend(i) {
  const P = PORCH[i], panic = G && G.over === 'lose', act = G && (i ? G.ab[1] > 24 : G.ab[0] > 38.5), t = T * (panic ? 16 : 2) + i * 2;
  c.save(); c.translate(P.x + (panic ? Math.sin(t) * 3 : 0), P.y); ell(0, 2, 42, 9, 'rgba(0,0,0,.35)');
  const pup = PUP[P.spr], who0 = i ? 'dimon' : 'vovan', since = (i ? 25 : 40) - (G ? G.ab[i] : 99), win = G && G.over === 'win';
  if (pup && pup.ready) {
    let clip = 'idle', face = null, u = 0;
    if (panic) { clip = 'panic'; face = 'scared'; } else if (win) { clip = 'cheer'; face = 'laugh'; }
    else if (G && i === 0 && since < 1.5) { clip = 'yell'; face = 'yell'; }
    else if (G && i === 1 && since < 0.7) { clip = 'throw'; u = since / 0.7; face = u > 0.35 ? 'yell' : null; }
    else if (G && i === 1 && since < 1.6) face = 'laugh';
    const pose = CLIPS[clip](0, T + i * 2, u); if (face && has(`${who0}_${face}`)) { pose.face = IMG[`${who0}_${face}`]; pose.faceFit = FACE_FIT[who0]; }
    drawPuppet(c, pup, 0, 0, P.h, pose);
  }
  else if (has(P.spr)) { const q = 1 + Math.sin(t) * 0.012 + (act ? 0.06 : 0); c.translate(0, act ? -Math.abs(Math.sin(T * 14)) * 10 : 0); c.rotate(act ? (i ? 0.12 : -0.08) : Math.sin(t * 0.5) * 0.012); c.scale(1 / q, q); spr(P.spr, P.h); }
  else { c.scale(-1.3, 1.3); humanoid(i ? SK.dimon : SK.vovan, { armF: 0.25, armB: -0.2, legF: 0.12, legB: -0.12 }); }
  c.restore();
  if (!G) return;
  const cd = G.ab[i], max = i ? 25 : 40, bx = 14, by = 606 + i * 54, ready = cd <= 0, who = i ? 'dimon' : 'vovan', face = `${who}_${panic ? 'scared' : act ? (i ? 'laugh' : 'yell') : 'neutral'}`;
  rr(bx, by, 262, 46, 23, ready ? (i ? '#7a4fd0' : '#3fa35a') : '#3a2f4a', OUT);
  if (!ready) rr(bx, by, 262 * (1 - cd / max), 46, 23, 'rgba(255,255,255,.18)');
  if (has(face)) { c.save(); c.translate(bx + 30, by + 44); spr(face, 60); c.restore(); }
  txt(i ? 'Димон: тапок судьбы' : 'Вован: ор на всю хату', bx + 158, by + 24, 15, ready ? '#fff' : '#a99cc0');
  btns.push({ x: bx, y: by - 8, w: 262, h: 56, fn: () => ability(i) }); btns.push({ x: P.x - 45, y: P.y - P.h, w: 90, h: P.h, fn: () => ability(i) });
}
function drawEnemy(e) {
  c.save(); c.translate(e.x + (e.hit > 0 ? rnd(-3, 3) : 0), e.y);
  if (e.slow > 0) ell(0, 2, 34, 9, 'rgba(150,220,255,.55)'); else shadow(ENEMY[e.type].big ? 60 : 26);
  const H = foeH(e); c.save(); c.scale(1.25, 1.25); c.globalAlpha = clamp((W + 30 - e.x) / 60, 0, 1); drawFoe(e); c.restore();
  if (e.stun > 0) for (let i = 0; i < 3; i++) { const a = T * 6 + i * 2.1; txt('★', Math.cos(a) * 20, -H - 8 + Math.sin(a) * 6, 16, '#ffe14a'); }
  if (e.hp < e.max) { const w = ENEMY[e.type].big ? 110 : 46, y = -H - 12; rr(-w / 2, y, w, 7, 3, '#1b1030'); rr(-w / 2 + 1, y + 1, (w - 2) * clamp(e.hp / e.max, 0, 1), 5, 2, e.revived ? '#ffe14a' : '#ff5a8a'); }
  c.restore();
}
function drawScene() {
  c.save(); if (G.shake > 0 && !RM) c.translate(rnd(-6, 6) * G.shake * 2, rnd(-6, 6) * G.shake * 2);
  drawBg(); drawFriend(0); drawFriend(1);
  c.save(); c.translate(FX - GX * K, FY - GY * K); c.scale(K, K); drawCells();
  // подсветка клетки
  const fm = toField(mouse), cell = cellAt(fm.x, fm.y);
  if (cell && G.sel && !G.over) { c.fillStyle = G.sel === 'broom' ? 'rgba(255,90,90,.3)' : (G.grid[cell.r][cell.col] ? 'rgba(255,90,90,.25)' : 'rgba(255,255,255,.22)'); c.fillRect(GX + cell.col * CELL, GY + cell.r * CELL, CELL, CELL);
    if (G.sel !== 'broom' && !G.grid[cell.r][cell.col]) { c.save(); c.globalAlpha = 0.5; c.translate(colX(cell.col), rowY(cell.r)); drawDef(G.sel, { t: 0, seed: 0, hp: 1e9, fire: 1 }); c.restore(); c.globalAlpha = 1; } }
  for (let r = 0; r < ROWS; r++) {
    const rb = G.roomba[r]; if (!rb.gone && has('roomba')) { c.save(); c.translate(rb.x, rowY(r) + 4); spr(rb.on ? 'roomba_on' : 'roomba', rb.on ? 46 : 38, rb.on ? 0.62 : 0.5); c.restore(); }
    else if (!rb.gone) { c.save(); c.translate(rb.x, rowY(r) - 4); ell(0, 0, 26, 12, '#2a2a33', OUT); ell(0, -4, 26, 12, '#e9e9ee', OUT); circ(0, -5, 5, rb.on ? '#ff5a5a' : '#7dffb0', OUT, 2); if (rb.on) for (let i = 0; i < 3; i++) line(-30 - i * 14, -10 + i * 6, -44 - i * 14, -10 + i * 6, '#fff', 3); c.restore(); }
    for (let col = 0; col < COLS; col++) { const d = G.grid[r][col]; if (d) { c.save(); c.translate(d.x, rowY(r)); if (d.bite > 0) c.translate(rnd(-2, 2), 0); drawDef(d.type, d); c.restore(); } }
    for (const e of G.enemies) if (e.row === r) drawEnemy(e);
    for (const s of G.shots) if (s.row === r) { c.save(); c.translate(s.x, s.y); c.rotate(T * 10);
      if (s.k === 'cat') { circ(0, 0, 10, '#c9a57a', OUT, 2); line(-6, -2, 4, 5, '#8a6a45', 2); line(-2, -7, 6, -1, '#8a6a45', 2); }
      else if (s.k === 'fan') { for (let i = 0; i < 3; i++) { c.rotate(1.047); line(-11, 0, 11, 0, '#dff6ff', 4); } circ(0, 0, 4, '#7fd4ff'); }
      else { c.rotate(-T * 10); poly([[-12, -3], [-2, -8], [0, -1], [12, -5], [2, 8], [0, 1]], '#ffffa0', OUT, 2); } c.restore(); }
  }
  for (const s of G.suns) drawSun(s.x, s.y, 22, s.life < 2 ? 0.4 + Math.abs(Math.sin(T * 10)) * 0.6 : 1);
  for (const f of G.fx) { if (f.wait > 0) continue; const k = f.life / f.max;
    if (f.k === 'p') { c.globalAlpha = k; circ(f.x, f.y, f.r * (0.4 + k), f.col); c.globalAlpha = 1; }
    else if (f.k === 't') { c.globalAlpha = Math.min(1, k * 2); txt(f.s, f.x, f.y, f.size, f.col, 'center', DISPLAY, OUT, 400); c.globalAlpha = 1; }
    else if (f.k === 'boom') { const n = 'boom_' + Math.min(4, Math.floor((1 - k) * 5)); if (has(n)) { c.save(); c.globalAlpha = Math.min(1, k * 3); c.translate(f.x, f.y + f.r * 0.45); spr(n, f.r * (0.9 + (1 - k) * 0.9)); c.restore(); } else { c.globalAlpha = k; circ(f.x, f.y, f.r * (1.1 - k * 0.6), '#fff1a8', '#ff8a4a', 10); c.globalAlpha = 1; } }
    else if (f.k === 'cloud') { const n = 'puff_' + Math.min(3, Math.floor((1 - k) * 4)); if (has(n)) { c.save(); c.translate(f.x, f.y - (1 - k) * 20); spr(n, 150); c.restore(); } }
    else if (f.k === 'wave') { c.globalAlpha = k; for (let i = 0; i < 3; i++) { c.beginPath(); c.arc(f.x, f.y, (1 - k) * 1300 + i * 50, -0.9, 0.9); c.strokeStyle = '#fff'; c.lineWidth = 8; c.stroke(); } c.globalAlpha = 1; }
    else if (f.k === 'fly') { const to = toField({ x: 52, y: 48 }); drawSun(f.x + (to.x - f.x) * (1 - k), f.y + (to.y - f.y) * (1 - k), 18, k); }
    else if (f.k === 'tapok') { const p = 1 - k, x = f.x + (f.tx - f.x) * p, y = f.y + (f.ty - f.y) * p - Math.sin(p * 3.14) * 120; c.save(); c.translate(x, y); c.rotate(T * 25); if (has('slipper')) spr('slipper', 34, 0.5, 0.5); else { rr(-20, -9, 40, 18, 9, '#ff8fcb', OUT); rr(-2, -9, 20, 18, 8, '#ff5aa8', OUT, 2); } c.restore(); } }
  c.restore();
  if (G.bubble) { const b = G.bubble, y = PORCH[b.who].y - PORCH[b.who].h - 34; c.font = `700 16px ${BODY}`; const w = c.measureText(b.s).width + 28; c.globalAlpha = Math.min(1, b.life * 2);
    const bx = Math.max(12, PORCH[b.who].x - 60); rr(bx, y - 20, w, 40, 14, '#fff', OUT); poly([[bx + 40, y + 18], [bx + 60, y + 18], [bx + 52, y + 36]], '#fff', OUT); rr(bx + 38, y + 10, 26, 9, 0, '#fff'); txt(b.s, bx + 14, y + 1, 16, OUT, 'left'); c.globalAlpha = 1; }
  c.restore();
  // искры из портала и виньетка
  for (let i = 0; i < 14; i++) { const k = (T * 0.12 + i / 14) % 1, x = W - 30 - k * 260 - Math.sin(i * 7) * 30, y = 300 + Math.sin(i * 3.7) * 190 + Math.sin(T * 1.3 + i) * 18; c.globalAlpha = (1 - k) * 0.7; circ(x, y, 2 + (i % 3), `hsl(${(i * 47 + T * 60) % 360},95%,70%)`); } c.globalAlpha = 1;
  const vg = c.createRadialGradient(W / 2, H / 2, H * 0.45, W / 2, H / 2, H * 0.95); vg.addColorStop(0, 'rgba(10,4,20,0)'); vg.addColorStop(1, 'rgba(10,4,20,.55)'); c.fillStyle = vg; c.fillRect(0, 0, W, H);
  drawHud();
  if (G.banner) { const k = Math.min(1, G.banner.life, (3 - G.banner.life) * 3); c.globalAlpha = k; txt(G.banner.s, FX + COLS * CELL * K / 2, 430, 78, '#ff5ad1', 'center', DISPLAY, OUT, 400); c.globalAlpha = 1; }
}
function drawHud() {
  rr(6, 6, W - 12, 128, 16, 'rgba(18,9,30,.86)', '#6a4a9a', 3);
  drawSun(52, 48, 24); rr(16, 86, 128, 36, 10, '#12091e', '#6a4a9a', 2); txt(Math.floor(G.sun), 80, 105, 24, '#ffe14a');
  G.cards.forEach((k, i) => { const d = DEF[k], x = 158 + i * 100, cd = G.cd[k] || 0, ok = G.sun >= d.cost && cd <= 0, sel = G.sel === k;
    rr(x, 14, 94, 112, 10, sel ? '#8a66d0' : '#3a2757', sel ? '#ffe14a' : '#6a4a9a', sel ? 4 : 2);
    c.save(); c.beginPath(); c.rect(x, 14, 94, 76); c.clip(); c.translate(x + 47, 82); c.scale(0.62, 0.62); drawDef(k, { t: k === 'doshik' ? 9 : 0, seed: i, hp: 1e9, fire: 1 }); c.restore();
    txt(d.name, x + 47, 96, 11.5, '#e7dcff'); rr(x + 22, 104, 50, 18, 9, '#12091e'); txt(d.cost, x + 47, 114, 13, ok || cd > 0 ? '#ffe14a' : '#ff6a6a');
    if (!ok) rr(x, 14, 94, 112, 10, 'rgba(10,5,20,.55)'); if (cd > 0) rr(x, 14, 94, 112 * cd / d.cd, 10, 'rgba(10,5,20,.6)');
    btns.push({ x, y: 14, w: 94, h: 112, fn: () => { G.sel = sel ? null : k; sfx(500, 0.04, 'square', 0.03); }, tip: `${d.name}: ${d.tip}` }); });
  const bx = 158 + 7 * 100 + 8, bs = G.sel === 'broom'; rr(bx, 14, 76, 112, 10, bs ? '#b0483e' : '#3a2757', bs ? '#ffe14a' : '#6a4a9a', bs ? 4 : 2);
  c.save(); c.translate(bx + 38, 60); c.rotate(0.5); rr(-3, -38, 6, 50, 3, '#b98a52', OUT, 2); poly([[-14, 10], [14, 10], [20, 36], [-20, 36]], '#e8c15a', OUT, 2); c.restore(); txt('Веник', bx + 38, 108, 12, '#e7dcff');
  btns.push({ x: bx, y: 14, w: 76, h: 112, fn: () => G.sel = bs ? null : 'broom', tip: 'Веник: убрать предмет' });
  const px = 960, pw = 220, prog = clamp(G.si / G.spawnTotal, 0, 1);
  txt(LEVEL_NAME(G.L) + (G.endless ? ` · ${G.kills}` : ''), px + pw / 2, 40, 18, '#e7dcff'); rr(px, 66, pw, 20, 10, '#12091e', '#6a4a9a', 2); rr(px + 3, 69, (pw - 6) * prog, 14, 7, '#ff5ad1');
  txt('приход', px + pw / 2, 104, 12, '#a99cc0', 'center', BODY, null, 500);
  button(1200, 14, 66, 52, save.sound ? '♪' : '×♪', () => { save.sound = !save.sound; persist(); }, '#3a2757', 22);
  button(1200, 74, 66, 52, 'II', () => G.paused = true, '#3a2757', 22);
  const tip = btns.find(b => b.tip && hit(b, mouse.x, mouse.y)); if (tip && !G.over && !G.paused) { c.font = `600 15px ${BODY}`; const w = c.measureText(tip.tip).width + 24, x = clamp(mouse.x - w / 2, 10, W - w - 10); rr(x, 140, w, 30, 8, '#12091e', '#ffe14a', 2); txt(tip.tip, x + w / 2, 156, 15, '#fff', 'center', BODY, null, 600); }
}
function button(x, y, w, h, label, fn, col = '#ff5ad1', size = 26) {
  const hov = hit({ x, y, w, h }, mouse.x, mouse.y); rr(x, y + 4, w, h, 14, OUT); rr(x, y + (hov ? 2 : 0), w, h, 14, col, OUT); txt(label, x + w / 2, y + h / 2 + (hov ? 3 : 1), size, '#fff'); btns.push({ x, y, w, h, fn });
}
function overlay(title, sub, col, items) {
  c.fillStyle = 'rgba(12,5,22,.78)'; c.fillRect(0, 0, W, H); btns = [];
  txt(title, W / 2, 230, 96, col, 'center', DISPLAY, OUT, 400); txt(sub, W / 2, 320, 24, '#e7dcff', 'center', BODY, null, 500);
  items.forEach((it, i) => button(W / 2 - 180, 380 + i * 84, 360, 64, it[0], it[1], i ? '#4a3566' : '#ff5ad1'));
}
function drawMenu() {
  if (has('cover')) c.drawImage(IMG.cover, 0, 0, W, H); else drawBg();
  const g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, 'rgba(12,5,22,.82)'); g.addColorStop(0.32, 'rgba(12,5,22,.15)'); g.addColorStop(0.62, 'rgba(12,5,22,.1)'); g.addColorStop(1, 'rgba(12,5,22,.9)'); c.fillStyle = g; c.fillRect(0, 0, W, H);
  txt('ГЛЮКИ', W / 2 - 150, 92, 120, '#ff5ad1', 'center', DISPLAY, OUT, 400); txt('vs КОРЕША', W / 2 + 250, 108, 62, '#7dffb0', 'center', DISPLAY, OUT, 400);
  const L = Math.min(save.level, 6);
  button(W / 2 - 190, 560, 380, 70, L > 5 ? 'Бесконечный приход' : `Играть · Ночь ${L}`, () => newGame(L), '#ff5ad1', 28);
  if (save.level > 1) { const n = Math.min(save.level, 6), x0 = W - 30 - n * 64; for (let i = 1; i <= n; i++) button(x0 + (i - 1) * 64, 570, 56, 50, i > 5 ? '∞' : i, () => newGame(i), '#4a3566', 22); }
  txt('Сидели, смотрели телек. Во дворе загремело. Вышли — а там глюки.', W / 2, 664, 19, '#efe6ff', 'center', BODY, null, 500);
  txt('Чайник варит лампочки → на них ставь оборону → глюки не должны дойти до крыльца.', W / 2, 692, 15, '#cbbde6', 'center', BODY, null, 500);
  if (save.best) txt(`Рекорд бесконечного прихода: ${save.best}`, 150, 596, 15, '#ffe14a', 'center', BODY, null, 500);
}

/* ---------- ввод ---------- */
const hit = (b, x, y) => x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h;
function cellAt(x, y) { const col = Math.floor((x - GX) / CELL), r = Math.floor((y - GY) / CELL); return col >= 0 && col < COLS && r >= 0 && r < ROWS ? { r, col } : null; }
/* Раскладка: канвас вписывается в окно; на телефоне в портретной ориентации разворачивается на 90°, чтобы занять весь экран. */
let VIEW = { w: 1280, h: 720, rot: false };
function fit() {
  const vw = innerWidth, vh = innerHeight, rot = vh > vw && vw < 720, small = Math.min(vw, vh) < 560;
  const L = rot ? vh : vw, Sh = (rot ? vw : vh) - (small ? 0 : 56), pad = small ? 0 : 32;
  const w = Math.max(200, Math.min(L - pad, Sh * W / H, 1600)), h = w * H / W;
  VIEW = { w, h, rot }; document.body.classList.toggle('compact', small); document.body.classList.toggle('rot', rot);
  if (small) Object.assign(cv.style, { position: 'fixed', left: (vw - w) / 2 + 'px', top: (vh - h) / 2 + 'px', width: w + 'px', height: h + 'px', transform: rot ? 'rotate(90deg)' : 'none', borderRadius: '0', maxWidth: 'none' });
  else Object.assign(cv.style, { position: '', left: '', top: '', width: w + 'px', height: h + 'px', transform: 'none', borderRadius: '', maxWidth: '' });
  const d = Math.min(devicePixelRatio || 1, 2); cv.width = Math.round(w * d); cv.height = Math.round(h * d);
}
function toLocal(ev) {
  const b = cv.getBoundingClientRect(), cx = b.left + b.width / 2, cy = b.top + b.height / 2;
  if (VIEW.rot) return { x: ((ev.clientY - cy) / VIEW.w + 0.5) * W, y: (0.5 - (ev.clientX - cx) / VIEW.h) * H };
  return { x: (ev.clientX - b.left) * W / b.width, y: (ev.clientY - b.top) * H / b.height };
}
cv.addEventListener('pointermove', ev => { mouse = toLocal(ev); });
cv.addEventListener('pointerleave', () => { mouse = { x: -99, y: -99 }; });
cv.addEventListener('pointerdown', ev => {
  ev.preventDefault(); mouse = toLocal(ev); const { x, y } = mouse;
  if (screen === 'play' && !G.over && !G.paused) {
    const f = toField(mouse); for (const s of G.suns) if (Math.hypot(f.x - s.x, f.y - s.y) < (COARSE ? 90 : 58)) { collect(s); return; }
    const cell = cellAt(f.x, f.y);
    if (cell && G.sel) { if (G.sel === 'broom') { if (G.grid[cell.r][cell.col]) { G.grid[cell.r][cell.col] = null; puff(colX(cell.col), rowY(cell.r) - 20, 6, 40); G.sel = null; } } else place(G.sel, cell.r, cell.col); return; }
  }
  for (let i = btns.length - 1; i >= 0; i--) if (hit(btns[i], x, y)) { btns[i].fn(); return; }
});
addEventListener('keydown', ev => {
  if (screen !== 'play' || G.over) return;
  if (ev.key === 'Escape' || ev.key === 'p' || ev.key === 'з') G.paused = !G.paused;
  const n = +ev.key; if (n >= 1 && n <= G.cards.length) G.sel = G.cards[n - 1];
  if (ev.key === 'q' || ev.key === 'й') ability(0); if (ev.key === 'w' || ev.key === 'ц') ability(1);
});
document.addEventListener('visibilitychange', () => { if (document.hidden && G && !G.over) G.paused = true; });

/* ---------- цикл ---------- */
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
addEventListener('resize', fit); addEventListener('orientationchange', () => setTimeout(fit, 200)); fit();
let last = performance.now();
function frame(now) {
  const dt = Math.min(0.05, (now - last) / 1000); last = now; T += dt;
  c.setTransform(cv.width / W, 0, 0, cv.height / H, 0, 0); btns = [];
  if (screen === 'menu') drawMenu();
  else { update(dt); drawScene();
    if (G.paused) overlay('ПАУЗА', 'Глюки подождут', '#ffe14a', [['Продолжить', () => G.paused = false], ['Заново', () => newGame(G.L)], ['В меню', () => screen = 'menu']]);
    else if (G.over === 'win') overlay('ОТПУСТИЛО!', G.L >= 5 ? 'Кракен ушёл. Открыт бесконечный приход.' : `${LEVEL_NAME(G.L)} пережита. Дальше будет хуже.`, '#7dffb0', [[G.L >= 5 ? 'Бесконечный приход' : 'Следующая ночь', () => newGame(G.L + 1)], ['В меню', () => screen = 'menu']]);
    else if (G.over === 'lose') overlay('ВАС НАКРЫЛО', G.endless ? `Развеяно глюков: ${G.kills}` : 'Глюк добрался до крыльца', '#ff5a5a', [['Ещё раз', () => newGame(G.L)], ['В меню', () => screen = 'menu']]);
  }
  requestAnimationFrame(frame);
}
window.__glyuki = { toLocal, get VIEW() { return VIEW; }, get G() { return G; }, newGame, spawnEnemy, place, ability };
requestAnimationFrame(frame);
})();
