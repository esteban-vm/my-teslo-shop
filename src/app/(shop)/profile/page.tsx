import type { Metadata } from 'next'
import { PageTitle } from '@/components/shared'
import { getSession } from '@/lib/auth'

const title = 'Mi perfil'

export const metadata: Metadata = { title }

export type Props = PageProps<'/profile'>

export default async function Page() {
  const session = await getSession()

  return (
    <>
      <PageTitle title={title} />
      <pre>{JSON.stringify(session?.user, null, 2)}</pre>
    </>
  )
}
