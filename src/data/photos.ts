import type { ImageMetadata } from 'astro';

// Every image in src/assets/images is available by its file name (without extension).
// A slot whose photo is missing keeps showing its placeholder, so photos can arrive one by one.
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/images/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
});

const byName = new Map(
  Object.entries(files).map(([path, mod]) => [path.split('/').pop()!.replace(/\.[^.]+$/, ''), mod.default]),
);

export const photo = (name: string): ImageMetadata | undefined => byName.get(name);
