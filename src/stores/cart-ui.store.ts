import type { StateCreator } from 'zustand'
import type { Size } from '@/generated/prisma/client'

export interface CartUIState {
  currentSize: Size | null
  setCurrentSize: (size: Size | null) => void
  isPosted: boolean
  setIsPosted: (posted: boolean) => void
  isAdded: boolean
  setIsAdded: (added: boolean) => void
}

export const createCartUIStore: StateCreator<CartUIState> = (set) => {
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
  }
}
