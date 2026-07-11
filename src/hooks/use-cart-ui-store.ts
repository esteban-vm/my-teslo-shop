import type { CartUIStore } from '@/stores'
import { create } from 'zustand'
import { createCartUIStore } from '@/stores'

export const useCartUIStore = create<CartUIStore>()(createCartUIStore)
