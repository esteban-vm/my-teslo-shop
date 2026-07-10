import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { PageTitle } from '@/components/shared'

export const metadata: Metadata = {
  title: 'Mi perfil',
}

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect('/auth/login')

  return (
    <>
      <PageTitle title='Mi perfil' />
      <pre>{JSON.stringify(session.user, null, 2)}</pre>
    </>
  )
}
