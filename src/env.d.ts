/// <reference types="astro/client" />

import type Lenis from 'lenis';

declare global {
  interface Window {
    /** Set by the motion engine (src/scripts/motion). */
    ukemi?: { lenis?: Lenis | null };
  }
}

export {};
