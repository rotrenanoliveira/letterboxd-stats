import { XMLParser } from 'fast-xml-parser'
import { z } from 'zod'

const parsedRssSchema = z.object({
  '?xml': z.string(),
  rss: z.object({
    channel: z.object({
      title: z.string(),
      link: z.string(),
      description: z.string(),
      'atom:link': z.string(),
      item: z.array(
        z.object({
          title: z.string(),
          link: z.string(),
          guid: z.string(),
          pubDate: z.string(),
          description: z.string(),
          'dc:creator': z.string(),
        }),
      ),
    }),
  }),
})

const movieSchema = z.object({
  title: z.string(),
  ratting: z.string().nullish(),
  link: z.string(),
  guid: z.string(),
  pubDate: z.string(),
  description: z.string(),
  src: z.string().nullish(),
})

export type Movie = z.infer<typeof movieSchema>

export async function getRecentMovies(user: string) {
  const response = await fetch(`https://letterboxd.com/${user}/rss/`)
  const data = await response.text()

  const parser = new XMLParser()
  const xmlData = parsedRssSchema.parse(parser.parse(data))

  const moviesParsed = xmlData.rss.channel.item.filter((item) => !item.guid.includes('letterboxd-list-'))

  const movies = moviesParsed.map((movie) => {
    const possibleImage = movie.description.match(/<img src="(.*?)"/)
    const imageSrc = possibleImage ? possibleImage[1] : null

    const title = movie.title.split(',')[0]
    const ratting = movie.title.split(' - ').length > 0 ? movie.title.split(' - ')[1] : null

    return movieSchema.parse({
      title,
      ratting,
      link: movie.link,
      guid: movie.guid,
      pubDate: movie.pubDate,
      description: movie.description,
      src: imageSrc,
    })
  })

  return movies
}
