import type { PropsWithChildren } from 'react'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import type { Size } from '@/prisma/generated/enums'

export interface CartProduct {
  id: string
  title: string
  slug: string
  price: number
  quantity: number
  size: Size
  image: string
}

export interface BaseFormControlProps<T extends FieldValues> extends PropsWithChildren {
  control: Control<T>
  className?: string
}

export interface NamedFormControlProps<T extends FieldValues> extends Pick<BaseFormControlProps<T>, 'control'> {
  name: FieldPath<T>
}

export interface LabeledFormControlProps<T extends FieldValues> extends NamedFormControlProps<T> {
  label: string
}
