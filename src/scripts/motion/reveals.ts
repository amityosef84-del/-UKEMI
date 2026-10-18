import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

const delayOf = (el: HTMLElement) => Number(el.dataset.delay ?? 0);

export function initReveals() {
  // Headings: lines rise out of a mask.
  document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      autoSplit: true,
      onSplit(self) {
        gsap.set(el, { visibility: 'visible' });
        return gsap.from(self.lines, {
          yPercent: 110,
          duration: 1.2,
          ease: 'expo.out',
          stagger: 0.09,
          delay: delayOf(el),
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      },
    });
  });

  // Statements: each word brightens as it crosses the viewport.
  document.querySelectorAll<HTMLElement>('[data-words]').forEach((el) => {
    SplitText.create(el, {
      type: 'words',
      autoSplit: true,
      onSplit(self) {
        return gsap.fromTo(
          self.words,
          { opacity: 0.14 },
          {
            opacity: 1,
            ease: 'none',
            stagger: 0.1,
            scrollTrigger: { trigger: el, start: 'top 78%', end: 'bottom 48%', scrub: true },
          },
        );
      },
    });
  });

  // Simple fade / slide-up.
  document.querySelectorAll<HTMLElement>('[data-reveal="up"], [data-reveal="fade"]').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: el.dataset.reveal === 'up' ? 42 : 0 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: delayOf(el),
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      },
    );
  });

  // Images: clip-path wipe upwards while the photo settles from a slight zoom.
  document.querySelectorAll<HTMLElement>('[data-reveal="mask"]').forEach((el) => {
    const inner = el.querySelector('.media__inner');
    const tl = gsap.timeline({
      delay: delayOf(el),
      scrollTrigger: { trigger: el, start: 'top 86%', once: true },
    });
    tl.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'expo.inOut' });
    if (inner) tl.from(inner, { scale: 1.22, duration: 2, ease: 'expo.out' }, 0.15);
  });

  // Groups: children one after another.
  document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((group) => {
    gsap.fromTo(
      group.children,
      { autoAlpha: 0, y: 40 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1.1,
        ease: 'power3.out',
        stagger: 0.12,
        delay: delayOf(group),
        scrollTrigger: { trigger: group, start: 'top 86%', once: true },
      },
    );
  });
}
