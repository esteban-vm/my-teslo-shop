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
      render={({ field: { value, disabled, onChange, onBlur }, fieldState: { error, invalid } }) => {
        const availableSizes = Object.values(Size)
        const selectedSizes = value as typeof availableSizes

        return (
          <div className='w-full'>
            <Label className='required-label'>Tallas:</Label>
            <div className='my-1 flex flex-wrap items-center justify-center gap-3.5'>
              {availableSizes.map((size) => {
                const isChecked = selectedSizes.includes(size)

                const onSizeChange = () => {
                  if (isChecked) onChange(selectedSizes.filter((s) => s !== size))
                  else onChange([...selectedSizes, size])
                }

                return (
                  <Fieldset.Label className='select-none font-semibold' key={size}>
                    <Checkbox
                      aria-errormessage={errorId}
                      aria-invalid={invalid}
                      checked={isChecked}
                      color={!invalid ? 'success' : undefined}
                      disabled={disabled}
                      onBlur={onBlur}
                      onChange={onSizeChange}
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
