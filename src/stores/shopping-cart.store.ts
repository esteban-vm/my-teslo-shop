import type { Size } from '@/generated/prisma/client'
import { createStore } from 'zustand'
import { persist } from 'zustand/middleware'

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
  addToCart: (product: ShoppingCartProduct) => void
}

export type ShoppingCartStore = ReturnType<typeof createShoppingCartStore>

export const createShoppingCartStore = () => {
  return createStore<ShoppingCartState>()(
    persist(
      (set, get) => {
        return {
          cart: [],
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
      },
      { name: 'shopping-cart-storage' }
    )
  )
}
