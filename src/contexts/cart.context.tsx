'use client'

import type { PropsWithChildren } from 'react'
import type { Product } from '@/generated/prisma/client'
import type { CartContextStore } from '@/stores'
import { createContext, useState } from 'react'
import { createCartContextStore } from '@/stores'

export interface CartProviderBaseProps {
  product: Product & { images: string[] }
}

export const CartContext = createContext<CartContextStore | null>(null)

export function CartProvider({ children, ...props }: PropsWithChildren<CartProviderBaseProps>) {
  const [store] = useState(() => createCartContextStore(props))

  return <CartContext.Provider value={store}>{children}</CartContext.Provider>
}
