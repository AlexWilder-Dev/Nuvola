// One-off: resize the researched photos in research/photos into web-sized JPGs.
import sharp from 'sharp'
import { mkdirSync } from 'node:fs'

const src = 'research/photos/'
const out = 'src/assets/photos/'
mkdirSync(out, { recursive: true })

// Only the photos the site uses; the rest stay in research/photos.
const photos = {
  'margherita-oven': 'site-hero-image.jpg',
  'brixton-arcade': 'site-12.jpg',
  'croydon-unit': 'site-01-new.jpg',
  'croydon-boxpark-pizza': 'site-02-new.jpg',
  'chef-dough': 'site-chef-fatjon.jpg',
  'studio-ham-mushroom': 'boxpark-1767778311-nuvola-pizza-ham.jpg',
  'studio-margherita': 'boxpark-1767778328-nuvola-pizza-margherita.jpg',
  'studio-aubergine': 'boxpark-1767778353-nuvola-pizza-aubergine.jpg',
  'studio-mushroom-truffle': 'boxpark-1767778367-nuvola-pizza-mushroom.jpg',
  'studio-pepperoni': 'boxpark-1767778379-nuvola-pizza-pepe.jpg',
  'studio-nduja-pesto': 'boxpark-1767778398-nuvola-pizza-nduja.jpg',
  'studio-artichoke-olives': 'boxpark-1767778410-nuvola-pizza-arti.jpg',
}

for (const [name, file] of Object.entries(photos)) {
  const img = sharp(src + file).rotate()
  const { width = 0, height = 0 } = await img.metadata()
  const long = Math.max(width, height)
  const target = Math.min(long, 1400)
  await img
    .resize(width >= height ? { width: target } : { height: target })
    .jpeg({ quality: 76, mozjpeg: true, progressive: true })
    .toFile(`${out}${name}.jpg`)
  console.log(name, width, height)
}

// Square crop of the top-down Brixton pizza, shown round under the cloud in the dough sequence.
await sharp(src + 'site-08.jpg')
  .extract({ left: 30, top: 205, width: 1147, height: 1147 })
  .resize(900, 900)
  .jpeg({ quality: 78, mozjpeg: true, progressive: true })
  .toFile(`${out}pizza-round.jpg`)
console.log('pizza-round')
