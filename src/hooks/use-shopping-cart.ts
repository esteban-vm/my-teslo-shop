import type { ShoppingCartState } from '@/stores'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { createShoppingCartStore } from '@/stores'

export const useShoppingCart = create<ShoppingCartState>()(
  devtools(persist(createShoppingCartStore, { name: 'teslo-shop/shopping-cart' }))
)
