import type { ShoppingCartUIProps } from '@/contexts'
import type { Size } from '@/generated/prisma/client'
import { createStore } from 'zustand'

export interface ShoppingCartUIState extends ShoppingCartUIProps {
  currentSize?: Size
  quantity: number
  isPosted: boolean
  setCurrentSize: (size: Size) => void
  decreaseQuantity: () => void
  increaseQuantity: () => void
  setIsPosted: (posted: boolean) => void
}

export type ShoppingCartUIStore = ReturnType<typeof createShoppingCartUIStore>

export const createShoppingCartUIStore = (initProps: ShoppingCartUIProps) => {
  return createStore<ShoppingCartUIState>()((set, get) => {
    return {
      ...initProps,
      quantity: 1,
      isPosted: false,
      setCurrentSize(size) {
        set({ currentSize: size })
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
      setIsPosted(posted) {
        set({ isPosted: posted })
      },
    }
  })
}
