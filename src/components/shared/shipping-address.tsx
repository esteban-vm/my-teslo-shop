'use client'

import { Card } from 'rsc-daisyui'
import { useShallow } from 'zustand/shallow'
import { useAddressStore } from '@/hooks'

export function ShippingAddress() {
  const address = useAddressStore(useShallow((s) => s.address))
  const { firstName, lastName, city, countryId, phone, ...rest } = address

  return (
    <>
      <Card.Title>Dirección de entrega</Card.Title>
      <div>
        <p>
          {firstName} {lastName}
        </p>
        {Object.values(rest).map((value) => (
          <p key={crypto.randomUUID()}>{value}</p>
        ))}
        <p>
          {city}, {countryId}
        </p>
        <p>{phone}</p>
      </div>
    </>
  )
}
