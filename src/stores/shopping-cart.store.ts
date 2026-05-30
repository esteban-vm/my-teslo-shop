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

      const checkProduct = (item: ShoppingCartProduct) => {
        return item.id === product.id && item.size === product.size
      }

      // 1. Revisar si el producto existe en el carrito con la talla seleccionada
      const productInCart = cart.some(checkProduct)

      if (!productInCart) {
        set({ cart: [...cart, product] })
        return
      }

      // 2. Si el producto existe con la talla, incrementar la cantidad
      const updatedCart = cart.map((item) => {
        if (checkProduct(item)) {
          return {
            ...item,
            quantity: item.quantity + product.quantity,
          }
        }

        return item
      })

      set({ cart: updatedCart })
    },
  }
}
