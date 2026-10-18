/**
 * UKEMI motion engine.
 * Pages opt in through data attributes — no per-page JavaScript:
 *   data-reveal="up|fade|mask"   fade/slide or clip-path reveal on scroll
 *   data-split                   heading revealed line by line
 *   data-words                   paragraph lit word by word as you scroll
 *   data-stagger                 children revealed one after another
 *   data-parallax="0.15"         layered parallax (inside a .media figure)
 *   data-delay="0.2"             extra delay for reveals
 * Section-specific behaviour: [data-hero], [data-path], [data-marquee], [data-board], [data-nailfield].
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { initLenis } from './lenis';
import { initReveals } from './reveals';
import { initParallax } from './parallax';
import { initHero } from './hero';
import { initPath } from './path';
import { initMarquees } from './marquee';
import { initBoards } from './boards';
import { initNailFields } from './nailfield';

gsap.registerPlugin(ScrollTrigger, SplitText);

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Mark the engine as alive straight away so the <head> fallback never un-hides content mid-intro.
window.ukemi = { lenis: null };

initNailFields(reduced);

if (!reduced) {
  start();
}

async function start() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  window.ukemi!.lenis = initLenis();

  // Split text only once the brand fonts are in (or after a short grace period).
  await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1200))]);

  initHero();
  initReveals();
  initParallax();
  initPath();
  initMarquees();
  initBoards();

  ScrollTrigger.refresh();
}
