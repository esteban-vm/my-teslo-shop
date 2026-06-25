import type { AddressStore } from '@/stores'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { createAddressStore } from '@/stores'

export const useAddressStore = create<AddressStore>()(
  devtools(persist(createAddressStore, { name: 'teslo-shop/current-address' }))
)
