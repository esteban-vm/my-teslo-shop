import type { AddToCartProps } from '@/contexts'
import type { Size } from '@/generated/prisma/client'
import { createStore } from 'zustand'

export interface AddToCartState extends AddToCartProps {
  size?: Size
  quantity: number
  setSize: (size: Size) => void
  decrement: () => void
  increment: () => void
}

export type AddToCartStore = ReturnType<typeof createAddToCartStore>

export const createAddToCartStore = (initProps: AddToCartProps) => {
  return createStore<AddToCartState>()((set, get) => {
    return {
      ...initProps,
      quantity: 1,
      setSize(size) {
        set({ size })
      },
      decrement() {
        const { quantity } = get()
        if (quantity === 1) return
        set({ quantity: quantity - 1 })
      },
      increment() {
        const { quantity } = get()
        if (quantity === 5) return
        set({ quantity: quantity + 1 })
      },
    }
  })
}
