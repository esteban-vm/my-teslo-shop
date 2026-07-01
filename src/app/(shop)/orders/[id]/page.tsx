import type { Metadata } from 'next'
import { PageTitle } from '@/components/pages'

type OrderPageProps = PageProps<'/orders/[id]'>

export const metadata: Metadata = {
  title: 'Mi orden #',
}

export default async function OrderPage({ params }: OrderPageProps) {
  const { id } = await params

  return (
    <>
      <PageTitle title={`Orden #${id}`} />
      <section data-shop></section>
    </>
  )
}
