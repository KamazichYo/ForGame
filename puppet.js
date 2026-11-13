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
/* ---------- клипы на ключевых кадрах ----------
   По скилу spine-animation: ключи с безье-кривыми (пресеты Spine), ритмы idle 2.0 с, walk 0.8 с, атака 0.6 с
   «замах → удар → доводка», прыжок «присед → толчок → полёт → приземление». Голова отстаёт от корпуса на ~0.1 с,
   крупные кости двигаются сильнее мелких, циклы возвращаются в исходную позу.
   Трек: [[u, значение, кривая], ...], u = 0..1 доли клипа; кривая задаёт отрезок, который заканчивается на этом ключе.
   Углы в треках — в градусах (плюс = вперёд по взгляду), x и lift — в пикселях экрана, sx/sy — множители. */
const D2R = Math.PI / 180, ANG = /^(head|torso|neck|uarm|farm|thigh|shin|foot|rot)/;
function bezier(x1, y1, x2, y2) {
  const cx = (s, a, b) => 3 * (1 - s) * (1 - s) * s * a + 3 * (1 - s) * s * s * b + s * s * s;
  return t => { let s = t; for (let i = 0; i < 8; i++) { const x = cx(s, x1, x2) - t, d = 3 * (1 - s) * (1 - s) * x1 + 6 * (1 - s) * s * (x2 - x1) + 3 * s * s * (1 - x2); if (Math.abs(x) < 1e-5 || !d) break; s = Math.min(1, Math.max(0, s - x / d)); } return cx(s, y1, y2); };
}
const EASE = { ease: bezier(0.25, 0, 0.75, 1), in: bezier(0.42, 0, 1, 1), out: bezier(0, 0, 0.58, 1), bounce: bezier(0.34, 1.56, 0.64, 1), fast: bezier(0.4, 0, 0.2, 1), lin: t => t };
function sample(tr, u) {
  if (u <= tr[0][0]) return tr[0][1];
  for (let i = 1; i < tr.length; i++) if (u <= tr[i][0]) { const [u0, v0] = tr[i - 1], [u1, v1, c] = tr[i], k = (EASE[c] || EASE.ease)((u - u0) / Math.max(1e-6, u1 - u0)); return v0 + (v1 - v0) * k; }
  return tr[tr.length - 1][1];
}
const wrap01 = u => u - Math.floor(u);
/* Клип: tracks по ключам; loop — u берётся по модулю; out переводит градусы в радианы. */
function clip(tracks, extra) {
  return u => { const o = {}; for (const k in tracks) { const v = sample(tracks[k], u); o[k] = ANG.test(k) ? v * D2R : v; } if (extra) extra(o, u); return o; };
}
/* Шаг (пресет walk 0.8 с): ноги ±25°, передняя нога прямая на контакте, задняя согнута 35°, руки против ног,
   таз подпрыгивает в фазе переноса, корпус качается ±3°, голова — встречно и с запаздыванием 0.125 цикла.
   Множители: leg — размах бёдер, knee — сгиб колен, arm — размах рук (руки вырезаны из фигуры — держим малым),
   bob — подскок, lean/droop — постоянный наклон корпуса и головы. */
