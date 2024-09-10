import { getUserProfileSrc } from '@/http/get-user-profile'
import Image from 'next/image'

interface UserProps {
  user: string
}

export async function UserProfile({ user }: UserProps) {
  const userData = await getUserProfileSrc(user)

  return (
    <div className="flex flex-col items-center gap-2">
      {userData ? (
        <Image src={userData} alt="" className="rounded-[48px]" width={96} height={96} />
      ) : (
        <div className="rounded-[48px] bg-gray-200 w-24 h-24 flex items-center justify-center">
          <span className="text-xl">{user.substring(0, 1).toUpperCase()}</span>
        </div>
      )}
    </div>
  )
}
