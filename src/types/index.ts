import type { PropsWithChildren } from 'react'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import type { Product as BaseProduct, Size } from '@/prisma/generated/client'

export interface Product extends BaseProduct {
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

export interface FormControlBaseProps<T extends FieldValues> extends PropsWithChildren {
  control: Control<T>
  className?: string
}

export interface FormControlProps<T extends FieldValues> extends FormControlBaseProps<T> {
  name: FieldPath<T>
}
