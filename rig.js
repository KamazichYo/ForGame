/* Скелетная кукла из вырезанных деталей. Без зависимостей.
   Углы в позе — в радианах, плюс = вперёд по взгляду персонажа. Кукла нарисована лицом вправо; flip зеркалит. */
(() => {
'use strict';
const SIDES = ['N', 'F']; // ближняя и дальняя конечность
const ORDER = ['uarmF', 'farmF', 'handF', 'pelvis', 'footF', 'shinF', 'thighF', 'footN', 'shinN', 'thighN', 'neck', 'chest', 'head', 'uarmN', 'farmN', 'propN', 'handN'];
const ANGLES = ['root', 'chest', 'neck', 'head', 'uarmN', 'farmN', 'handN', 'uarmF', 'farmF', 'handF', 'thighN', 'shinN', 'footN', 'thighF', 'shinF', 'footF', 'prop'];
const wrap = a => { a = (a + Math.PI) % (2 * Math.PI); return a < 0 ? a + Math.PI : a - Math.PI; };
const mul = (m, n) => [m[0] * n[0] + m[2] * n[1], m[1] * n[0] + m[3] * n[1], m[0] * n[2] + m[2] * n[3], m[1] * n[2] + m[3] * n[3], m[0] * n[4] + m[2] * n[5] + m[4], m[1] * n[4] + m[3] * n[5] + m[5]];
const tr = (x, y) => [1, 0, 0, 1, x, y];
const rot = a => { const c = Math.cos(a), s = Math.sin(a); return [c, s, -s, c, 0, 0]; };

class Puppet {
  /* cfg: {dir, joints: {кость: {at:[fx,fy] на родителе, piv:[fx,fy] на себе}}, headOff:[dx,dy], hands:{тип:[fx,fy]}, grip:[fx,fy], propPiv:[fx,fy]} */
  constructor(name, cfg, base = 'assets/chars/') {
    this.name = name; this.cfg = cfg; this.img = {}; this.ready = false; this.pose = {}; this.cur = null;
    this.loaded = fetch(`${base}${name}/rig.json`).then(r => r.json()).then(rig => {
      this.rig = rig; const names = Object.keys(rig.parts), far = ['uarm', 'farm', 'hand_open', 'hand_fist', 'hand_grip', 'thigh', 'shin', 'foot'];
      return Promise.all(names.concat(far.map(n => n + '_far')).map(n => new Promise(ok => { const im = new Image(); im.onload = im.onerror = ok; im.src = `${base}${name}/${n}.png`; this.img[n] = im; })));
    }).then(() => { this.ready = true; });
  }
  /* Размер детали с поправкой пропорций: sc = {деталь: [по ширине, по длине]} */
  size(part) { const p = this.rig.parts[part]; if (!p) return [0, 0]; const k = this.cfg.sc[part.replace(/_.*/, '')] || [1, 1]; return [p[0] * k[0], p[1] * k[1], (p[2] || 0) * k[0], (p[3] || 0) * k[1]]; }
  /* Плавно подтягивает текущую позу к целевой: углы по кратчайшей дуге, остальное линейно. */
  ease(target, dt, rate = 16) {
    if (!this.cur) { this.cur = Object.assign({ x: 0, lift: 0 }, target); for (const k of ANGLES) this.cur[k] = target[k] || 0; return this.cur; }
    const k = 1 - Math.exp(-rate * dt), c = this.cur;
    for (const a of ANGLES) c[a] += wrap((target[a] || 0) - c[a]) * k;
    c.x += ((target.x || 0) - c.x) * k; c.lift += ((target.lift || 0) - c.lift) * k;
    c.face = target.face; c.handN = target.handNType; c.handF = target.handFType; c.handNType = target.handNType; c.handFType = target.handFType; c.propOn = target.propOn;
    return c;
  }
  /* Мировые матрицы костей для позы; ноги автоматически ставятся на землю. */
  solve(p) {
    const J = this.cfg.joints, M = {}, face = 'head_' + (p.face || 'neutral');
    const part = b => b === 'head' ? face : b.startsWith('hand') ? 'hand_' + (p[b + 'Type'] || 'open') : b.replace(/[NF]$/, '');
    const piv = b => {
      const [w, h, ax, ay] = this.size(part(b));
      if (b === 'head') return [ax + this.cfg.headOff[0], ay + this.cfg.headOff[1]];
      if (b.startsWith('hand')) { const f = this.cfg.hands[p[b + 'Type'] || 'open']; return [w * f[0], h * f[1]]; }
      if (b.startsWith('prop')) return [w * this.cfg.propPiv[0], h * this.cfg.propPiv[1]];
      const f = J[b.replace(/[NF]$/, '')].piv; return [w * f[0], h * f[1]];
    };
    const place = (b, parent, at, angle) => {
      const [pw, ph] = this.size(part(parent)), pp = piv(parent), o = piv(b);
      M[b] = mul(mul(mul(M[parent], tr(pw * at[0] - pp[0], ph * at[1] - pp[1])), rot(-angle)), tr(0, 0)); M[b].piv = o;
    };
    M.pelvis = rot(0); M.pelvis.piv = piv('pelvis');
    place('chest', 'pelvis', J.chest.at, p.chest || 0); place('neck', 'chest', J.neck.at, p.neck || 0); place('head', 'neck', J.head.at, p.head || 0);
    for (const s of SIDES) {
      place('uarm' + s, 'chest', J.uarm['at' + s], p['uarm' + s] || 0); place('farm' + s, 'uarm' + s, J.farm.at, p['farm' + s] || 0); place('hand' + s, 'farm' + s, J.hand.at, p['hand' + s] || 0);
      place('thigh' + s, 'pelvis', J.thigh['at' + s], p['thigh' + s] || 0); place('shin' + s, 'thigh' + s, J.shin.at, p['shin' + s] || 0); place('foot' + s, 'shin' + s, J.foot.at, p['foot' + s] || 0);
    }
    if (p.propOn) place('propN', 'handN', this.cfg.grip, p.prop || 0);
    // самая низкая точка подошв -> земля
    let low = -1e9;
    for (const s of SIDES) { const m = M['foot' + s], [w, h] = this.size('foot'); for (const fx of [0.15, 0.9]) { const x = w * fx - m.piv[0], y = h * 0.96 - m.piv[1]; low = Math.max(low, m[1] * x + m[3] * y + m[5]); } }
    this.part = part; return { M, low };
  }
  draw(ctx, x, y, scale, pose, flip = false) {
    if (!this.ready) return;
    const { M, low } = this.solve(pose), base = ctx.getTransform();
    ctx.save(); ctx.translate(x + (pose.x || 0), y - (pose.lift || 0)); ctx.rotate(-(pose.root || 0) * (flip ? -1 : 1)); ctx.scale(flip ? -scale : scale, scale); ctx.translate(0, -low);
    const world = ctx.getTransform();
    for (const b of ORDER) {
      const m = M[b]; if (!m) continue;
      let name = this.part(b); if (b.endsWith('F') && !b.startsWith('prop')) name += '_far';
      const im = this.img[name] || this.img[this.part(b)]; if (!im || !im.width) continue;
      ctx.setTransform(world.multiply(new DOMMatrix([m[0], m[1], m[2], m[3], m[4], m[5]]))); const [w, h] = this.size(this.part(b)); ctx.drawImage(im, -m.piv[0], -m.piv[1], w, h);
    }
    ctx.setTransform(base); ctx.restore();
    this.last = { M, low, world };
  }
  /* Экранная точка кости (для вылета тапка из руки). */
  point(bone) { const m = this.last && this.last.M[bone]; if (!m) return null; const p = this.last.world.transformPoint(new DOMPoint(m[4], m[5])); return { x: p.x, y: p.y }; }
}

/* ---------- клипы: функция времени -> поза ---------- */
const S = Math.sin, hang = (o = {}) => Object.assign({ uarmN: 0.06, farmN: 0.18, uarmF: -0.04, farmF: 0.14, handNType: 'open', handFType: 'open', face: 'neutral' }, o);
const blinkFace = (t, seed, face = 'neutral') => ((t + seed) % 3.4 < 0.13 || (t + seed * 2) % 5.3 < 0.1) ? 'blink' : face;
const CLIPS = {
  idle: (t, o) => hang({ chest: S(t * 1.7) * 0.018, head: S(t * 0.9 + 1) * 0.035, uarmN: 0.06 + S(t * 1.7) * 0.03, uarmF: -0.04 - S(t * 1.7) * 0.03, farmN: o.prop ? 0.55 : 0.18, handNType: o.prop ? 'grip' : 'open', prop: -0.5, face: blinkFace(t, o.seed), lift: S(t * 1.7) * 1.5 }),
  walk: (t, o) => { const p = t * 7.5, k = a => -Math.max(0, S(a - 1.9)) * 1.1 - 0.08;
    return hang({ thighN: S(p) * 0.5, shinN: k(p), footN: S(p) * 0.2, thighF: -S(p) * 0.5, shinF: k(p + Math.PI), footF: -S(p) * 0.2, uarmN: -S(p) * 0.45, farmN: 0.45 + S(p) * 0.15, uarmF: S(p) * 0.45, farmF: 0.45 - S(p) * 0.15,
      chest: 0.07 + S(p * 2) * 0.02, head: -0.03 + S(p * 2 + 1) * 0.02, handNType: o.prop ? 'grip' : 'fist', handFType: 'fist', prop: -0.3, face: blinkFace(t, o.seed) }); },
  scared: (t, o) => hang({ thighN: 0.42, shinN: -0.85, thighF: 0.25, shinF: -0.7, chest: -0.12, head: -0.08, uarmN: (o.prop ? 0.45 : 1.15) + S(t * 31) * 0.05, farmN: o.prop ? 1.0 : 1.5, uarmF: 1.0 + S(t * 29) * 0.05, farmF: 1.6, x: S(t * 43) * 3, handNType: o.prop ? 'grip' : 'open', prop: 0.4, face: 'scared' }),
  yell: (t, o) => hang({ chest: -0.16 + S(t * 30) * 0.015, head: -0.2, uarmN: o.prop ? 2.75 + S(t * 22) * 0.08 : 1.9, farmN: o.prop ? 0.25 : 1.35, uarmF: 1.75, farmF: 1.45, thighN: 0.18, shinN: -0.3, thighF: -0.2, shinF: -0.1, x: S(t * 47) * 2.5, handNType: o.prop ? 'grip' : 'open', prop: 2.6, face: 'yell' }),
  laugh: (t, o) => hang({ chest: -0.1 + Math.abs(S(t * 11)) * 0.09, head: -0.22 + S(t * 11) * 0.06, uarmN: 0.35, farmN: 1.55, uarmF: -0.3, farmF: 0.5, lift: Math.abs(S(t * 11)) * 5, handNType: o.prop ? 'grip' : 'open', prop: 1.2, face: 'laugh' }),
  hurt: (t, o) => { const k = Math.exp(-t * 3); return hang({ x: -34 * k, chest: -0.32 * k - 0.04, head: -0.3 * k, uarmN: -0.9 * k, farmN: 0.5, uarmF: -1.2 * k, farmF: 0.7, thighN: 0.3 * k, shinN: -0.5 * k, handNType: o.prop ? 'grip' : 'open', face: 'hurt' }); },
  dizzy: (t, o) => hang({ root: S(t * 2.6) * 0.13, chest: S(t * 2.6 + 1.2) * 0.14, head: S(t * 2.6 + 2.2) * 0.22, uarmN: S(t * 2.6 + 0.6) * 0.5, farmN: 0.3, uarmF: S(t * 2.6 + 0.9) * 0.5, farmF: 0.3, thighN: S(t * 2.6) * 0.14, shinN: -0.25, thighF: -S(t * 2.6) * 0.14, shinF: -0.25, handNType: o.prop ? 'grip' : 'open', face: 'dizzy' }),
  cheer: (t, o) => { const j = Math.max(0, S(t * 7)); return hang({ lift: j * 55, uarmN: 2.9 + S(t * 14) * 0.15, farmN: 0.2, uarmF: 2.7 - S(t * 14) * 0.15, farmF: 0.25, thighN: j ? 0.1 : 0.4, shinN: j ? -0.2 : -0.8, thighF: j ? -0.15 : 0.3, shinF: j ? -0.1 : -0.7, head: -0.12, handNType: o.prop ? 'grip' : 'fist', handFType: 'fist', prop: 2.8, face: 'laugh' }); },
  /* бросок: замах назад через верх, хлёст вперёд, доводка; o.release вызывается один раз в момент отпускания */
  throw: (t, o) => { const e = (a, b) => Math.min(1, Math.max(0, (t - a) / (b - a))), w = e(0, 0.38), r = e(0.38, 0.52), f = e(0.52, 1.1), sm = x => x * x * (3 - 2 * x);
    const arm = t < 0.38 ? -2.5 * sm(w) : 3.78 - 2.9 * sm(r) + 0.5 * sm(f) * (1 - f) * 2;
    return hang({ chest: -0.2 * sm(w) + 0.42 * sm(r) - 0.22 * sm(f), head: -0.1 * sm(w) + 0.14 * sm(r), uarmN: arm, farmN: 0.9 * sm(w) - 0.75 * sm(r) + 0.15 * sm(f), handN: 0.4 * sm(r), uarmF: 0.9 * sm(w) - 1.3 * sm(r) + 0.4 * sm(f), farmF: 0.6,
      thighN: -0.22 * sm(w) + 0.5 * sm(r) - 0.28 * sm(f), shinN: -0.3 * sm(r) + 0.3 * sm(f), thighF: 0.22 * sm(w) - 0.5 * sm(r) + 0.28 * sm(f), shinF: -0.35 * sm(w) + 0.35 * sm(r), x: 14 * sm(r) - 14 * sm(f),
      handNType: t < 0.46 && o.prop ? 'grip' : 'open', propHide: t >= 0.46, prop: 1.6, face: t < 0.38 ? 'neutral' : t < 0.9 ? 'yell' : 'laugh' }); }
};
const DUR = { throw: 1.25, hurt: 1.0 };

/* Актёр: кукла + текущий клип + положение на сцене. */
class Actor {
  constructor(puppet, o) { Object.assign(this, { puppet, x: 0, y: 0, scale: 0.5, flip: false, clip: 'idle', t: 0, prop: false, seed: Math.random() * 3, onRelease: null }, o); this.fired = false; }
  play(clip) { if (this.clip !== clip || DUR[clip]) { this.clip = clip; this.t = 0; this.fired = false; } }
  update(dt) {
    this.t += dt; const o = { prop: this.prop, seed: this.seed };
    if (DUR[this.clip] && this.t > DUR[this.clip]) { this.clip = 'idle'; this.t = 0; }
    const target = CLIPS[this.clip](this.t, o); target.propOn = this.prop && !target.propHide;
    if (this.clip === 'throw' && target.propHide && !this.fired) { this.fired = true; if (this.onRelease) this.onRelease(this); }
    this.pose = this.puppet.ready ? this.puppet.ease(target, dt, this.clip === 'throw' ? 30 : 14) : null;
  }
  draw(ctx) { if (this.pose) this.puppet.draw(ctx, this.x, this.y, this.scale, this.pose, this.flip); }
}

/* Настройка суставов: доли от размеров картинок деталей. */
const RIGS = {
  vovan: { size: 1, headOff: [4, 186], propPiv: [0.6, 0.1], grip: [0.5, 0.55], hands: { open: [0.4, 0.1], fist: [0.5, 0.12], grip: [0.5, 0.12] },
    sc: { chest: [1.4, 1.12], pelvis: [1.25, 1], uarm: [1.2, 0.7], farm: [1.15, 0.68], hand: [0.85, 0.85], thigh: [1.3, 0.68], shin: [1.3, 0.72], foot: [0.95, 0.95], neck: [1.2, 1], prop: [0.9, 0.9] },
    joints: { pelvis: { piv: [0.5, 0.45] }, chest: { at: [0.5, 0.42], piv: [0.5, 0.9] }, neck: { at: [0.5, 0.16], piv: [0.5, 0.72] }, head: { at: [0.5, 0.32] },
      uarm: { atN: [0.15, 0.36], atF: [0.85, 0.36], piv: [0.5, 0.1] }, farm: { at: [0.5, 0.86], piv: [0.5, 0.07] }, hand: { at: [0.5, 0.9] },
      thigh: { atN: [0.3, 0.62], atF: [0.7, 0.62], piv: [0.5, 0.08] }, shin: { at: [0.5, 0.9], piv: [0.5, 0.06] }, foot: { at: [0.5, 0.92], piv: [0.24, 0.3] } } },
  dimon: { size: 1.12, headOff: [-10, 196], propPiv: [0.3, 0.55], grip: [0.5, 0.5], hands: { open: [0.4, 0.1], fist: [0.5, 0.12], grip: [0.5, 0.12] },
    sc: { chest: [0.95, 1.08], pelvis: [0.62, 0.8], uarm: [1, 0.82], farm: [1, 0.82], hand: [0.8, 0.8], thigh: [0.92, 0.68], shin: [0.95, 0.68], foot: [0.9, 0.9], neck: [0.01, 0.01] },
    joints: { pelvis: { piv: [0.5, 0.4] }, chest: { at: [0.5, 0.3], piv: [0.5, 0.92] }, neck: { at: [0.5, 0.12], piv: [0.5, 0.5] }, head: { at: [0.5, 0.5] },
      uarm: { atN: [0.1, 0.2], atF: [0.9, 0.2], piv: [0.55, 0.1] }, farm: { at: [0.35, 0.9], piv: [0.5, 0.06] }, hand: { at: [0.5, 0.93] },
      thigh: { atN: [0.2, 0.6], atF: [0.8, 0.6], piv: [0.5, 0.06] }, shin: { at: [0.5, 0.93], piv: [0.5, 0.05] }, foot: { at: [0.5, 0.94], piv: [0.24, 0.3] } } }
};
window.Rig = { Puppet, Actor, CLIPS, RIGS };
})();
