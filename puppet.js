/* Куклы из цельной фигуры: tools/puppets.py режет рисунок на кости, здесь они вращаются вокруг суставов.
   Поза — углы костей в радианах, плюс = вперёд по взгляду персонажа. В покое кукла = исходный рисунок. */
(() => {
'use strict';
const S = Math.sin, abs = Math.abs, max = Math.max;
const PUP = {};
function loadPuppet(name, base = 'assets/puppets/') {
  const p = PUP[name] = { name, ready: false, img: new Image() };
  fetch(`${base}${name}.json`).then(r => r.json()).then(m => {
    Object.assign(p, m); p.idx = {}; m.bones.forEach((b, i) => p.idx[b.name] = i);
    const far = m.near === 'A' ? 'B' : 'A', n = m.near, arms = p.idx.uarmA !== undefined;
    p.order = ['thigh' + far, 'shin' + far, 'foot' + far, 'thigh' + n, 'shin' + n, 'foot' + n].concat(arms ? ['uarm' + far, 'farm' + far] : [], ['torso', 'head'], arms ? ['uarm' + n, 'farm' + n] : []);
    p.img.onload = () => { p.ready = true; }; p.img.src = `${base}${name}.png`;
  }).catch(() => {});
  return p;
}
/* Рисует куклу: (x, y) — точка под ногами, h — высота в покое. pose: {кость: угол, x, lift, rot, sx, sy}. */
function drawPuppet(c, p, x, y, h, pose, flip = false) {
  if (!p.ready) return false;
  const k = h / p.h, W = p.w, H = p.h, dir = p.dir, M = {}, J = p.joints;
  const mat = (name) => { // матрица кости: родитель ∘ поворот вокруг своего сустава
    if (M[name]) return M[name];
    const b = p.bones[p.idx[name]], a = -dir * (pose[name] || 0), [px, py] = J[b.pivot], co = Math.cos(a), si = Math.sin(a);
    const own = [co, si, -si, co, px - co * px + si * py, py - si * px - co * py], par = b.parent ? mat(b.parent) : null;
    return M[name] = par ? [par[0] * own[0] + par[2] * own[1], par[1] * own[0] + par[3] * own[1], par[0] * own[2] + par[2] * own[3], par[1] * own[2] + par[3] * own[3], par[0] * own[4] + par[2] * own[5] + par[4], par[1] * own[4] + par[3] * own[5] + par[5]] : own;
  };
  // ноги на землю: самая низкая точка стоп в позе против той же точки в покое
  let low = -1e9, rest = -1e9;
  for (const s of 'AB') { const m = mat('foot' + s); for (const j of ['an' + s, 'to' + s]) { const [jx, jy] = J[j]; low = max(low, m[1] * jx + m[3] * jy + m[5]); rest = max(rest, jy); } }
  c.save(); c.translate(x + (pose.x || 0), y - (pose.lift || 0)); c.rotate((pose.rot || 0) * (flip ? -1 : 1)); c.scale((flip ? -k : k) * (pose.sx || 1), k * (pose.sy || 1)); c.translate(-W / 2, -H + (rest - low));
  for (const name of p.order) { const m = mat(name); c.save(); c.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
    const f = name === 'head' && pose.face;
    if (f && f.complete && f.naturalWidth) { // подмена головы лицом с листа эмоций: по ширине головы, макушка к макушке
      const [x0, y0, x1, y1] = p.headBox, fit = pose.faceFit || [1, 0, 0], w = (x1 - x0) * fit[0], hh = w * f.naturalHeight / f.naturalWidth;
      if (dir < 0) { c.translate((x0 + x1) / 2, 0); c.scale(-1, 1); c.translate(-(x0 + x1) / 2, 0); }
      c.drawImage(f, (x0 + x1) / 2 - w / 2 + fit[1], y0 + fit[2], w, hh);
    } else c.drawImage(p.img, p.idx[name] * W, 0, W, H, 0, 0, W, H);
    c.restore(); }
  c.restore(); return true;
}
/* ---------- клипы ---------- */
const legs = (ph, amp, knee) => ({ sy: 1 - 0.025 * Math.abs(Math.cos(ph)), sx: 1 + 0.015 * Math.abs(Math.cos(ph)), lift: Math.abs(Math.sin(ph)) * 3, thighA: S(ph) * amp, shinA: -max(0, S(ph - 1.9)) * knee, footA: max(0, S(ph - 1.9)) * knee * 0.5 - S(ph) * amp * 0.5,
  thighB: -S(ph) * amp, shinB: -max(0, S(ph - 1.9 + Math.PI)) * knee, footB: max(0, S(ph + Math.PI - 1.9)) * knee * 0.5 + S(ph) * amp * 0.5 });
/* Кривая укуса на цикл 0..1: упреждение назад (0..0.55), резкий выпад (0.55..0.65), отдача. Возвращает -0.4..1. */
function bite(u) { u -= Math.floor(u); const sm = x => x * x * (3 - 2 * x);
  if (u < 0.55) return -0.4 * sm(u / 0.55); if (u < 0.65) return -0.4 + 1.4 * sm((u - 0.55) / 0.1); return 1 - sm((u - 0.65) / 0.35); }
/* Смерть: колени подламываются, корпус заваливается назад, голова запрокидывается. u = 0..1. */
const death = u => { const g = u * u; return { rot: 1.25 * g, torso: -0.35 * u, head: -0.55 * Math.min(1, u * 1.6), thighA: 0.5 * u, shinA: -0.9 * u, thighB: 0.35 * u, shinB: -0.7 * u, uarmA: -0.35 * u, uarmB: -0.5 * u, farmA: 0.3 * u, farmB: 0.4 * u, sy: 1 - 0.08 * u }; };
const CLIPS = {
  /* глюки: ph — фаза шага (растёт с пройденным путём), t — время */
  zombie_walk: (ph, t) => Object.assign(legs(ph, 0.3, 0.5), { torso: 0.06 + S(ph * 2) * 0.02, head: 0.08 + S(ph + 0.6) * 0.07, uarmA: S(ph) * 0.06, farmA: 0.05 + S(ph + 1) * 0.07, uarmB: -S(ph) * 0.08, farmB: 0.1 - S(ph + 1) * 0.1, rot: S(ph) * 0.035 }),
  alien_walk: (ph, t) => Object.assign(legs(ph, 0.5, 0.75), { torso: 0.1, head: S(ph * 2) * 0.06 - 0.04, uarmA: -S(ph) * 0.32, farmA: 0.2 + S(ph) * 0.15, uarmB: S(ph) * 0.32, farmB: 0.2 - S(ph) * 0.15 }),
  tough_walk: (ph, t) => Object.assign(legs(ph, 0.3, 0.45), { torso: 0.03 + S(ph) * 0.035, head: -S(ph) * 0.03, uarmA: -S(ph) * 0.22 + 0.08, farmA: 0.35, uarmB: S(ph) * 0.22 + 0.08, farmB: 0.35, rot: S(ph) * 0.025 }),
  ballerina_walk: (ph, t) => Object.assign(legs(ph * 2, 0.16, 0.2), { torso: S(ph * 2) * 0.03, head: S(ph * 2 + 1) * 0.05, lift: abs(S(ph * 2)) * 7, sy: 1 + S(ph * 4) * 0.015 }),
  eat: (ph, t) => { const b = bite(t * 1.7);
    return { torso: 0.04 + b * 0.24, head: 0.04 + b * 0.3, rot: b * 0.07, x: b * 9, thighA: 0.12 + b * 0.1, shinA: -0.2 - b * 0.15, thighB: -0.2, sy: 1 - b * 0.04, sx: 1 + b * 0.03,
      uarmA: b * 0.12, farmA: 0.08 + b * 0.1, uarmB: 0.04 + b * 0.1, farmB: 0.12 + b * 0.08 }; },
  eat_old: (ph, t) => ({ torso: 0.1 + abs(S(t * 9)) * 0.12, head: 0.12 + S(t * 18) * 0.16, rot: -abs(S(t * 9)) * 0.05, uarmA: S(t * 9) * 0.05, farmA: 0.06 + S(t * 9 + 1) * 0.07, uarmB: 0.06 - S(t * 9) * 0.07, farmB: 0.14 - S(t * 9 + 1) * 0.12, thighA: 0.15, shinA: -0.2, thighB: -0.2, x: -abs(S(t * 9)) * 6 }),
  stun: (ph, t) => ({ rot: S(t * 4.5) * 0.07, torso: S(t * 4.5 + 1) * 0.08, head: S(t * 4.5 + 2) * 0.2, uarmA: S(t * 4.5 + 0.5) * 0.3, uarmB: S(t * 4.5 + 0.9) * 0.3, farmA: 0.2, farmB: 0.2 }),
  /* кореша */
  idle: (ph, t) => ({ head: S(t * 0.9) * 0.025, torso: S(t * 1.7) * 0.012, uarmA: S(t * 1.7) * 0.03, uarmB: -S(t * 1.7) * 0.03, farmA: 0.04, farmB: 0.04, sy: 1 + S(t * 1.7) * 0.008 }),
  yell: (ph, t) => ({ head: -0.2 + S(t * 30) * 0.02, torso: -0.07, uarmA: S(t * 26) * 0.04, farmA: 0.1, uarmB: -S(t * 26) * 0.04, farmB: 0.1, rot: -0.04, thighA: 0.12, shinA: -0.2, thighB: -0.12, lift: abs(S(t * 13)) * 8, x: S(t * 47) * 2 }),
  panic: (ph, t) => ({ head: S(t * 16) * 0.12, torso: S(t * 16) * 0.03, uarmA: S(t * 19) * 0.07, farmA: 0.1, uarmB: -S(t * 19) * 0.07, farmB: 0.1, rot: S(t * 16) * 0.04, thighA: S(t * 16) * 0.2, shinA: -0.25, thighB: -S(t * 16) * 0.2, shinB: -0.25, lift: abs(S(t * 16)) * 6 }),
  cheer: (ph, t) => ({ head: -0.12, uarmA: S(t * 12) * 0.06, farmA: 0.1, uarmB: -S(t * 12) * 0.06, farmB: 0.1, rot: S(t * 8) * 0.04, lift: max(0, S(t * 8)) * 22, thighA: 0.1, shinA: -0.3 * max(0, -S(t * 8)), thighB: -0.1, shinB: -0.3 * max(0, -S(t * 8)) }),
  /* бросок: u = 0..1 — доля клипа. Замах назад, хлёст вперёд, возврат. */
  throw: (ph, t, u) => { const e = (a, b) => Math.min(1, max(0, (u - a) / (b - a))), sm = x => x * x * (3 - 2 * x), w = sm(e(0, 0.35)), r = sm(e(0.35, 0.5)), f = sm(e(0.6, 1));
    return { torso: -0.14 * w + 0.3 * r - 0.16 * f, head: -0.08 * w + 0.12 * r - 0.04 * f, uarmB: -0.1 * w + 0.22 * r - 0.12 * f, farmB: 0.1 * w, uarmA: 0.06 * w - 0.12 * r + 0.06 * f, farmA: 0.05, rot: 0.1 * w - 0.2 * r + 0.1 * f, lift: 10 * r * (1 - f),
      thighA: 0.2 * w - 0.45 * r + 0.25 * f, shinA: -0.25 * w + 0.25 * r, thighB: -0.2 * w + 0.4 * r - 0.2 * f, shinB: -0.3 * r + 0.3 * f, x: (-6 * w + 16 * r - 10 * f) }; }
};
/* ---------- пружины ----------
   Клип задаёт цель, кость тянется к ней пружиной. Тяжёлое (ноги, корпус) — жёстко и без перелёта,
   лёгкое (голова, предплечья) — мягче и с перелётом: получаются запаздывание, захлёст и затухающие колебания.
   stiffness k и коэффициент затухания z (1 = без перелёта). */
const SPRING = { thigh: [520, 1], shin: [520, 1], foot: [520, 1], torso: [260, 0.75], head: [150, 0.42], uarm: [190, 0.55], farm: [120, 0.45], x: [300, 0.8], lift: [380, 0.7], rot: [240, 0.7], sx: [420, 0.5], sy: [420, 0.5] };
const springOf = key => SPRING[key.replace(/[AB]$/, '')] || [300, 0.8];
function animate(st, target, dt) {
  st.cur = st.cur || {}; st.vel = st.vel || {};
  const out = {}, steps = Math.max(1, Math.ceil(dt / 0.008)), h = dt / steps;
  const keys = new Set([...Object.keys(target), ...Object.keys(st.cur)]);
  for (const k of keys) {
    const t = target[k]; if (typeof t !== 'number' && t !== undefined) { out[k] = t; continue; }
    const goal = t === undefined ? (k === 'sx' || k === 'sy' ? 1 : 0) : t;
    if (!(k in st.cur)) { st.cur[k] = goal; st.vel[k] = 0; }
    const [K, z] = springOf(k), D = 2 * Math.sqrt(K) * z;
    for (let i = 0; i < steps; i++) { st.vel[k] += ((goal - st.cur[k]) * K - st.vel[k] * D) * h; st.cur[k] += st.vel[k] * h; }
    out[k] = st.cur[k];
  }
  for (const k in target) if (typeof target[k] !== 'number') out[k] = target[k];
  return out;
}
/* Толчок: мгновенная скорость костям (удар, приземление). */
function kick(st, imp) { st.vel = st.vel || {}; for (const k in imp) st.vel[k] = (st.vel[k] || 0) + imp[k]; }
window.Puppets = { PUP, loadPuppet, drawPuppet, CLIPS, animate, kick, death, bite };
})();
