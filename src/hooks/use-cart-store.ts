import type { CartStore } from '@/stores'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { createCartStore } from '@/stores'

export const useCartStore = create<CartStore>()(
  devtools(persist(createCartStore, { name: 'teslo-shop/shopping-cart' }))
)
