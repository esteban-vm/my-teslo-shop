'use client'

import type { OrderItemDTO } from '@/schemas/order'
import { Button, Card, Divider, Skeleton } from 'rsc-daisyui'
import { useAddressStore, useMounted, usePlaceOrder, useShoppingCart } from '@/hooks'
import { AddressDetails, SummaryDetails } from '../shared'

export function PlaceOrder() {
  const { mounted } = useMounted(4)
  const { isExecuting, execute } = usePlaceOrder()
  const cart = useShoppingCart((s) => s.cart)
  const address = useAddressStore((s) => s.address)

  if (!mounted) {
    return <Skeleton text>Cargando datos de orden</Skeleton>
  }

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
      <Card.Body>
        <AddressDetails />
        <Divider />
        <SummaryDetails />
        <Button disabled={isExecuting} onClick={onPlaceOrder} size='sm' wide>
          Colocar orden
        </Button>
      </Card.Body>
    </Card>
  )
}
