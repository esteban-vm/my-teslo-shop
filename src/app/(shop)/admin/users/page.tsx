import type { Metadata } from 'next'
import { getUsers } from '@/actions/user'
import { UserTable } from '@/components/admin'
import { PageTitle } from '@/components/shared'

const title = 'Mantenimiento de usuarios'

export const metadata: Metadata = { title }

export default async function UsersPage() {
  const { data: users = [] } = await getUsers()

  return (
    <>
      <PageTitle title={title} />
      <UserTable users={users} />
    </>
  )
}
