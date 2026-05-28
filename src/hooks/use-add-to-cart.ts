import type { AddToCartState } from '@/stores'
import { useContext } from 'react'
import { useStore } from 'zustand'
import { AddToCartContext } from '@/contexts'

export function useAddToCart<T>(selector: (state: AddToCartState) => T): T {
  const store = useContext(AddToCartContext)

  if (!store) {
    throw new Error('Se require AddToCartProvider')
  }

  return useStore(store, selector)
}