const TH = [[0, 25], [0.25, 0], [0.5, -25], [0.75, 0], [1, 25]], SH = [[0, -5], [0.25, -35], [0.5, -35], [0.75, -5], [1, -5]];
function walk(o) {
  const st = Object.assign({ leg: 1, knee: 1, arm: 0.3, bob: 4, lean: 3, droop: 0, sway: 3, rate: 1 }, o);
  return u => { u = wrap01(u * st.rate); const b = wrap01(u + 0.5), p = {};
    p.thighA = sample(TH, u) * st.leg * D2R; p.thighB = sample(TH, b) * st.leg * D2R;
    p.shinA = sample(SH, u) * st.knee * D2R; p.shinB = sample(SH, b) * st.knee * D2R;
    p.footA = -(p.thighA + p.shinA) * 0.7; p.footB = -(p.thighB + p.shinB) * 0.7; // стопа держится почти параллельно земле
    p.uarmA = -sample(TH, u) * 0.8 * st.arm * D2R; p.uarmB = -sample(TH, b) * 0.8 * st.arm * D2R;
    p.farmA = (10 + 20 * (0.5 - 0.5 * Math.cos(u * 6.283))) * st.arm * D2R; p.farmB = (10 + 20 * (0.5 - 0.5 * Math.cos(b * 6.283))) * st.arm * D2R;
    p.lift = sample([[0, 0], [0.25, 1], [0.5, 0], [0.75, 1], [1, 0]], u) * st.bob;
    p.torso = (st.lean + sample([[0, 0], [0.25, 1], [0.5, 0], [0.75, -1], [1, 0]], u) * st.sway) * D2R;
    p.head = (st.droop - sample([[0, 0], [0.25, 1], [0.5, 0], [0.75, -1], [1, 0]], wrap01(u - 0.125)) * st.sway * 0.6) * D2R;
    p.sy = 1 - 0.02 * sample([[0, 1], [0.25, 0], [0.5, 1], [0.75, 0], [1, 1]], u); p.sx = 2 - p.sy;
    return p; };
}
/* Атака-укус (пресет attack 0.6 с, зациклен): замах назад → резкий выпад → доводка → возврат. */
const BITE = clip({
  torso: [[0, 2], [0.17, -8, 'in'], [0.42, 14, 'fast'], [0.67, 6], [1, 2, 'out']],
  head: [[0, 3], [0.22, -12, 'in'], [0.47, 18, 'fast'], [0.72, 7], [1, 3, 'out']],
  x: [[0, 0], [0.17, -6, 'in'], [0.42, 12, 'fast'], [0.67, 5], [1, 0, 'out']],
  rot: [[0, 0], [0.17, -2], [0.42, 4, 'fast'], [1, 0, 'out']],
  uarmA: [[0, 0], [0.17, -5], [0.42, 8, 'fast'], [1, 0]], uarmB: [[0, 2], [0.17, -4], [0.45, 9, 'fast'], [1, 2]],
  farmA: [[0, 6], [0.42, 14, 'fast'], [1, 6]], farmB: [[0, 8], [0.45, 16, 'fast'], [1, 8]],
  thighA: [[0, 8], [1, 8]], shinA: [[0, -12], [0.42, -18], [1, -12]], thighB: [[0, -10], [1, -10]], shinB: [[0, -6], [1, -6]],
  sy: [[0, 1], [0.17, 1.03], [0.42, 0.96, 'fast'], [0.67, 1.01], [1, 1, 'out']]
});
/* Оглушение (1.2 с, цикл): покачивание всего тела, голова отстаёт и болтается сильнее. */
const STUN = clip({ rot: [[0, -4], [0.5, 4], [1, -4]], torso: [[0, -3], [0.1, -4], [0.6, 5], [1, -3]], head: [[0, -6], [0.2, -12], [0.7, 12], [1, -6]],
  uarmA: [[0, -4], [0.6, 6], [1, -4]], uarmB: [[0, 5], [0.55, -5], [1, 5]], farmA: [[0, 8], [1, 8]], farmB: [[0, 10], [1, 10]], thighA: [[0, 4], [0.5, -4], [1, 4]], thighB: [[0, -4], [0.5, 4], [1, -4]] });
/* Покой (пресет idle 2.0 с): таз ±3 px, корпус ±1°, голова ±1.5° встречно и позже. */
const IDLE = clip({ lift: [[0, 0], [0.5, 3], [1, 0]], torso: [[0, 0], [0.5, 1.2], [1, 0]], head: [[0, 0], [0.6, -1.5], [1, 0]],
  uarmA: [[0, 0], [0.5, 1.5], [1, 0]], uarmB: [[0, 0], [0.5, -1.5], [1, 0]], farmA: [[0, 2], [0.55, 3], [1, 2]], farmB: [[0, 2], [0.55, 1], [1, 2]], sy: [[0, 1], [0.5, 1.008], [1, 1]] });
