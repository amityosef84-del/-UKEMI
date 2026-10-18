import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/** Endless ribbon that speeds up with scroll velocity and follows the scroll direction. */
export function initMarquees() {
  document.querySelectorAll<HTMLElement>('[data-marquee]').forEach((marquee) => {
    const track = marquee.querySelector('[data-marquee-track]');
    if (!track) return;

    const loop = gsap.to(track, { xPercent: -50, duration: 38, ease: 'none', repeat: -1, paused: true });
    // Start deep inside the repeats so it can also run backwards.
    loop.totalTime(loop.duration() * 100);

    let push: gsap.core.Timeline | null = null;
    ScrollTrigger.create({
      trigger: marquee,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: (self) => (self.isActive ? loop.play() : loop.pause()),
      onUpdate: (self) => {
        const dir = self.direction;
        const boost = dir * (1 + Math.min(Math.abs(self.getVelocity()) / 280, 7));
        push?.kill();
        push = gsap
          .timeline()
          .to(loop, { timeScale: boost, duration: 0.25 })
          .to(loop, { timeScale: dir, duration: 1.4, ease: 'power2.out' });
      },
    });
  });
}
