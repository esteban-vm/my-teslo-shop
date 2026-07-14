import type { Metadata } from 'next'
import { PageTitle } from '@/components/shared'

export const metadata: Metadata = {
  title: 'Mantenimiento de productos',
}

export default function ProductsPage() {
  return (
    <>
      <PageTitle title='Mantenimiento de productos' />
      <section></section>
    </>
  )
}