/* Крик (1.5 с, такты): вдох-замах назад, взрыв вперёд, удержание с дрожью, возврат. */
const YELL = clip({ torso: [[0, 0], [0.17, -8, 'out'], [0.23, 9, 'fast'], [0.8, 7], [1, 0, 'ease']], head: [[0, 0], [0.17, -14, 'out'], [0.26, -4, 'fast'], [0.8, -7], [1, 0]],
  x: [[0, 0], [0.17, -5], [0.25, 7, 'fast'], [0.8, 4], [1, 0]], lift: [[0, 0], [0.17, 4, 'out'], [0.23, 0, 'fast'], [1, 0]],
  sy: [[0, 1], [0.17, 1.05, 'out'], [0.23, 0.95, 'fast'], [0.32, 1.01], [1, 1]], uarmA: [[0, 0], [0.17, -4], [0.25, 6, 'fast'], [0.8, 5], [1, 0]], uarmB: [[0, 0], [0.17, -4], [0.25, 6, 'fast'], [0.8, 5], [1, 0]],
  thighA: [[0, 0], [0.23, 8], [0.8, 8], [1, 0]], shinA: [[0, 0], [0.23, -14], [0.8, -14], [1, 0]], thighB: [[0, 0], [0.23, -8], [1, 0]] },
  (o, u) => { if (u > 0.23 && u < 0.8) { const k = Math.sin((u - 0.23) / 0.57 * Math.PI); o.x += Math.sin(u * 140) * 2.5 * k; o.head += Math.sin(u * 170) * 0.02 * k; } });
/* Бросок (0.7 с, такты): замах назад (0..0.4), хлёст (0.4..0.55, кривая fast), доводка с удержанием, возврат. */
const THROW = clip({ torso: [[0, 0], [0.4, -10, 'in'], [0.55, 14, 'fast'], [0.75, 9], [1, 0, 'out']], head: [[0, 0], [0.45, -7], [0.62, 9, 'fast'], [0.8, 6], [1, 0, 'out']],
  uarmB: [[0, 0], [0.4, -16, 'in'], [0.55, 20, 'fast'], [0.75, 14], [1, 0, 'out']], farmB: [[0, 0], [0.4, 14], [0.55, -4, 'fast'], [1, 0]], uarmA: [[0, 0], [0.4, 6], [0.55, -8], [1, 0]],
  thighA: [[0, 0], [0.4, 10], [0.55, -12, 'fast'], [0.8, -8], [1, 0]], shinA: [[0, 0], [0.4, -14], [0.55, 0], [1, 0]], thighB: [[0, 0], [0.4, -10], [0.55, 14, 'fast'], [0.8, 10], [1, 0]], shinB: [[0, 0], [0.55, -14], [1, 0]],
  x: [[0, 0], [0.4, -6, 'in'], [0.55, 12, 'fast'], [0.75, 8], [1, 0, 'out']], lift: [[0, 0], [0.55, 5, 'fast'], [0.75, 2], [1, 0]], rot: [[0, 0], [0.4, -3], [0.55, 4, 'fast'], [1, 0]] });
/* Паника (0.5 с, цикл): частый переступ, голова мотается. */
const PANIC = clip({ lift: [[0, 0], [0.25, 6, 'out'], [0.5, 0, 'in'], [0.75, 6, 'out'], [1, 0, 'in']], head: [[0, -8], [0.3, 10], [0.6, -10], [1, -8]], torso: [[0, -3], [0.5, 3], [1, -3]],
  thighA: [[0, 14], [0.5, -6], [1, 14]], shinA: [[0, -24], [0.5, -4], [1, -24]], thighB: [[0, -6], [0.5, 14], [1, -6]], shinB: [[0, -4], [0.5, -24], [1, -4]], rot: [[0, -2], [0.5, 2], [1, -2]] });
/* Радость (пресет jump 1.0 с, цикл): присед → толчок → полёт → приземление → выпрямление. */
const CHEER = clip({ lift: [[0, 0], [0.15, 0], [0.35, 40, 'out'], [0.55, 36], [0.8, 0, 'in'], [1, 0]], sy: [[0, 1], [0.15, 0.92, 'in'], [0.35, 1.06, 'out'], [0.55, 1], [0.8, 0.93, 'in'], [1, 1, 'out']],
  torso: [[0, 0], [0.15, 8], [0.35, -5, 'out'], [0.8, 5, 'in'], [1, 0]], head: [[0, 0], [0.18, 5], [0.4, -9], [0.83, 3], [1, 0]],
  thighA: [[0, 0], [0.15, 20], [0.35, -15], [0.55, 10], [0.8, 15], [1, 0]], shinA: [[0, 0], [0.15, -30], [0.35, 10], [0.55, -15], [0.8, -20], [1, 0]],
  thighB: [[0, 0], [0.15, 18], [0.35, -12], [0.55, 12], [0.8, 14], [1, 0]], shinB: [[0, 0], [0.15, -28], [0.35, 8], [0.55, -18], [0.8, -18], [1, 0]],
  uarmA: [[0, 0], [0.15, 4], [0.35, -8, 'out'], [0.8, 3], [1, 0]], uarmB: [[0, 0], [0.15, 4], [0.35, -8, 'out'], [0.8, 3], [1, 0]] });
