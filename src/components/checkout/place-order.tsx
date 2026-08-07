'use client'

import type { OrderItem } from '@/schemas/order'
import { Button, Card, Divider, Skeleton } from 'rsc-daisyui'
import { useShallow } from 'zustand/shallow'
import { useAddressStore, useCartStore, useMounted, usePlaceOrder } from '@/hooks'
import { AddressDetails, SummaryDetails } from '../shared'

export function PlaceOrder() {
  const { mounted } = useMounted(4)
  const { isExecuting, execute } = usePlaceOrder()
  const cart = useCartStore((s) => s.cart)
  const address = useAddressStore((s) => s.address)
  const summary = useCartStore(useShallow((s) => s.getOrderSummary()))

  if (!mounted) {
    return <Skeleton text>Cargando datos de orden</Skeleton>
  }

  const onPlaceOrder = () => {
    const items: OrderItem[] = cart.map((item) => {
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
        <AddressDetails address={address} />
        <Divider />
        <SummaryDetails summary={summary} />
        <Button disabled={isExecuting} onClick={onPlaceOrder} size='sm' wide>
          Colocar orden
        </Button>
      </Card.Body>
    </Card>
  )
}
