import type { PropsWithChildren } from 'react'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import type { Product, Role, Size } from '@/prisma/generated/client'

export interface ProductResult extends Product {
  images: string[]
}

export interface CartProduct {
  id: string
  title: string
  slug: string
  price: number
  quantity: number
  size: Size
  image: string
}

export interface OrderSummary {
  total: number
  subtotal: number
  tax: number
  totalItems: number
}

export interface UserResult {
  id: string
  email: string
  name: string
  role: Role | null
}

export interface FormControlBaseProps<T extends FieldValues> extends PropsWithChildren {
  control: Control<T>
  className?: string
}

export interface FormControlProps<T extends FieldValues> extends FormControlBaseProps<T> {
  name: FieldPath<T>
}

export type Paginated<T> = T & {
  currentPage: number
  totalPages: number
}
