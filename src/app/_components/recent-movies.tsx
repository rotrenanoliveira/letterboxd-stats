import { getRecentMovies } from '@/http/get-recent-movies-data'
import { CardMovie } from './card-movie'

interface RecentMoviesProps {
  user: string
}

export async function RecentMovies({ user }: RecentMoviesProps) {
  const movies = await getRecentMovies(user)

  return (
    <div className="flex flex-col items-center justify-center md:flex-row md:flex-wrap gap-4">
      {movies.map((movie) => (
        <CardMovie key={movie.guid} movie={movie} />
      ))}
    </div>
  )
}
