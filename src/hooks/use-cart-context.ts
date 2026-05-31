import type { CartContextState } from '@/stores'
import { useContext } from 'react'
import { useStore } from 'zustand'
import { CartContext } from '@/contexts'

export function useCartContext<T>(selector: (state: CartContextState) => T): T {
  const store = useContext(CartContext)

  if (!store) {
    throw new Error('CartContext is missing')
  }

  return useStore(store, selector)
}
