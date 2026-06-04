import type { StateCreator } from 'zustand'
import type { Size } from '@/generated/prisma/client'

export interface ShoppingCartProduct {
  id: string
  title: string
  slug: string
  price: number
  quantity: number
  size: Size
  image: string
}

export interface SummaryInformation {
  total: number
  subtotal: number
  tax: number
  totalItems: number
}

export interface ShoppingCartState {
  cart: ShoppingCartProduct[]
  getTotalItems: () => number
  getSummaryInformation: () => SummaryInformation
  addToCart: (product: ShoppingCartProduct) => void
  updateQuantity: (product: ShoppingCartProduct, quantity: number) => void
  removeFromCart: (product: ShoppingCartProduct) => void
}

export const createShoppingCartStore: StateCreator<ShoppingCartState> = (set, get) => {
  return {
    cart: [],

    getTotalItems() {
      const { cart } = get()
      return cart.reduce((total, p) => total + p.quantity, 0)
    },

    getSummaryInformation() {
      const { cart, getTotalItems } = get()
      const subtotal = cart.reduce((st, p) => p.price * p.quantity + st, 0)
      const tax = subtotal * 0.15
      const total = subtotal + tax

      return {
        total,
        subtotal,
        tax,
        totalItems: getTotalItems(),
      }
    },

    addToCart(prod) {
      const { cart } = get()
      const productInCart = cart.some((p) => equals(p, prod))

      if (!productInCart) {
        set({ cart: cart.concat(prod) })
        return
      }

      const updatedCart = cart.map((p) => (equals(p, prod) ? { ...p, quantity: p.quantity + prod.quantity } : p))
      set({ cart: updatedCart })
    },

    updateQuantity(prod, quantity) {
      const { cart } = get()
      const updatedCart = cart.map((p) => (equals(p, prod) ? { ...p, quantity } : p))
      set({ cart: updatedCart })
    },

    removeFromCart(prod) {
      const { cart } = get()
      const updatedCart = cart.filter((p) => !equals(p, prod))
      set({ cart: updatedCart })
    },
  }
}

function equals(p1: ShoppingCartProduct, p2: ShoppingCartProduct) {
  return p1.id === p2.id && p1.size === p2.size
}
