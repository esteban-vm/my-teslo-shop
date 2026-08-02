'use client'

import type { FieldValues } from 'react-hook-form'
import type { LabeledFormControlProps } from '@/types'
import { useId } from 'react'
import { Controller } from 'react-hook-form'
import TextareaAutosize from 'react-textarea-autosize'
import { Label, Textarea, Validator } from 'rsc-daisyui'
import { ELLIPSIS_CHAR } from '@/lib/constants'

export type BaseDescriptionBox = Omit<JSX.IntrinsicElements['textarea'], 'name' | 'color' | 'style'>

export interface DescriptionBox<T extends FieldValues> extends LabeledFormControlProps<T>, BaseDescriptionBox {}

export function DescriptionBox<T extends FieldValues>({ control, name, label, ...rest }: DescriptionBox<T>) {
  const boxId = useId()
  const errorId = useId()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error, isDirty, invalid } }) => {
        return (
          <div className='w-full'>
            <Label as='label' htmlFor={boxId}>
              {label}
            </Label>
            <Textarea
              {...rest}
              aria-errormessage={errorId}
              aria-invalid={invalid}
              as={TextareaAutosize}
              className='w-full resize-none text-sm'
              color={isDirty && !invalid ? 'success' : undefined}
              id={boxId}
              minRows={3}
              placeholder={ELLIPSIS_CHAR}
              required
              validator
              {...field}
            />
            <Validator.Hint as='small' id={errorId} role='alert'>
              {error?.message}
            </Validator.Hint>
          </div>
        )
      }}
    />
  )
}
