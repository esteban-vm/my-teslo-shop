'use client'

import type { FieldValues } from 'react-hook-form'
import type { NamedFormControlProps } from '@/types'
import { useId } from 'react'
import { Controller } from 'react-hook-form'
import { Checkbox, Fieldset, Label } from 'rsc-daisyui'
import { Size } from '@/prisma/generated/enums'

export function SizeChecker<T extends FieldValues>({ control, name }: NamedFormControlProps<T>) {
  const errorId = useId()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, disabled, onChange }, fieldState: { error, invalid } }) => {
        const allSizes = Object.values(Size)
        const productSizes = value as typeof allSizes

        return (
          <div className='w-full'>
            <Label className='size-checker-label'>Tallas:</Label>
            <div className='mx-0.5 my-1 flex items-center gap-3.5'>
              {allSizes.map((size) => {
                const isChecked = productSizes.includes(size)

                const onSizeChange = () => {
                  if (isChecked) onChange(productSizes.filter((s) => s !== size))
                  else onChange([...productSizes, size])
                }

                return (
                  <Fieldset.Label className='select-none font-semibold' key={size}>
                    <Checkbox
                      aria-errormessage={errorId}
                      aria-invalid={invalid}
                      checked={isChecked}
                      color={!invalid ? 'success' : undefined}
                      disabled={disabled}
                      onChange={onSizeChange}
                      size='sm'
                      validator
                    />
                    {size}
                  </Fieldset.Label>
                )
              })}
            </div>
            <small className='mx-0.5 text-error text-xs empty:hidden' id={errorId} role='alert'>
              {error?.message}
            </small>
          </div>
        )
      }}
    />
  )
}
