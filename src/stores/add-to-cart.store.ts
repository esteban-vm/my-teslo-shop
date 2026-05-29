import type { AddToCartProps } from '@/contexts'
import type { Size } from '@/generated/prisma/client'
import { createStore } from 'zustand'

export interface AddToCartState extends AddToCartProps {
  size?: Size
  quantity: number
  posted: boolean
  setSize: (size: Size) => void
  decreaseQuantity: () => void
  increaseQuantity: () => void
  setPosted: (posted: boolean) => void
}

export type AddToCartStore = ReturnType<typeof createAddToCartStore>

export const createAddToCartStore = (initProps: AddToCartProps) => {
  return createStore<AddToCartState>()((set, get) => {
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
