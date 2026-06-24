import type { Metadata } from 'next'
import { AddressForm } from '@/components/forms'
import { PageTitle } from '@/components/pages'

export const metadata: Metadata = {
  title: 'Dirección de entrega',
}

export default function AddressPage() {
  return (
    <>
      <PageTitle title='Dirección' />
      <AddressForm />
    </>
  )
}
