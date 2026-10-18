import { gsap } from 'gsap';

/** Opening sequence: the emblem surfaces from the dark, light crosses the metal, the wordmark opens. */
export function initHero() {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  const emblem = hero?.querySelector<HTMLElement>('.hero__emblem');
  if (!hero || !emblem) return;

  const shine = hero.querySelector('.hero__shine');
  const word = hero.querySelector('.hero__word');
  const glow = hero.querySelector('.hero__glow');
  const tagline = hero.querySelector('.hero__tagline');
  const foot = hero.querySelector('.hero__foot');
  const stage = hero.querySelector('.hero__stage');

  const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.2 });
  tl.set([emblem, word, tagline, foot], { visibility: 'visible' })
    .from(glow, { opacity: 0, scale: 0.6, duration: 2.6 }, 0)
    .from(emblem, { opacity: 0, scale: 0.78, y: 40, filter: 'blur(18px)', duration: 2.2, clearProps: 'filter' }, 0.1)
    .fromTo(shine, { backgroundPosition: '160% 0' }, { backgroundPosition: '-60% 0', duration: 1.6, ease: 'power2.inOut' }, 1.1)
    .fromTo(
      word,
      { clipPath: 'inset(0% 50% 0% 50%)', opacity: 0, filter: 'blur(8px)' },
      { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, filter: 'blur(0px)', duration: 1.9, clearProps: 'filter' },
      0.9,
    )
    .from(tagline, { opacity: 0, y: 16, duration: 1.2 }, 1.7)
    .from(foot, { opacity: 0, y: 16, duration: 1.2 }, 2);

  // After the intro: the emblem breathes, and light crosses it again now and then.
  tl.add(() => {
    gsap.to(emblem, { y: -8, duration: 3.6, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    gsap.fromTo(
      shine,
      { backgroundPosition: '160% 0' },
      { backgroundPosition: '-60% 0', duration: 1.8, ease: 'power2.inOut', repeat: -1, repeatDelay: 6 },
    );
  });

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
