import type { CartProviderBaseProps } from '@/contexts'
import type { Size } from '@/generated/prisma/client'
import { createStore } from 'zustand'

export interface CartContextState extends CartProviderBaseProps {
  currentSize?: Size
  setCurrentSize: (size?: Size) => void
  isPosted: boolean
  setIsPosted: (posted: boolean) => void
}

export type CartContextStore = ReturnType<typeof createCartContextStore>

export const createCartContextStore = (initProps: CartProviderBaseProps) => {
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
