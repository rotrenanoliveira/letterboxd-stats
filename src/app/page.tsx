import { UserForm } from './_components/user-form'

import letterboxd from '../assets/letterboxd.svg'

import Image from 'next/image'
import { cookies } from 'next/headers'
import { RecentMovies } from '@/app/_components/recent-movies'
import { UserProfile } from '@/app/_components/user-profile'

export default async function Home() {
  const user = cookies().get('letterboxd-user')?.value

  return (
    <main className="flex flex-col items-center justify-center px-6 py-12 sm:py-16 lg:px-8 gap-8">
      <div className="flex items-center gap-4">
        <Image src={letterboxd} alt="letterboxd logo" width={166} height={90} />
        {user && <UserProfile user={user} />}
      </div>
      <UserForm user={user} />

      {/* <Movies /> */}
      {user && <RecentMovies user={user} />}
    </main>
  )
}
