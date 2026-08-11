'use client'

import type { ProductDB } from '@/schemas/product'
import { Fieldset } from 'rsc-daisyui'
import { FormButtons, FormField } from '@/components/shared'
import { useProductForm } from '@/hooks'
import { CategorySelect } from './category-select'
import { DescriptionBox } from './description-box'
import { GenderSelect } from './gender-select'
import { ImageInput } from './image-input'
import { ImageViewer } from './image-viewer'
import { SizeChecker } from './size-checker'

export interface ProductFormProps {
  savedProduct?: ProductDB | null
}

export function ProductForm(props: ProductFormProps) {
  const {
    form: { control },
    handleSubmitWithAction,
    isDisabled,
  } = useProductForm(props)

  const images = props.savedProduct?.images

  return (
    <form className='data-form' noValidate onSubmit={handleSubmitWithAction}>
      <Fieldset disabled={isDisabled}>
        <div className='form-row'>
          <FormField control={control} label='Título' name='title' />
          <FormField control={control} label='Slug' name='slug' spellCheck={false} />
        </div>
        <div className='form-row'>
          <FormField control={control} label='Etiquetas' name='tags' />
          <div className='flex w-full gap-5'>
            <FormField
              className='w-1/2'
              control={control}
              label='Precio'
              min={0}
              name='price'
              step={0.5}
              type='number'
            />
            <FormField className='w-1/2' control={control} label='Cantidad' min={0} name='stock' type='number' />
          </div>
        </div>
        <div className='form-row'>
          <CategorySelect control={control} name='categoryId' />
          <GenderSelect control={control} name='gender' />
        </div>
        <DescriptionBox control={control} name='description' />
        <div className='form-row'>
          <SizeChecker control={control} name='sizes' />
          <ImageInput control={control} name='uploads' />
        </div>
        {images && <ImageViewer images={images} />}
        <FormButtons.Submit className='w-fit' control={control}>
          Guardar
        </FormButtons.Submit>
      </Fieldset>
    </form>
  )
}
