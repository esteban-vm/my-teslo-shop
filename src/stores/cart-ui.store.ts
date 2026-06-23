import type { StateCreator } from 'zustand'
import type { Size } from '@/prisma/generated/client'

interface CartUIState {
  currentSize: Size | null
  isPosted: boolean
  isAdded: boolean
}

interface CartUIActions {
  setCurrentSize: (size: Size | null) => void
  setIsPosted: (posted: boolean) => void
  setIsAdded: (added: boolean) => void
  reset: () => void
}

export type CartUIStore = CartUIState & CartUIActions

export const createCartUIStore: StateCreator<CartUIStore> = (set, _, store) => {
  return {
    currentSize: null,
    setCurrentSize(size) {
      set({ currentSize: size })
    },

    isPosted: false,
    setIsPosted(posted) {
      set({ isPosted: posted })
    },

    isAdded: false,
    setIsAdded(added) {
      set({ isAdded: added })
    },

    reset() {
      set(store.getInitialState())
    },
  }
}
