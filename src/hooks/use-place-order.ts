import { useRouter } from 'next/navigation'
import { useAction } from 'next-safe-action/hooks'
import { placeOrder } from '@/actions/order'
import { Toasts } from '@/lib/toasts'
import { useAddressStore } from './use-address-store'
import { useCartStore } from './use-cart-store'

export function usePlaceOrder() {
  const router = useRouter()
  const resetCart = useCartStore((s) => s.resetCart)
  const resetAddress = useAddressStore((s) => s.resetAddress)

  const hookReturn = useAction(placeOrder, {
    onSettled() {
      hookReturn.reset()
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
      if (serverError) Toasts.error(serverError)
    },
  })

  return hookReturn
}
