import type { Movie } from '@/http/get-recent-movies-data'
import Image from 'next/image'
import Link from 'next/link'

interface MovieProps {
  movie: Movie
}

export function CardMovie({ movie }: MovieProps) {
  return (
    <Link href={movie.link} className="cursor-pointer" about="_blank">
      <div className="max-w-72 flex flex-col items-center justify-center gap-1 rounded-xl p-2 border border-transparent hover:border-gray-300 transition-colors">
        {movie.src && <Image className="rounded-md" src={movie.src} alt={movie.title} width={288} height={432} />}
        <strong className="max-w-52 truncate">{movie.title}</strong>
        <span>{movie.ratting ?? '-'}</span>
      </div>
    </Link>
  )
}
