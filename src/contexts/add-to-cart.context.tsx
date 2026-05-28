'use client'

import type { PropsWithChildren } from 'react'
import type { Size } from '@/generated/prisma/client'
import type { AddToCartStore } from '@/stores'
import { createContext, useState } from 'react'
import { createAddToCartStore } from '@/stores'

export interface AddToCartProps {
  sizes: Size[]
}

export const AddToCartContext = createContext<AddToCartStore | null>(null)

export type AddToCartProviderProps = PropsWithChildren<AddToCartProps>

export function AddToCartProvider({ children, ...props }: AddToCartProviderProps) {
  const [store] = useState(() => createAddToCartStore(props))

  return <AddToCartContext.Provider value={store}>{children}</AddToCartContext.Provider>
}
