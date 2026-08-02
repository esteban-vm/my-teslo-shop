'use client'

import type { ProductResult } from '@/schemas/product'
import { Fieldset } from 'rsc-daisyui'
import { FormField } from '@/components/shared'
import { useProductForm } from '@/hooks'
import { CategorySelect } from './category-select'
import { DescriptionBox } from './description-box'

export interface ProductFormProps {
  savedProduct?: ProductResult | null
}

export function ProductForm(props: ProductFormProps) {
  const {
    form: { control },
    handleSubmitWithAction,
    isDisabled,
  } = useProductForm(props)

  return (
    <form className='data-form' noValidate onSubmit={handleSubmitWithAction}>
      <Fieldset disabled={isDisabled}>
        <div className='form-row'>
          <FormField control={control} label='Título' name='title' />
          <FormField control={control} label='Slug' name='slug' spellCheck={false} />
        </div>
        <div className='form-row'>
          <FormField control={control} label='Precio' min={0} name='price' type='number' />
        </div>
        <div className='form-row'>
          <FormField control={control} label='Etiquetas' name='tags' />
          <CategorySelect control={control} label='Categoría' name='categoryId' />
        </div>
        <div className='form-row'>
          <DescriptionBox control={control} label='Descripción' name='description' />
        </div>
      </Fieldset>
    </form>
  )
}
