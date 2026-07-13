import type { Metadata } from 'next'
import { PageTitle } from '@/components/shared'
import { getSession } from '@/lib/auth'

export const metadata: Metadata = {
  title: 'Mi perfil',
}

export default async function ProfilePage() {
  const session = await getSession()

  return (
    <>
      <PageTitle title='Mi perfil' />
      <pre>{JSON.stringify(session?.user, null, 2)}</pre>
    </>
  )
}
