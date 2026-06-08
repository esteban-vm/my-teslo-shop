import type { CartUIState } from '@/stores'
import { create } from 'zustand'
import { createCartUIStore } from '@/stores'

export const useCartUI = create<CartUIState>()(createCartUIStore)
