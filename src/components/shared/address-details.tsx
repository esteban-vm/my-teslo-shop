import type { AddressDB } from '@/schemas/address'
import { Card } from 'rsc-daisyui'

export function AddressDetails({ address: a }: { address: AddressDB }) {
  const { firstName, lastName, city, countryId, phone, address, address2, postalCode } = a

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
