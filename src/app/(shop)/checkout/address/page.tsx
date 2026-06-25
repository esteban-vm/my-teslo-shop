import type { Metadata } from 'next'
import { AddressActions } from '@/actions'
import { AddressForm } from '@/components/forms'
import { PageTitle } from '@/components/pages'

export const metadata: Metadata = {
  title: 'Dirección de entrega',
}

export default async function AddressPage() {
  const { data: address } = await AddressActions.getUserAddress()

  return (
    <>
      <PageTitle title='Dirección' />
      <AddressForm savedAddress={address} />
    </>
  )
}
