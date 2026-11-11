/* Лаборатория анимаций: сценка на крыльце + ручной запуск клипов. */
(() => {
'use strict';
const W = 1280, H = 720, GROUND = 640, cv = document.getElementById('stage'), c = cv.getContext('2d');
const { Puppet, Actor, RIGS } = window.Rig;
const BASE = window.CHAR_BASE || 'assets/chars/';
const vovan = new Actor(new Puppet('vovan', RIGS.vovan, BASE), { x: 300, y: GROUND, scale: 0.72, prop: true });
const dimon = new Actor(new Puppet('dimon', RIGS.dimon, BASE), { x: 560, y: GROUND, scale: 0.72 * RIGS.dimon.size, prop: true });
const actors = { vovan, dimon }; let T = 0, shake = 0, fx = [], mode = 'scene', sceneT = 0, step = -1;
const slipper = new Image(); slipper.src = BASE + 'dimon/prop.png';

dimon.onRelease = a => { const p = a.puppet.point('handN') || { x: a.x, y: a.y - 300 }, m = c.getTransform().inverse().transformPoint(new DOMPoint(p.x, p.y));
  fx.push({ k: 'slipper', x: m.x, y: m.y, vx: (a.flip ? -1 : 1) * 900, vy: -330, r: 0, life: 1.3 }); a.prop = false; setTimeout(() => a.prop = true, 1500); };
const say = (s, x, y, col = '#ff5ad1', size = 70) => fx.push({ k: 'txt', s, x, y, col, size, life: 1.3, max: 1.3 });

/* сценка: [время, действие] */
const SCENE = [
  [0, () => { vovan.x = 300; dimon.x = 560; vovan.flip = dimon.flip = false; vovan.play('idle'); dimon.play('idle'); }],
  [2.2, () => { say('ГРЫМ!', 1010, 300, '#ffe14a', 96); shake = 0.5; vovan.play('scared'); dimon.play('scared'); }],
  [4.0, () => { vovan.play('yell'); say('ААААА!', 300, 110, '#ff5ad1', 64); dimon.play('idle'); }],
  [5.6, () => { vovan.play('idle'); dimon.play('throw'); }],
  [6.5, () => { say('ШЛЁП!', 1130, 330, '#7dffb0', 72); shake = 0.25; }],
  [7.0, () => { vovan.play('laugh'); dimon.play('laugh'); }],
  [9.0, () => { dimon.play('cheer'); vovan.play('walk'); vovan.walk = 1; }],
  [10.6, () => { vovan.flip = true; vovan.walk = -1; dimon.play('idle'); }],
  [12.2, () => { vovan.flip = false; vovan.walk = 0; vovan.play('idle'); dimon.play('dizzy'); }],
  [14.2, () => { dimon.play('hurt'); }],
  [15.6, () => { sceneT = 0; step = -1; }]
];
function runScene(dt) { sceneT += dt; while (step + 1 < SCENE.length && SCENE[step + 1][0] <= sceneT) { step++; SCENE[step][1](); if (step === -1) break; } if (vovan.walk) vovan.x += vovan.walk * 120 * dt; }

function backdrop() {
  const sky = c.createLinearGradient(0, 0, 0, H); sky.addColorStop(0, '#150c28'); sky.addColorStop(1, '#2b1c42'); c.fillStyle = sky; c.fillRect(0, 0, W, H);
  for (let i = 0; i < 50; i++) { c.fillStyle = `rgba(255,255,255,${0.25 + 0.25 * Math.sin(T * 2 + i)})`; c.fillRect((i * 197) % W, (i * 71) % 300, 2, 2); }
  c.save(); c.translate(1150, 300); for (let i = 0; i < 6; i++) { c.rotate(T * 0.25 + i); c.beginPath(); c.ellipse(0, 0, 70 + i * 34, 260 - i * 14, 0, 0, 7); c.strokeStyle = `hsla(${(T * 40 + i * 55) % 360},95%,65%,.22)`; c.lineWidth = 12; c.stroke(); } c.restore();
  for (let x = 700; x < W; x += 52) { c.beginPath(); c.moveTo(x, 520); c.lineTo(x, 380 + (x * 7 % 17)); c.lineTo(x + 24, 360 + (x * 7 % 17)); c.lineTo(x + 48, 380 + (x * 7 % 17)); c.lineTo(x + 48, 520); c.closePath(); c.fillStyle = (x / 52 | 0) % 2 ? '#3d2f4a' : '#463652'; c.fill(); c.strokeStyle = '#1b1030'; c.lineWidth = 3; c.stroke(); }
  c.fillStyle = '#34503f'; c.fillRect(0, 520, W, 200); c.fillStyle = '#2c4536'; for (let i = 0; i < 30; i++) c.fillRect((i * 173) % W, 540 + (i * 53) % 170, 46, 6);
  c.fillStyle = '#4a4560'; c.fillRect(0, 0, 250, 600); c.strokeStyle = '#1b1030'; c.lineWidth = 4; for (let y = 30; y < 600; y += 34) { c.beginPath(); c.moveTo(0, y); c.lineTo(250, y); c.strokeStyle = '#3a3650'; c.stroke(); }
  c.fillStyle = '#ffd27a'; c.fillRect(40, 250, 150, 350); c.strokeStyle = '#1b1030'; c.lineWidth = 5; c.strokeRect(40, 250, 150, 350); c.strokeRect(0, -5, 250, 605);
  const lg = c.createRadialGradient(190, 520, 20, 330, 600, 520); lg.addColorStop(0, 'rgba(255,210,122,.34)'); lg.addColorStop(1, 'rgba(255,210,122,0)'); c.fillStyle = lg; c.fillRect(0, 200, 900, 520);
  c.fillStyle = '#6b4a35'; c.fillRect(0, 610, 800, 60); c.strokeStyle = '#1b1030'; c.strokeRect(-5, 610, 805, 60); c.fillStyle = '#553a29'; c.fillRect(0, 670, 800, 50); for (let x = 60; x < 800; x += 70) { c.beginPath(); c.moveTo(x, 610); c.lineTo(x, 670); c.strokeStyle = '#553a29'; c.lineWidth = 3; c.stroke(); }
}
function shadow(a) { c.fillStyle = 'rgba(0,0,0,.32)'; c.beginPath(); c.ellipse(a.x + (a.pose ? a.pose.x || 0 : 0), GROUND + 4, 78 * a.scale * 2, 12, 0, 0, 7); c.fill(); }

let last = performance.now();
function frame(now) {
  const dt = Math.min(0.05, (now - last) / 1000); last = now; T += dt; shake = Math.max(0, shake - dt);
  c.setTransform(cv.width / W, 0, 0, cv.height / H, 0, 0);
  if (shake > 0 && !RM) c.translate((Math.random() - 0.5) * 22 * shake, (Math.random() - 0.5) * 22 * shake);
  if (mode === 'scene') runScene(dt);
  backdrop(); for (const a of [vovan, dimon]) { a.update(dt); shadow(a); } vovan.draw(c); dimon.draw(c);
  for (const f of fx) { f.life -= dt;
    if (f.k === 'slipper') { f.x += f.vx * dt; f.y += f.vy * dt; f.vy += 700 * dt; f.r += dt * 16; c.save(); c.translate(f.x, f.y); c.rotate(f.r); if (slipper.width) c.drawImage(slipper, -42, -21, 84, 42); c.restore(); }
    else { const k = f.life / f.max; c.save(); c.globalAlpha = Math.min(1, k * 2.5); c.translate(f.x, f.y - (1 - k) * 30); c.rotate(-0.08); c.scale(1 + (1 - k) * 0.15, 1 + (1 - k) * 0.15); c.font = `400 ${f.size}px "Rubik Wet Paint", Impact, sans-serif`; c.textAlign = 'center'; c.lineJoin = 'round'; c.lineWidth = 12; c.strokeStyle = '#1b1030'; c.strokeText(f.s, 0, 0); c.fillStyle = f.col; c.fillText(f.s, 0, 0); c.restore(); } }
  fx = fx.filter(f => f.life > 0);
  requestAnimationFrame(frame);
}
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
function resize() { const b = cv.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1, 2); cv.width = Math.round(b.width * d); cv.height = Math.round(b.width * d * H / W); }
addEventListener('resize', resize); resize();

/* кнопки */
const NAMES = { idle: 'Стоит', walk: 'Идёт', scared: 'Испуг', yell: 'Орёт', laugh: 'Ржёт', throw: 'Бросок', hurt: 'Получил', dizzy: 'Улетел', cheer: 'Прыгает' };
for (const who of ['vovan', 'dimon']) { const row = document.getElementById('row-' + who);
  for (const k in NAMES) { const b = document.createElement('button'); b.textContent = NAMES[k]; b.id = `btn-${who}-${k}`; b.onclick = () => { mode = 'manual'; actors[who].walk = 0; actors[who].flip = false; actors[who].play(k); }; row.append(b); } }
document.getElementById('btn-scene').onclick = () => { mode = 'scene'; sceneT = 0; step = -1; };
document.getElementById('btn-flip').onclick = () => { mode = 'manual'; vovan.flip = !vovan.flip; dimon.flip = !dimon.flip; };
window.__lab = { vovan, dimon, set: (m, t) => { mode = m; sceneT = t; step = -1; } };
requestAnimationFrame(frame);
})();
