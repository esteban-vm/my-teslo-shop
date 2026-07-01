import type { StateCreator } from 'zustand'
import type { CartProduct, OrderSummary } from '@/types'
import { isSameProduct } from '@/lib/helpers'

interface ShoppingCartState {
  cart: CartProduct[]
}

interface ShoppingCartActions {
  getTotalItems: () => number
  getOrderSummary: () => OrderSummary
  addToCart: (product: CartProduct) => void
  updateQuantity: (product: CartProduct, quantity: number) => void
  removeFromCart: (product: CartProduct) => void
  resetCart: () => void
}

export type ShoppingCartStore = ShoppingCartState & ShoppingCartActions

export const createShoppingCartStore: StateCreator<ShoppingCartStore> = (set, get, store) => {
  return {
    cart: [],

    getTotalItems() {
      const { cart } = get()
      return cart.reduce((total, p) => total + p.quantity, 0)
    },

    getOrderSummary() {
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
      const productInCart = cart.some((p) => isSameProduct(p, product))

      if (!productInCart) {
        set({ cart: cart.concat(product) })
        return
      }

      const updatedCart = cart.map((p) => {
        return isSameProduct(p, product) ? { ...p, quantity: p.quantity + product.quantity } : p
      })

      set({ cart: updatedCart })
    },

    updateQuantity(product, quantity) {
      const { cart } = get()
      const updatedCart = cart.map((p) => (isSameProduct(p, product) ? { ...p, quantity } : p))
      set({ cart: updatedCart })
    },

    removeFromCart(product) {
      const { cart } = get()
      const updatedCart = cart.filter((p) => !isSameProduct(p, product))
      set({ cart: updatedCart })
    },

    resetCart() {
      set(store.getInitialState())
    },
  }
}