/* Смерть (0.45 с): колени подламываются, корпус заваливается назад с ускорением, голова запрокидывается позже. */
const DEATH = clip({ rot: [[0, 0], [0.3, 6, 'out'], [1, 72, 'in']], torso: [[0, 0], [0.3, 8], [1, -20, 'in']], head: [[0, 0], [0.4, 6], [1, -32, 'in']],
  thighA: [[0, 0], [0.3, 25, 'out'], [1, 30]], shinA: [[0, 0], [0.3, -45, 'out'], [1, -50]], thighB: [[0, 0], [0.3, 18], [1, 22]], shinB: [[0, 0], [0.3, -35], [1, -40]],
  uarmA: [[0, 0], [0.5, -10], [1, -22]], uarmB: [[0, 0], [0.5, -14], [1, -28]], farmA: [[0, 0], [1, 18]], farmB: [[0, 0], [1, 22]], sy: [[0, 1], [0.3, 0.92, 'out'], [1, 0.95]] });
const death = u => DEATH(Math.min(1, u));
const bite = u => sample([[0, 0], [0.17, -0.4, 'in'], [0.42, 1, 'fast'], [0.67, 0.4], [1, 0, 'out']], wrap01(u));
const cyc = (f, dur) => (ph, t, u) => f(u !== undefined ? u : wrap01(t / dur));
const CLIPS = {
  /* глюки: ph — фаза шага в радианах (растёт с пройденным путём), t — время */
  zombie_walk: (ph) => walk({ leg: 0.6, knee: 0.65, arm: 0.25, bob: 3, lean: 6, droop: 7, sway: 2.5 })(ph / 6.283),
  alien_walk: (ph) => walk({ leg: 1, knee: 0.9, arm: 0.55, bob: 4, lean: 5, sway: 3 })(ph / 6.283),
  tough_walk: (ph) => Object.assign(walk({ leg: 0.65, knee: 0.55, arm: 0.35, bob: 6, lean: 2, sway: 4 })(ph / 6.283), { rot: Math.sin(ph) * 0.03 }),
  ballerina_walk: (ph) => walk({ leg: 0.35, knee: 0.15, arm: 0, bob: 7, lean: 0, sway: 2, rate: 2 })(ph / 6.283),
  eat: cyc(BITE, 0.6), stun: cyc(STUN, 1.2),
  /* кореша */
  idle: cyc(IDLE, 2.0), panic: cyc(PANIC, 0.5), cheer: cyc(CHEER, 1.0),
  yell: (ph, t, u) => YELL(u !== undefined ? u : Math.min(1, t / 1.5)), throw: (ph, t, u) => THROW(u !== undefined ? u : Math.min(1, t / 0.7))
};
/* ---------- пружины ----------
   Клип задаёт цель, кость тянется к ней пружиной. Тяжёлое (ноги, корпус) — жёстко и без перелёта,
   лёгкое (голова, предплечья) — мягче и с перелётом: получаются запаздывание, захлёст и затухающие колебания.
   stiffness k и коэффициент затухания z (1 = без перелёта). */
const SPRING = { thigh: [700, 1], shin: [700, 1], foot: [700, 1], torso: [380, 0.8], head: [240, 0.5], uarm: [260, 0.6], farm: [190, 0.5], x: [300, 0.8], lift: [380, 0.7], rot: [240, 0.7], sx: [420, 0.5], sy: [420, 0.5] };
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
window.Puppets = { PUP, loadPuppet, drawPuppet, CLIPS, animate, kick, death, bite, EASE, bezier, sample };
})();
