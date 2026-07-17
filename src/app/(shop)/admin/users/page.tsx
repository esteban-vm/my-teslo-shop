import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { getUsers } from '@/actions/user'
import { UserTable } from '@/components/admin'
import { PagePagination, PageTitle } from '@/components/shared'
import { getPageNumber } from '@/lib/helpers'

const title = 'Mantenimiento de usuarios'

export const metadata: Metadata = { title }

export default async function UsersPage({ searchParams }: PageProps<'/admin/users'>) {
  const page = await getPageNumber(searchParams)

  const { data } = await getUsers({ page })
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
