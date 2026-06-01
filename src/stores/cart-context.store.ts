import type { Size } from '@/generated/prisma/client'
import type { PropsWithProduct } from '@/types'
import { createStore } from 'zustand'

export interface CartContextState extends PropsWithProduct {
  currentSize?: Size
  setCurrentSize: (size?: Size) => void
  isPosted: boolean
  setIsPosted: (posted: boolean) => void
}

export type CartContextStore = ReturnType<typeof createCartContextStore>

export const createCartContextStore = (initProps: PropsWithProduct) => {
  return createStore<CartContextState>()((set) => {
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
