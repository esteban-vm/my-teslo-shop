import type { Metadata } from 'next'
import { PageTitle } from '@/components/pages'

export const metadata: Metadata = {
  title: 'Mi perfil',
}

export default function ProfilePage() {
  return (
    <>
      <PageTitle title='Mi perfil' />
      <pre>{JSON.stringify({}, null, 2)}</pre>
    </>
  )
}
