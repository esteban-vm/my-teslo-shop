import type { ShoppingCartState } from '@/stores'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { createShoppingCartStore } from '@/stores'

export const useShoppingCart = create<ShoppingCartState>()(
  persist(createShoppingCartStore, { name: 'teslo-shop/shopping-cart' })
)
