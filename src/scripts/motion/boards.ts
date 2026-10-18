import { gsap } from 'gsap';

/** Product illustrations: the nails rise from the centre out when a board scrolls into view. */
export function initBoards() {
  document.querySelectorAll<HTMLElement>('[data-board]').forEach((board) => {
    const nails = board.querySelectorAll('.board__nail');
    if (!nails.length) return;
    gsap.from(nails, {
      scale: 0,
      duration: 0.7,
      ease: 'back.out(3)',
      stagger: { amount: 0.9, from: 'center', grid: 'auto' },
      scrollTrigger: { trigger: board, start: 'top 88%', once: true },
    });
  });
}
