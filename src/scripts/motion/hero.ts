import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

/** Opening sequence: the mark assembles (ice, stone, nail, sprout), then the wordmark settles. */
export function initHero() {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  const mark = hero?.querySelector<SVGSVGElement>('.hero__mark');
  if (!hero || !mark) return;

  const ice = mark.querySelector('.mark-ice');
  const stone = mark.querySelector('.mark-stone');
  const nail = mark.querySelector('.mark-nail');
  const stem = mark.querySelector<SVGPathElement>('.mark-stem');
  const leaves = mark.querySelectorAll<SVGGElement>('.mark-leaf');
  const word = hero.querySelector<HTMLElement>('.hero__word');
  const tagline = hero.querySelector('.hero__tagline');
  const foot = hero.querySelector('.hero__foot');
  const stage = hero.querySelector('.hero__stage');

  const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.2 });
  tl.set([mark, word, tagline, foot], { visibility: 'visible' });

  tl.from(ice, { rotation: -32, x: -24, opacity: 0, svgOrigin: '100 196', duration: 2 }, 0)
    .from(stone, { rotation: 32, x: 24, opacity: 0, svgOrigin: '100 196', duration: 2 }, 0)
    .from(nail, { y: -70, opacity: 0, duration: 1.3, ease: 'power4.out' }, 0.55);

  if (stem) {
    const len = stem.getTotalLength();
    tl.fromTo(stem, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut' }, 1.1);
  }
  leaves.forEach((leaf, i) => {
    tl.from(leaf, { scale: 0, svgOrigin: leaf.dataset.origin, duration: 0.9, ease: 'back.out(2.2)' }, 1.5 + i * 0.1);
  });

  if (word) {
    const { chars } = SplitText.create(word, { type: 'chars' });
    tl.from(chars, { yPercent: 60, opacity: 0, duration: 1.4, stagger: 0.07 }, 1)
      .from(word, { letterSpacing: '0.62em', duration: 2.4 }, 1);
  }

  tl.from(tagline, { opacity: 0, y: 16, duration: 1.2 }, 1.8).from(foot, { opacity: 0, y: 16, duration: 1.2 }, 2.1);

  // Leaving the hero: the stage drifts up and recedes.
  if (stage) {
    gsap.to(stage, {
      yPercent: -14,
      scale: 0.94,
      opacity: 0,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    });
  }
}
