// Central business info. Everything a non-developer may need to change lives here.
// Items marked TODO are waiting for real data (see docs/BRAND-INPUT.md).

export const site = {
  name: 'UKEMI',
  kanji: '受身',
  tagline: "Stronger than you've ever been.",
  description:
    'UKEMI sadhu boards — precision nail boards for a daily practice of focus, stillness and resilience. Stronger than you’ve ever been.',
  email: 'hello@ukemi.example', // TODO: real contact email
  wholesaleEmail: 'wholesale@ukemi.example', // TODO
  social: [
    { label: 'Instagram', href: '#' }, // TODO
    { label: 'TikTok', href: '#' }, // TODO
    { label: 'YouTube', href: '#' }, // TODO
  ],
  // Where customers can buy (the site itself has no checkout).
  // Leave empty to send every "buy" CTA to the contact form.
  whereToBuy: [] as { label: string; href: string }[],
};

export const nav = [
  { label: 'Boards', href: '/boards/' },
  { label: 'The Practice', href: '/practice/' },
  { label: 'Our Story', href: '/about/' },
];

// The four states of the brand palette — the UKEMI colour philosophy.
export const philosophy = [
  {
    key: 'charcoal',
    name: 'Charcoal',
    hex: '#0F1317',
    title: 'The Fight.',
    words: 'The pain. The uncertainty.',
    body: 'The first seconds on the nails, when every part of you says step off.',
  },
  {
    key: 'ice',
    name: 'Ice',
    hex: '#344A59',
    title: 'Control.',
    words: 'Composure. Discipline.',
    body: 'The breath slows. The mind discovers it can stay.',
  },
  {
    key: 'stone',
    name: 'Stone',
    hex: '#9CA1A4',
    title: 'Foundation.',
    words: 'Stability. Endurance.',
    body: 'What you repeat becomes what you are built on.',
  },
  {
    key: 'growth',
    name: 'Growth',
    hex: '#7A9E39',
    title: 'Growth.',
    words: 'Hope. Evolution. Life.',
    body: 'You step off — and something in you has grown.',
  },
] as const;

// SAMPLE testimonials — replace with real, approved customer quotes before launch.
export const testimonials = [
  {
    quote:
      'The first minute felt impossible. A month later it is the quietest part of my day.',
    name: 'Customer name',
    place: 'City, Country',
  },
  {
    quote:
      'I train hard, but this taught me something else — how to stay calm when it hurts.',
    name: 'Customer name',
    place: 'City, Country',
  },
  {
    quote: 'Beautifully made. It lives in my living room, not in a cupboard.',
    name: 'Customer name',
    place: 'City, Country',
  },
];
