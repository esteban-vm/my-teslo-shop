'use client'

import type { PropsWithChildren } from 'react'
import type { CartContextStore } from '@/stores'
import type { PropsWithProduct } from '@/types'
import { createContext, useState } from 'react'
import { createCartContextStore } from '@/stores'

export const CartContext = createContext<CartContextStore | null>(null)

export function CartProvider({ children, ...props }: PropsWithChildren<PropsWithProduct>) {
  const [store] = useState(() => createCartContextStore(props))

  return <CartContext.Provider value={store}>{children}</CartContext.Provider>
}
