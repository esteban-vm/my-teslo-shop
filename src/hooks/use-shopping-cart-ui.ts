import type { ShoppingCartUIState } from '@/stores'
import { useContext } from 'react'
import { useStore } from 'zustand'
import { ShoppingCartUIContext } from '@/contexts'

export function useShoppingCartUI<T>(selector: (state: ShoppingCartUIState) => T): T {
  const store = useContext(ShoppingCartUIContext)

  if (!store) {
    throw new Error('ShoppingCartUIContext missing')
  }

  return useStore(store, selector)
}
