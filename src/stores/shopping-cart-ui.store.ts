import type { ShoppingCartUIProps } from '@/contexts'
import type { Size } from '@/generated/prisma/client'
import { createStore } from 'zustand'

export interface ShoppingCartUIState extends ShoppingCartUIProps {
  currentSize?: Size
  setCurrentSize: (size?: Size) => void
  isPosted: boolean
  setIsPosted: (posted: boolean) => void
}

export type ShoppingCartUIStore = ReturnType<typeof createShoppingCartUIStore>

export const createShoppingCartUIStore = (initProps: ShoppingCartUIProps) => {
  return createStore<ShoppingCartUIState>()((set) => {
    return {
      ...initProps,
      setCurrentSize(size) {
        set({ currentSize: size })
      },
      isPosted: false,
      setIsPosted(posted) {
        set({ isPosted: posted })
      },
    }
  })
}
