import type { ShoppingCartUIProps } from '@/contexts'
import type { Size } from '@/generated/prisma/client'
import { createStore } from 'zustand'

export interface ShoppingCartUIState extends ShoppingCartUIProps {
  size?: Size
  quantity: number
  posted: boolean
  setSize: (size: Size) => void
  decreaseQuantity: () => void
  increaseQuantity: () => void
  setPosted: (posted: boolean) => void
}

export type ShoppingCartUIStore = ReturnType<typeof createShoppingCartUIStore>

export const createShoppingCartUIStore = (initProps: ShoppingCartUIProps) => {
  return createStore<ShoppingCartUIState>()((set, get) => {
    return {
      ...initProps,
      quantity: 1,
      posted: false,
      setSize(size) {
        set({ size })
      },
      decreaseQuantity() {
        const { quantity } = get()
        if (quantity === 1) return
        set({ quantity: quantity - 1 })
      },
      increaseQuantity() {
        const { quantity } = get()
        if (quantity === 5) return
        set({ quantity: quantity + 1 })
      },
      setPosted(posted) {
        set({ posted })
      },
    }
  })
}
