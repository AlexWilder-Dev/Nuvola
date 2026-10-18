// One-off: builds public/og.jpg (1200x630) for link previews, plus the favicons.
// Photo: Nuvola's margherita at the mouth of the Brixton oven. Marks: the fascia wordmark and the cloud mural.
import sharp from 'sharp'
import opentype from 'opentype.js'
import { readFileSync, statSync } from 'node:fs'

const W = 1200
const H = 630
const PHOTO_W = 600

const fascia = '#f3f0e8'
const sky = '#4a8fc4'
const cobalt = '#0d4a8b'
const ink = '#15263a'

const bold = opentype.parse(readFileSync('node_modules/@fontsource/figtree/files/figtree-latin-700-normal.woff').buffer)
const medium = opentype.parse(readFileSync('node_modules/@fontsource/figtree/files/figtree-latin-600-normal.woff').buffer)

// Text as outlines so the render never depends on installed fonts.
function textPath(font, text, x, y, size, fill, tracking = 0) {
  let cursor = x
  let d = ''
  for (const ch of text) {
    const glyph = font.charToGlyph(ch)
    d += glyph.getPath(cursor, y, size).toPathData(2)
    cursor += (glyph.advanceWidth / font.unitsPerEm) * size + tracking
  }
  return `<path fill="${fill}" d="${d}"/>`
}

function inner(svgFile) {
  const s = readFileSync(svgFile, 'utf8')
  const viewBox = s.match(/viewBox="([^"]+)"/)[1].split(' ').map(Number)
  const body = s.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '')
  return { viewBox, body }
}

const word = inner('src/assets/nuvola-wordmark.svg')
const cloud = inner('src/assets/cloud.svg')

const wordW = 470
const wordH = (word.viewBox[3] / word.viewBox[2]) * wordW
const cloudW = 150
const cloudH = (cloud.viewBox[3] / cloud.viewBox[2]) * cloudW

const left = 64
const overlay = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W - PHOTO_W}" height="${H}" fill="${fascia}"/>
  <svg x="${left}" y="64" width="${cloudW}" height="${cloudH}" viewBox="${cloud.viewBox.join(' ')}">${cloud.body}</svg>
  <svg x="${left - 6}" y="${86 + cloudH}" width="${wordW}" height="${wordH}" viewBox="${word.viewBox.join(' ')}" color="${sky}">${word.body.replace(/currentColor/g, sky)}</svg>
  ${textPath(bold, 'BIGA PIZZA', left, 86 + cloudH + wordH + 54, 30, cobalt, 7)}
  <rect x="${left}" y="${H - 150}" width="${W - PHOTO_W - left * 2}" height="2" fill="${ink}" opacity="0.18"/>
  ${textPath(medium, '4 Market Row, Brixton Village', left, H - 104, 26, ink)}
  ${textPath(medium, 'Boxpark Croydon, 99 George Street', left, H - 66, 26, ink)}
</svg>`

const photo = await sharp('research/photos/site-hero-image.jpg')
  .extract({ left: 0, top: 250, width: 1200, height: 1200 })
  .resize(PHOTO_W, H, { fit: 'cover', position: 'centre' })
  .toBuffer()

await sharp({ create: { width: W, height: H, channels: 3, background: fascia } })
  .composite([
    { input: photo, left: W - PHOTO_W, top: 0 },
    { input: Buffer.from(overlay), left: 0, top: 0 },
  ])
  .jpeg({ quality: 82, mozjpeg: true, progressive: true })
  .toFile('public/og.jpg')

const meta = await sharp('public/og.jpg').metadata()
console.log('og.jpg', meta.width, 'x', meta.height, Math.round(statSync('public/og.jpg').size / 1024) + 'KB')

// Favicons from the cloud mural.
const cloudSquare = (size, pad, bg) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  ${bg ? `<rect width="${size}" height="${size}" fill="${bg}"/>` : ''}
  <svg x="${pad}" y="${pad}" width="${size - pad * 2}" height="${size - pad * 2}" viewBox="${cloud.viewBox.join(' ')}" preserveAspectRatio="xMidYMid meet">${cloud.body}</svg>
</svg>`

await sharp(Buffer.from(cloudSquare(180, 18, fascia))).png().toFile('public/apple-touch-icon.png')
await sharp(Buffer.from(cloudSquare(64, 2, null))).png().toFile('public/favicon-64.png')
await sharp(Buffer.from(cloudSquare(32, 1, null))).png().toFile('public/favicon-32.png')
console.log('favicons written')
