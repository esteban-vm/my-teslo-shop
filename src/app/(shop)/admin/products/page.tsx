export const revalidate = 0

import type { Metadata } from 'next'
import { PageTitle } from '@/components/shared'

const title = 'Mantenimiento de productos'

export const metadata: Metadata = { title }

export default function ProductsPage() {
  return (
    <>
      <PageTitle title={title} />
      <section></section>
    </>
  )
}
