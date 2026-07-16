import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { getUsers } from '@/actions/user'
import { UserTable } from '@/components/admin'
import { PagePagination, PageTitle } from '@/components/shared'

const title = 'Mantenimiento de usuarios'

export const metadata: Metadata = { title }

export default async function UsersPage({ searchParams }: PageProps<'/admin/users'>) {
  let { page = '1' } = await searchParams
  if (Array.isArray(page)) page = '1'

  const { data } = await getUsers({ page: Number.parseInt(page, 10) })
  if (!data) notFound()

  const { users, totalPages } = data
  if (users.length === 0) redirect('/admin/users')

  return (
    <>
      <PageTitle title={title} />
      <UserTable users={users} />
      <PagePagination totalPages={totalPages} />
    </>
  )
}
