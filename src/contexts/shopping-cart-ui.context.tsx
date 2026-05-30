'use client'

import type { PropsWithChildren } from 'react'
import type { Product } from '@/generated/prisma/client'
import type { ShoppingCartUIStore } from '@/stores'
import { createContext, useState } from 'react'
import { createShoppingCartUIStore } from '@/stores'

export interface ShoppingCartUIProps {
  product: Product & { images: string[] }
}

export type ShoppingCartUIProviderProps = PropsWithChildren<ShoppingCartUIProps>

export const ShoppingCartUIContext = createContext<ShoppingCartUIStore | null>(null)

export function ShoppingCartUIProvider({ children, ...props }: ShoppingCartUIProviderProps) {
  const [store] = useState(() => createShoppingCartUIStore(props))

  return <ShoppingCartUIContext.Provider value={store}>{children}</ShoppingCartUIContext.Provider>
}
