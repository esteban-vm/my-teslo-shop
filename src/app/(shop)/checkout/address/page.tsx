import type { Metadata } from 'next'
import { CountryActions } from '@/actions'
import { AddressForm } from '@/components/forms'
import { PageTitle } from '@/components/pages'

export const metadata: Metadata = {
  title: 'Dirección de entrega',
}

export default async function AddressPage() {
  const countries = await CountryActions.getCountries()

  return (
    <>
      <PageTitle title='Dirección' />
      <AddressForm countries={countries} />
    </>
  )
}
