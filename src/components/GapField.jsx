import { useEffect, useRef } from 'react';

const SHAPES = ['circle', 'square', 'triangle', 'ring', 'plus', 'handle'];
const GLYPHS = ['{', '}', '<', '/>', ';', '()', '=', '[]', '&&', '#'];
const GAP = 12;            // half-width of the gap between the two platforms
const MIDDLE_ZONE = 90;    // how close to the gap the pointer must be to build a bridge
const BRIDGE_H = 70;
const PULL = 0.012;        // everyone leans toward the gap, nobody crosses alone
const JITTER = 0.14;
const MAX_V = 2.4;
const TOUCH_BRIDGE_MS = 2500;
const NOTES_MS = 950;
const STRIPE = '#f2c200';

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function makeParticle(w, h, side) {
  const half = w / 2;
  const span = half - GAP - 24;
  return {
    x: side < 0 ? 12 + Math.random() * span : half + GAP + 12 + Math.random() * span,
    y: 12 + Math.random() * (h - 24),
    vx: Math.random() - 0.5,
    vy: Math.random() - 0.5,
    side, // -1 = design, 1 = code
    size: 5 + Math.random() * 5,
    shape: pick(SHAPES),
    glyph: pick(GLYPHS),
    rot: Math.random() * Math.PI * 2,
    vr: (Math.random() - 0.5) * 0.02,
    flip: 1, // < 1 while morphing after a crossing
  };
}

function drawShape(ctx, p) {
  const s = p.size;
  ctx.beginPath();
  switch (p.shape) {
    case 'circle':
      ctx.arc(0, 0, s, 0, Math.PI * 2);
      ctx.fill();
      break;
    case 'square':
      ctx.fillRect(-s, -s, s * 2, s * 2);
      break;
    case 'triangle':
      ctx.moveTo(0, -s);
      ctx.lineTo(s, s);
      ctx.lineTo(-s, s);
      ctx.closePath();
      ctx.fill();
      break;
    case 'ring':
      ctx.arc(0, 0, s, 0, Math.PI * 2);
      ctx.stroke();
      break;
    case 'plus':
      ctx.moveTo(-s, 0); ctx.lineTo(s, 0);
      ctx.moveTo(0, -s); ctx.lineTo(0, s);
      ctx.stroke();
      break;
    default: // bezier handle: anchor + control point
      ctx.moveTo(-s, 0); ctx.lineTo(s, 0);
      ctx.stroke();
      ctx.fillRect(-2.5, -2.5, 5, 5);
      ctx.beginPath();
      ctx.arc(s, 0, 2.5, 0, Math.PI * 2);
      ctx.arc(-s, 0, 2.5, 0, Math.PI * 2);
      ctx.fill();
  }
}

// Two descending tones, like metro doors about to close
function playChime() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return;
  const audio = new AudioCtx();
  [[1046.5, 0], [784, 0.32]].forEach(([freq, at]) => {
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    const t0 = audio.currentTime + at;
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, t0);
    gain.gain.linearRampToValueAtTime(0.07, t0 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.7);
    osc.connect(gain).connect(audio.destination);
    osc.start(t0);
    osc.stop(t0 + 0.75);
  });
  setTimeout(() => audio.close(), 1400);
}

