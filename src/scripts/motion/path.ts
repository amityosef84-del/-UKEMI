import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * "The four states" — the brand's colour philosophy told through the mark.
 * The mark stays sticky (CSS) while chapters scroll past; each chapter lights another part:
 * Charcoal (all dim) → Ice (left half) → Stone (right half) → Growth (nail + sprout).
 */
export function initPath() {
  const section = document.querySelector<HTMLElement>('[data-path]');
  const mark = section?.querySelector<SVGSVGElement>('.path__mark');
  if (!section || !mark) return;

  const ice = mark.querySelector('.mark-ice');
  const stone = mark.querySelector('.mark-stone');
  const nail = mark.querySelector('.mark-nail');
  const stem = mark.querySelector<SVGPathElement>('.mark-stem');
  const leaves = Array.from(mark.querySelectorAll<SVGGElement>('.mark-leaf'));
  const bg = section.querySelector('.path__bg');
  const glow = section.querySelector('.path__glow');
  const len = stem?.getTotalLength() ?? 0;

  gsap.set([ice, stone], { opacity: 0.1 });
  gsap.set(nail, { opacity: 0.25 });
  if (stem) gsap.set(stem, { strokeDasharray: len, strokeDashoffset: len });
  leaves.forEach((leaf) => gsap.set(leaf, { scale: 0, svgOrigin: leaf.dataset.origin }));

  // One scrubbed step per chapter, played while that chapter scrolls up into the centre.
  const chapters = Array.from(section.querySelectorAll<HTMLElement>('[data-chapter]'));
  const step = (chapter: HTMLElement | undefined) =>
    gsap.timeline({
      defaults: { ease: 'none', immediateRender: false },
      scrollTrigger: { trigger: chapter, start: 'top 85%', end: 'top 30%', scrub: 0.8 },
    });

  // 02 Ice — control
  step(chapters[1])
    .fromTo(ice, { opacity: 0.1 }, { opacity: 1 }, 0)
    .fromTo(bg, { backgroundColor: '#0F1317' }, { backgroundColor: '#1a2833' }, 0);

  // 03 Stone — foundation
  step(chapters[2])
    .fromTo(stone, { opacity: 0.1 }, { opacity: 1 }, 0)
    .fromTo(bg, { backgroundColor: '#1a2833' }, { backgroundColor: '#25292c' }, 0);

  // 04 Growth — the nail comes alive and the sprout rises
  const growth = step(chapters[3])
    .fromTo(nail, { opacity: 0.25 }, { opacity: 1, duration: 0.4 }, 0)
    .fromTo(bg, { backgroundColor: '#25292c' }, { backgroundColor: '#0F1317' }, 0)
    .fromTo(glow, { opacity: 0 }, { opacity: 1 }, 0);
  if (stem) growth.fromTo(stem, { strokeDashoffset: len }, { strokeDashoffset: 0, duration: 0.6 }, 0.2);
  growth.fromTo(leaves, { scale: 0 }, { scale: 1, duration: 0.35, stagger: 0.1, ease: 'back.out(2)' }, 0.5);

  // Highlight the chapter currently in view. On narrow screens the mark sits above the text,
  // so a chapter hands over earlier — before it can slide across the mark.
  const narrow = window.matchMedia('(max-width: 959px)').matches;
  chapters.forEach((chapter) => {
    ScrollTrigger.create({
      trigger: chapter,
      start: 'top 60%',
      end: narrow ? 'bottom 78%' : 'bottom 40%',
      toggleClass: 'is-active',
    });
  });
  section.classList.add('is-live');
}
