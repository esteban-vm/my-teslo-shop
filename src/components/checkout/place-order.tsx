'use client'

import type { OrderItemDTO } from '@/schemas/order'
import { useAction } from 'next-safe-action/hooks'
import { Button, Card, Divider, Skeleton } from 'rsc-daisyui'
import { useShallow } from 'zustand/shallow'
import { placeOrder } from '@/actions/order'
import { useAddressStore, useMounted, useShoppingCart } from '@/hooks'
import { formatProductPrice } from '@/lib/helpers'

export function PlaceOrder() {
  const { mounted } = useMounted(4)
  const cart = useShoppingCart((s) => s.cart)
  const address = useAddressStore((s) => s.address)
  const { isExecuting, execute } = useAction(placeOrder)
  const summary = useShoppingCart(useShallow((s) => s.getOrderSummary()))

  if (!mounted) {
    return <Skeleton text>Cargando datos de orden</Skeleton>
  }

  const { total, subtotal, tax, totalItems } = summary
  const { firstName, lastName, city, countryId, phone, ...rest } = address

  const onPlaceOrder = () => {
    const items: OrderItemDTO[] = cart.map((item) => {
      return {
        productId: item.id,
        quantity: item.quantity,
        size: item.size,
      }
    })

    execute({ items, address })
  }

  return (
    <Card>
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
        <Button className='mx-auto' disabled={isExecuting} onClick={onPlaceOrder} size='sm' wide>
          Colocar orden
        </Button>
      </Card.Body>
    </Card>
  )
}