export function GapField({ labels }) {
  const canvasRef = useRef(null);
  const labelsRef = useRef(labels);

  useEffect(() => { labelsRef.current = labels; }, [labels]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const state = {
      w: 0,
      h: 0,
      particles: [],
      bridge: null,      // { y, until }
      bridgeOpen: 0,     // 0 → 1 easing of the bridge
      crossings: 0,
      notesAt: -Infinity,
      visible: true,
      raf: 0,
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      // Not laid out yet: wait for the ResizeObserver to report a real size
      if (!w || !h) return;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!state.particles.length || !state.w || !state.h) {
        state.particles = [];
        const count = Math.round(Math.min(90, Math.max(30, w / 12)));
        for (let i = 0; i < count; i++) state.particles.push(makeParticle(w, h, i % 2 ? 1 : -1));
      } else {
        state.particles.forEach(p => { p.x *= w / state.w; p.y *= h / state.h; });
      }
      state.w = w;
      state.h = h;
    };

    const cross = (p, side) => {
      p.side = side;
      p.flip = 0;
      p.vx = side * 2;
      state.crossings++;
    };

    const step = (now) => {
      const { w, h } = state;
      const cx = w / 2;
      if (state.bridge && now > state.bridge.until) state.bridge = null;
      state.bridgeOpen += ((state.bridge ? 1 : 0) - state.bridgeOpen) * 0.18;
      const bridgeY = state.bridge?.y;

      state.particles.forEach(p => {
        p.vx += (Math.random() - 0.5) * JITTER - p.side * PULL;
        p.vy += (Math.random() - 0.5) * JITTER;
        p.vx *= 0.985;
        p.vy *= 0.985;
        const speed = Math.hypot(p.vx, p.vy);
        if (speed > MAX_V) { p.vx *= MAX_V / speed; p.vy *= MAX_V / speed; }
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        if (p.flip < 1) p.flip = Math.min(1, p.flip + 0.06);

        const r = p.size;
        if (p.x < r) { p.x = r; p.vx = Math.abs(p.vx); }
        if (p.x > w - r) { p.x = w - r; p.vx = -Math.abs(p.vx); }
        if (p.y < r) { p.y = r; p.vy = Math.abs(p.vy); }
        if (p.y > h - r) { p.y = h - r; p.vy = -Math.abs(p.vy); }

        const onBridge = state.bridgeOpen > 0.6 && Math.abs(p.y - bridgeY) < BRIDGE_H / 2 - r;
        if (p.side < 0 && p.x > cx - GAP - r) {
          if (!onBridge) { p.x = cx - GAP - r; p.vx = -Math.abs(p.vx) * 0.5; }
          else if (p.x > cx) cross(p, 1);
        }
        if (p.side > 0 && p.x < cx + GAP + r) {
          if (!onBridge) { p.x = cx + GAP + r; p.vx = Math.abs(p.vx) * 0.5; }
          else if (p.x < cx) cross(p, -1);
        }
      });
    };

    const draw = (now) => {
      const { w, h } = state;
      const cx = w / 2;
      const styles = getComputedStyle(document.documentElement);
      const bg = styles.getPropertyValue('--card-bg').trim();
      const fg = styles.getPropertyValue('--text-h').trim();
      const dim = styles.getPropertyValue('--text').trim();
      const mono = styles.getPropertyValue('--mono').trim() || 'monospace';
      const { design, code, crossings } = labelsRef.current;

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Platform edges
      ctx.strokeStyle = dim;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.moveTo(cx - GAP, 0); ctx.lineTo(cx - GAP, h);
      ctx.moveTo(cx + GAP, 0); ctx.lineTo(cx + GAP, h);
      ctx.stroke();
      ctx.setLineDash([]);

      // The gap itself, with a hole where the bridge is
      const open = state.bridgeOpen;
      const by = state.bridge?.y ?? 0;
      const holeTop = by - (BRIDGE_H / 2) * open;
      const holeBottom = by + (BRIDGE_H / 2) * open;
      ctx.fillStyle = STRIPE;
      if (open > 0.02) {
        ctx.fillRect(cx - 1.5, 0, 3, Math.max(0, holeTop));
        ctx.fillRect(cx - 1.5, holeBottom, 3, h - holeBottom);
        ctx.strokeStyle = fg;
        ctx.lineWidth = 2;
        const reach = (GAP + 16) * open;
        ctx.beginPath();
        ctx.moveTo(cx - reach, holeTop); ctx.lineTo(cx + reach, holeTop);
        ctx.moveTo(cx - reach, holeBottom); ctx.lineTo(cx + reach, holeBottom);
        ctx.stroke();
      } else {
        ctx.fillRect(cx - 1.5, 0, 3, h);
      }

      // Particles: shapes on the design side, glyphs on the code side
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      state.particles.forEach(p => {
        const morphing = p.flip < 1;
        const showSide = p.flip < 0.5 ? -p.side : p.side;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.scale(morphing ? Math.max(0.05, Math.abs(1 - 2 * p.flip)) : 1, 1);
        ctx.fillStyle = morphing ? STRIPE : fg;
        ctx.strokeStyle = morphing ? STRIPE : fg;
        ctx.lineWidth = 1.5;
        if (showSide < 0) {
          ctx.rotate(p.rot);
          drawShape(ctx, p);
        } else {
          ctx.font = `${Math.round(p.size * 2.2)}px ${mono}`;
          ctx.fillText(p.glyph, 0, 0);
        }
        ctx.restore();
      });

      // Plim-plom: two notes, one after the other, the second a little lower
      const t = now - state.notesAt;
      if (t >= 0 && t < NOTES_MS) {
        ctx.font = '22px serif';
        ctx.fillStyle = fg;
        [[0, cx + 22, 28], [320, cx + 42, 44]].forEach(([delay, x, y]) => {
          const local = (t - delay) / 600;
          if (local < 0 || local > 1) return;
          ctx.globalAlpha = Math.sin(local * Math.PI);
          ctx.fillText('♪', x, y - local * 8);
        });
        ctx.globalAlpha = 1;
      }

      // Labels
      ctx.font = `12px ${mono}`;
      ctx.fillStyle = dim;
      ctx.textBaseline = 'alphabetic';
      ctx.textAlign = 'left';
      ctx.fillText(design, 12, h - 12);
      ctx.textAlign = 'right';
      ctx.fillText(code, w - 12, h - 12);
      ctx.fillText(`${crossings}: ${state.crossings}`, w - 12, 20);
    };

    const loop = (now) => {
      step(now);
      draw(now);
      if (state.visible) state.raf = requestAnimationFrame(loop);
    };

    const start = () => {
      cancelAnimationFrame(state.raf);
      if (reduced) draw(performance.now());
      else state.raf = requestAnimationFrame(loop);
    };

    const local = (e) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const nearGap = (x) => Math.abs(x - state.w / 2) < Math.min(MIDDLE_ZONE, state.w * 0.12);

    const onMove = (e) => {
      if (e.pointerType !== 'mouse') return;
      const { x, y } = local(e);
      state.bridge = nearGap(x) ? { y, until: Infinity } : null;
    };
    const onLeave = (e) => {
      if (e.pointerType === 'mouse') state.bridge = null;
    };
    const onDown = (e) => {
      const { x, y } = local(e);
      if (nearGap(x)) {
        // Touch has no hover: a tap in the middle holds the bridge for a moment
        if (e.pointerType !== 'mouse') state.bridge = { y, until: performance.now() + TOUCH_BRIDGE_MS };
        return;
      }
      // Anywhere else: doors closing, everybody steps back
      playChime();
      state.notesAt = performance.now();
      state.particles.forEach(p => { p.vx += p.side * 5; });
    };

    resize();
    start();

    const ro = new ResizeObserver(() => { resize(); if (reduced) draw(performance.now()); });
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      const wasVisible = state.visible;
      state.visible = entry.isIntersecting;
      if (state.visible && !wasVisible) start();
    });
    io.observe(canvas);

    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);
    canvas.addEventListener('pointerdown', onDown);

    return () => {
      cancelAnimationFrame(state.raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
      canvas.removeEventListener('pointerdown', onDown);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pg-gap-canvas"
      role="img"
      aria-label={labels.aria}
    />
  );
}
