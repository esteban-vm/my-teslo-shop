import type { ShoppingCartState } from '@/stores'
import { useState } from 'react'
import { useStore } from 'zustand'
import { createShoppingCartStore } from '@/stores'

export function useShoppingCart<T>(selector: (state: ShoppingCartState) => T): T {
  const [store] = useState(createShoppingCartStore)

  return useStore(store, selector)
}
