import type { Metadata } from 'next'
import { getBillingAddress } from '@/actions/address'
import { AddressForm } from '@/components/forms'
import { PageTitle } from '@/components/pages'

export const metadata: Metadata = {
  title: 'Dirección de entrega',
}

export default async function AddressPage() {
  const { data: address } = await getBillingAddress()

  return (
    <>
      <PageTitle title='Dirección' />
      <AddressForm savedAddress={address} />
    </>
  )
}
