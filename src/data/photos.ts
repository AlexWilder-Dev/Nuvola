// Nuvola's own photos (nuvolapizza.co.uk) and the Boxpark Croydon shoot. Keys are referenced from nuvola.ts.
const files = import.meta.glob<string>('../assets/photos/*.jpg', { eager: true, import: 'default' })

export const photos: Record<string, string> = Object.fromEntries(
  Object.entries(files).map(([path, url]) => [path.split('/').pop()!.replace('.jpg', ''), url]),
)
