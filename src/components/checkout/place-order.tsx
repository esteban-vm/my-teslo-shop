'use client'

import { Button, Card, Divider, Skeleton } from 'rsc-daisyui'
import tw from 'tailwind-styled-components'
import { useShallow } from 'zustand/shallow'
import { useAddressStore, useMounted, useShoppingCart } from '@/hooks'
import { formatProductPrice } from '@/lib/helpers'

export function PlaceOrder() {
  const { mounted } = useMounted(4)
  const address = useAddressStore((s) => s.address)
  const info = useShoppingCart(useShallow((s) => s.getSummaryInformation()))

  if (!mounted) {
    return <Skeleton text>Cargando datos de orden</Skeleton>
  }

  const { total, subtotal, tax, totalItems } = info
  const { firstName, lastName, city, countryId, phone, ...rest } = address

  return (
    <Container $as={Card}>
      <Card.Body className='px-4 pt-2 pb-3'>
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
        <Divider className='my-0' />
        <Card.Title>Resumen de orden</Card.Title>
        <div>
          <p>
            Nro. de artículos:
            <span className='float-end'>{totalItems}</span>
          </p>
          <p>
            Subtotal:<span className='float-end'>{formatProductPrice(subtotal)}</span>
          </p>
          <p>
            Impuestos (15%):<span className='float-end'>{formatProductPrice(tax)}</span>
          </p>
          <p className='mt-1 font-semibold text-base'>
            Total:<span className='float-end'>{formatProductPrice(total)}</span>
          </p>
        </div>
        <Button className='mx-auto' size='sm' wide>
          Colocar orden
        </Button>
      </Card.Body>
    </Container>
  )
}

const Container = tw.div`mx-auto not-lg:max-w-md border border-primary/25 p-2 shadow-md lg:w-full`
