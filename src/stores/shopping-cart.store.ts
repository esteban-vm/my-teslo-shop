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

export interface ShoppingCartState {
  cart: ShoppingCartProduct[]
  getTotalItems: () => number
  addToCart: (product: ShoppingCartProduct) => void
  updateQuantity: (product: ShoppingCartProduct, quantity: number) => void
  removeFromCart: (product: ShoppingCartProduct) => void
}

export const createShoppingCartStore: StateCreator<ShoppingCartState> = (set, get) => {
  return {
    cart: [],

    getTotalItems() {
      const { cart } = get()
      return cart.reduce((total, item) => total + item.quantity, 0)
    },

    addToCart(product) {
      const { cart } = get()

      // 1. Revisar si el producto existe en el carrito con la talla seleccionada
      const productInCart = cart.some((item) => checkProduct(item, product))

      if (!productInCart) {
        set({ cart: [...cart, product] })
        return
      }

      // 2. Si el producto existe con la talla, incrementar la cantidad
      const updatedCart = cart.map((item) => {
        if (checkProduct(item, product)) {
          return {
            ...item,
            quantity: item.quantity + product.quantity,
          }
        }

        return item
      })

      set({ cart: updatedCart })
    },

    updateQuantity(product, quantity) {
      const { cart } = get()

      const updatedCart = cart.map((item) => {
        if (checkProduct(item, product)) {
          return {
            ...item,
            quantity,
          }
        }

        return item
      })

      set({ cart: updatedCart })
    },

    removeFromCart(product) {
      const { cart } = get()

      const updatedCart = cart.filter((item) => {
        return item.id !== product.id || item.size !== product.size
      })

      set({ cart: updatedCart })
    },
  }
}

function checkProduct(product1: ShoppingCartProduct, product2: ShoppingCartProduct) {
  return product1.id === product2.id && product1.size === product2.size
}
