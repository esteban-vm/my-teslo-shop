'use client'

import type { OrderItemDTO } from '@/schemas/order'
import { useRouter } from 'next/navigation'
import { useAction } from 'next-safe-action/hooks'
import { Button, Card, Divider, Skeleton } from 'rsc-daisyui'
import { useShallow } from 'zustand/shallow'
import { placeOrder } from '@/actions/order'
import { useAddressStore, useMounted, useShoppingCart } from '@/hooks'
import { Toasts } from '@/lib/toasts'
import { AddressDetails, SummaryDetails } from '../shared'

export function PlaceOrder() {
  const router = useRouter()
  const { mounted } = useMounted(4)
  const cart = useShoppingCart((s) => s.cart)
  const resetCart = useShoppingCart((s) => s.resetCart)
  const address = useAddressStore(useShallow((s) => s.address))
  const resetAddress = useAddressStore((s) => s.resetAddress)

  const { isExecuting, execute, reset } = useAction(placeOrder, {
    onSettled() {
      reset()
    },
    onExecute() {
      Toasts.execute('Colocando orden')
    },
    onSuccess(args) {
      resetCart()
      resetAddress()
      Toasts.close()
      router.replace(`/orders/${args.data.orderId}`)
    },
    onError(args) {
      const { serverError } = args.error

      if (serverError) {
        Toasts.error(serverError)
      }
    },
  })

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
