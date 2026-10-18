/**
 * Nail field — a canvas of points (the nails of the board) that breathe slowly,
 * ripple with the scroll and rise around the cursor. Pauses when off-screen.
 */
const TAU = Math.PI * 2;
const STONE = '156,161,164';
const ICE = '143,176,194';
const GROWTH = '122,158,57';

export function initNailFields(reduced: boolean) {
  document.querySelectorAll<HTMLCanvasElement>('[data-nailfield]').forEach((canvas) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gap = Number(canvas.dataset.gap || 26);
    const pointer = { x: -9999, y: -9999, active: 0 };
    let w = 0;
    let h = 0;
    let dpr = 1;
    let visible = false;
    let frame = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(performance.now());
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const scroll = window.scrollY * 0.004;
      const cols = Math.ceil(w / gap) + 1;
      const rows = Math.ceil(h / gap) + 1;
      const ox = (w - (cols - 1) * gap) / 2;
      const oy = (h - (rows - 1) * gap) / 2;
      const time = reduced ? 0 : t;

      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const x = ox + i * gap + (j % 2 ? gap / 2 : 0);
          const y = oy + j * gap;
          const wave = (Math.sin(x * 0.011 + time * 0.0005 + scroll) * Math.cos(y * 0.013 - time * 0.00035) + 1) / 2;
          const d = Math.hypot(x - pointer.x, y - pointer.y);
          const near = Math.max(0, 1 - d / 190) * pointer.active;
          const r = 0.75 + wave * 0.6 + near * 2;
          const alpha = 0.13 + wave * 0.18 + near * 0.6;
          const rgb = near > 0.55 ? GROWTH : near > 0.08 ? ICE : STONE;
          ctx.fillStyle = `rgba(${rgb},${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(x, y - near * 3, r, 0, TAU);
          ctx.fill();
        }
      }
    };

    const loop = (t: number) => {
      pointer.active += ((pointer.x > -9000 ? 1 : 0) - pointer.active) * 0.08;
      draw(t);
      frame = visible ? requestAnimationFrame(loop) : 0;
    };

    new ResizeObserver(resize).observe(canvas);

    if (reduced) return;

    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frame) frame = requestAnimationFrame(loop);
    }).observe(canvas);

    window.addEventListener(
      'pointermove',
      (e) => {
        if (!visible || e.pointerType === 'touch') return;
        const rect = canvas.getBoundingClientRect();
        pointer.x = e.clientX - rect.left;
        pointer.y = e.clientY - rect.top;
      },
      { passive: true },
    );
    document.addEventListener('pointerleave', () => {
      pointer.x = pointer.y = -9999;
    });
  });
}
