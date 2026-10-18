import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/** Smooth wheel scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync. */
export function initLenis() {
  const lenis = new Lenis({
    lerp: 0.09,
    wheelMultiplier: 0.95,
    anchors: { offset: -80 },
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  return lenis;
}
