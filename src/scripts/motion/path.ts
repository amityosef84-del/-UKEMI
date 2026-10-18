import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * "The four states" — the brand's colour philosophy told through the symbol.
 * The symbol stays sticky (CSS) while chapters scroll past. It is stacked in layers and each
 * chapter lights one: Charcoal (all dim) → Ice (left half) → Stone (right half) → Growth (the
 * nail and sprout rise from the bottom).
 */
const GROWTH_FROM = 'polygon(36% 100%, 66% 100%, 66% 100%, 56% 100%, 56% 100%, 46% 100%, 46% 100%, 36% 100%)';
const GROWTH_TO = 'polygon(36% 0%, 66% 0%, 66% 76%, 56% 76%, 56% 100%, 46% 100%, 46% 76%, 36% 76%)';

export function initPath() {
  const section = document.querySelector<HTMLElement>('[data-path]');
  const mark = section?.querySelector<HTMLElement>('[data-path-mark]');
  if (!section || !mark) return;

  const layer = (name: string) => mark.querySelector<HTMLElement>(`[data-layer="${name}"]`);
  const ice = layer('ice');
  const stone = layer('stone');
  const growth = layer('growth');
  const bg = section.querySelector('.path__bg');
  const glow = section.querySelector('.path__glow');

  gsap.set([ice, stone], { opacity: 0 });
  gsap.set(growth, { clipPath: GROWTH_FROM });

  // One scrubbed step per chapter, played while that chapter scrolls up into the centre.
  const chapters = Array.from(section.querySelectorAll<HTMLElement>('[data-chapter]'));
  const step = (chapter: HTMLElement | undefined) =>
    gsap.timeline({
      defaults: { ease: 'none', immediateRender: false },
      scrollTrigger: { trigger: chapter, start: 'top 85%', end: 'top 30%', scrub: 0.8 },
    });

  // 02 Ice — control
  step(chapters[1])
    .fromTo(ice, { opacity: 0 }, { opacity: 1 }, 0)
    .fromTo(bg, { backgroundColor: '#0F1317' }, { backgroundColor: '#1a2833' }, 0);

  // 03 Stone — foundation
  step(chapters[2])
    .fromTo(stone, { opacity: 0 }, { opacity: 1 }, 0)
    .fromTo(bg, { backgroundColor: '#1a2833' }, { backgroundColor: '#25292c' }, 0);

  // 04 Growth — the nail and the sprout rise
  step(chapters[3])
    .fromTo(growth, { clipPath: GROWTH_FROM }, { clipPath: GROWTH_TO }, 0)
    .fromTo(bg, { backgroundColor: '#25292c' }, { backgroundColor: '#0F1317' }, 0)
    .fromTo(glow, { opacity: 0 }, { opacity: 1 }, 0);

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
