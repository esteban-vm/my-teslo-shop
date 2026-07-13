export const revalidate = 0

import type { Metadata } from 'next'
import { PageTitle } from '@/components/shared'

export const metadata: Metadata = {
  title: 'Mantenimiento de usuarios',
}

export default function UsersPage() {
  return (
    <>
      <PageTitle title='Mantenimiento de usuarios' />
      <section></section>
    </>
  )
}
