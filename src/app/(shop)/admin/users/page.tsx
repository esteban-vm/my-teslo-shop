export const revalidate = 0

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getUsers } from '@/actions/user'
import { UserTable } from '@/components/admin'
import { PagePagination, PageTitle } from '@/components/shared'
import { getSearchParams } from '@/lib/helpers'

const title = 'Mantenimiento de usuarios'

export const metadata: Metadata = { title }

export type Props = PageProps<'/admin/users'>

export default async function Page({ searchParams }: Props) {
  const { page } = await getSearchParams(searchParams)

  const { data } = await getUsers({ page })
  if (!data) notFound()

  const { users, totalPages } = data

  return (
    <>
      <PageTitle title={title} />
      <UserTable users={users} />
      <PagePagination totalPages={totalPages} />
    </>
  )
}
