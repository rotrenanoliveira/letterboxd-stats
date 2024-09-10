'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function userSearchAction(data: FormData) {
  const { username } = Object.fromEntries(data)
  const user = username.toString()

  const response = await fetch(`https://letterboxd.com/${user}/`)
  if (!response.ok) {
    return { success: false, message: 'User not found' }
  }

  cookies().set('letterboxd-user', user, {
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  })

  revalidatePath('/', 'page')

  return { success: true, message: '' }
}

export async function removeUserAction() {
  cookies().delete('letterboxd-user')

  revalidatePath('/', 'page')
  redirect('/')
}
