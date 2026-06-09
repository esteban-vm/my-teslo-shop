import type { CartUIStore } from '@/stores'
import { create } from 'zustand'
import { createCartUIStore } from '@/stores'

export const useCartUI = create<CartUIStore>()(createCartUIStore)
