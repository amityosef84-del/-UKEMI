# UKEMI — brand website

International showcase site for **UKEMI** sadhu boards. *Stronger than you've ever been.*
Products are presented, not sold — there is no cart or checkout.

Built with [Astro](https://astro.build) (static output), [GSAP](https://gsap.com) + ScrollTrigger + SplitText for scroll motion,
and [Lenis](https://lenis.darkroom.engineering) for smooth scrolling.

## Commands

| Command           | Action                                        |
| ----------------- | --------------------------------------------- |
| `npm install`     | Install dependencies (Node 22.22+)            |
| `npm run dev`     | Local dev server at `http://localhost:4321`   |
| `npm run build`   | Build the static site into `dist/`            |
| `npm run preview` | Preview the production build                  |
| `npm run check`   | Type-check Astro and TypeScript files         |

## Where things live

```
src/
  styles/tokens.css      Brand palette, fonts, spacing, easing — change the brand here
  data/site.ts           Business info: email, social links, where-to-buy, colour philosophy, testimonials
  content/products/*.md  One file per board (the file name is the URL: /boards/<name>/)
  components/            Mark (logo symbol), Media (image slot), BoardIllustration, …
  components/home/       Home page sections
  scripts/motion/        Motion engine (see below)
  pages/                 Routes
brand-assets/            Raw brand files from the client
docs/BRAND-INPUT.md      Checklist of content and assets still needed
```

## Common tasks

**Add a real photo** — put the file in `src/assets/images/`, then pass it to the image slot:

```astro
---
import feet from '../assets/images/feet-on-board.jpg';
---
<Media src={feet} alt="Bare feet on an UKEMI board" label="Lifestyle" ratio="4 / 5" />
```

Astro generates responsive AVIF/WebP versions automatically.

**Add a board** — copy a file in `src/content/products/`, rename it and edit the front-matter.
Product photos go in the `images` list (paths relative to the Markdown file); until then a board
illustration is generated from the `grid` values.

**Logo** — the original artwork lives in `brand-assets/logo/`. The cut-out versions used by the site
(`src/assets/brand/ukemi-symbol.png`, `ukemi-wordmark.png`) were made with `brand-assets/logo/matte.py`,
which removes the dark backdrop of the renders. Favicons and `public/logo.png` are generated from the symbol.

**Photos by name** — any image saved in `src/assets/images/` is picked up by its file name
(`src/data/photos.ts`). Slots already wired: `feet-on-stone`, `wood-grain`, `nails-macro`, `workshop-hands`
(home), `stillness`, `meditation` (practice), `ukemi-fall`, `founder` (about). A missing file simply keeps
the placeholder.

## Motion

Pages opt into motion with data attributes; no per-page JavaScript is needed.

| Attribute              | Effect                                              |
| ---------------------- | --------------------------------------------------- |
| `data-reveal="up"`     | Fade and rise into view                             |
| `data-reveal="mask"`   | Clip-path wipe (used by `Media`)                    |
| `data-split`           | Heading revealed line by line                       |
| `data-words`           | Statement lit word by word as you scroll            |
| `data-stagger`         | Children revealed one after another                 |
| `data-parallax="0.15"` | Layered parallax                                    |
| `data-delay="0.2"`     | Extra delay for a reveal                            |

Signature pieces: the hero emblem surfacing with a sweep of light across the metal, the "four states"
section where the symbol lights up layer by layer (ice, stone, then the nail and sprout rising), the nail-field canvas that ripples with cursor and scroll, nails rising on the board
illustrations, and a marquee that follows scroll speed and direction.

Visitors who prefer reduced motion get a static, fully visible page; without JavaScript everything is visible too.
Page transitions use native cross-document View Transitions (no JS).

## Deployment

The output is plain static files in `dist/`. The contact form is set up for **Netlify Forms**
(`data-netlify="true"`); on another host, point the form `action` at a form service such as Formspree.
Set the production domain in `astro.config.mjs` (`SITE_URL`) and `public/robots.txt`.
