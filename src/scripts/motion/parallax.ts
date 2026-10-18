import { gsap } from 'gsap';

/** Layered depth: elements drift against the scroll. Keep values ≤ 0.18 inside .media (12% over-scan). */
export function initParallax() {
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const speed = Math.min(parseFloat(el.dataset.parallax || '0.15'), 0.18);
    gsap.fromTo(
      el,
      { yPercent: -speed * 50 },
      {
        yPercent: speed * 50,
        ease: 'none',
        scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  });
}
