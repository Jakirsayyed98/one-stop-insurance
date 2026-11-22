/**
 * Generates favicons, PWA icons and the social share image from the SVGs in assets-src/brand/.
 * Run after changing the brand artwork:  npm run icons
 * (Output is committed to /public, so this is not part of the normal build.)
 */
import sharp from 'sharp';
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const SRC = 'assets-src/brand';
const OUT = 'public/icons';
mkdirSync(OUT, { recursive: true });

const icon = readFileSync(join(SRC, 'icon.svg'));
const maskable = readFileSync(join(SRC, 'icon-maskable.svg'));
const og = readFileSync(join(SRC, 'og-image.svg'));

const png = (svg: Buffer, size: number, file: string) => sharp(svg, { density: 384 }).resize(size, size).png({ compressionLevel: 9 }).toFile(join(OUT, file));

await png(icon, 16, 'favicon-16.png');
await png(icon, 32, 'favicon-32.png');
await png(icon, 48, 'favicon-48.png');
await png(icon, 192, 'icon-192.png');
await png(icon, 512, 'icon-512.png');
await png(maskable, 512, 'icon-maskable-512.png');
// Apple touch icon: full-bleed (iOS adds its own rounded corners)
await png(maskable, 180, 'apple-touch-icon.png');
await sharp(og, { density: 144 }).resize(1200, 630).png({ compressionLevel: 9 }).toFile(join(OUT, 'og-image.png'));

// favicon.ico (16/32/48) — uses ImageMagick if available, otherwise skips.
try {
  execFileSync('convert', [join(OUT, 'favicon-16.png'), join(OUT, 'favicon-32.png'), join(OUT, 'favicon-48.png'), 'public/favicon.ico']);
} catch {
  console.warn('ImageMagick not found — favicon.ico not regenerated (PNG favicons still work).');
}
console.log('Icons generated in public/icons/');
