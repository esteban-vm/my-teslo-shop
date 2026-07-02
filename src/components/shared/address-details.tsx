'use client'

import type { AddressDTO } from '@/schemas/address'
import { Card } from 'rsc-daisyui'
import { useShallow } from 'zustand/shallow'
import { useAddressStore } from '@/hooks'

export function AddressDetails({ savedAddress }: { savedAddress?: AddressDTO }) {
  const storedAddress = useAddressStore(useShallow((s) => s.address))
  const addressDetails = savedAddress ?? storedAddress
  const { firstName, lastName, city, countryId, phone, address, address2, postalCode } = addressDetails

  return (
    <>
      <Card.Title>Dirección de entrega</Card.Title>
      <div>
        <p>
          {firstName} {lastName}
        </p>
        <p>{address}</p>
        <p>{address2}</p>
        <p>{postalCode}</p>
        <p>
          {city}, {countryId}
        </p>
        <p>{phone}</p>
      </div>
    </>
  )
}
