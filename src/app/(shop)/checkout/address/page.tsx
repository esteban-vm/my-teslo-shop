import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBillingAddress } from '@/actions/address'
import { AddressForm } from '@/components/checkout'
import { PageTitle } from '@/components/shared'

const title = 'Dirección de entrega'

export const metadata: Metadata = { title }

export type Props = PageProps<'/checkout/address'>

export default async function Page() {
  const { data: address } = await getBillingAddress()

  if (!address) notFound()

  return (
    <>
      <PageTitle title={title} />
      <AddressForm savedAddress={address} />
    </>
  )
}
