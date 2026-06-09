import type { StateCreator } from 'zustand'
import type { Size } from '@/generated/prisma/client'

export interface CartUIState {
  currentSize: Size | null
  isPosted: boolean
  isAdded: boolean
}

export interface CartUIActions {
  setCurrentSize: (size: Size | null) => void
  setIsPosted: (posted: boolean) => void
  setIsAdded: (added: boolean) => void
}

export interface CartUIStore extends CartUIState, CartUIActions {
  reset: () => void
}

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
