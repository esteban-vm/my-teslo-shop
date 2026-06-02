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

    addToCart(product) {
      const { cart } = get()

      const productInCart = cart.some((p) => checkProduct(p, product))

      if (!productInCart) {
        set({ cart: [...cart, product] })
        return
      }

      const updatedCart = cart.map((p) => {
        if (checkProduct(p, product)) {
          return {
            ...p,
            quantity: p.quantity + product.quantity,
          }
        }

        return p
      })

      set({ cart: updatedCart })
    },

    updateQuantity(product, quantity) {
      const { cart } = get()

      const updatedCart = cart.map((p) => {
        if (checkProduct(p, product)) {
          return {
            ...p,
            quantity,
          }
        }

        return p
      })

      set({ cart: updatedCart })
    },

    removeFromCart(product) {
      const { cart } = get()
      const updatedCart = cart.filter((p) => p.id !== product.id || p.size !== product.size)
      set({ cart: updatedCart })
    },
  }
}

function checkProduct(p1: ShoppingCartProduct, p2: ShoppingCartProduct) {
  return p1.id === p2.id && p1.size === p2.size
}
