'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTransition } from 'react'

import { removeUserAction, userSearchAction } from '../actions'
import { Loader2, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

interface UserFormProps {
  user?: string
}

export function UserForm({ user }: UserFormProps) {
  const [isPending, startTransition] = useTransition()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    startTransition(async () => {
      const formData = new FormData(event.currentTarget)

      const response = await userSearchAction(formData)
      if (!response.success) {
        toast.error(response.message)
      }
    })
  }

  function handleRemoveUser() {
    startTransition(async () => {
      await removeUserAction()
    })
  }

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <Input name="username" placeholder="letterboxd username" defaultValue={user} />
      <Button disabled={isPending} type="submit">
        {isPending ? <Loader2 className="size-4 animate-spin" /> : 'Search'}
      </Button>

      {user && (
        <Button disabled={isPending} className="p-3" variant="outline" onClick={handleRemoveUser}>
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Trash2 className="size-4 text-destructive" strokeWidth={1.25} />
          )}
        </Button>
      )}
    </form>
  )
}
