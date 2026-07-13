import type { Metadata } from 'next'
import { getUsers } from '@/actions/user'
import { UserTable } from '@/components/admin'
import { PageTitle } from '@/components/shared'

export const metadata: Metadata = {
  title: 'Mantenimiento de usuarios',
}

export default async function UsersPage() {
  const { data: users = [] } = await getUsers()

  return (
    <>
      <PageTitle title='Mantenimiento de usuarios' />
      <UserTable users={users} />
    </>
  )
}
