'use client'

import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { useId } from 'react'
import { Controller } from 'react-hook-form'
import { Input, Label, Validator } from 'rsc-daisyui'
import { ELLIPSIS_CHAR } from '@/lib/constants'
import { cn } from '@/lib/ui'

export type FormFieldBaseProps = JSX.IntrinsicElements['input']

export interface FormFieldProps<T extends FieldValues> extends FormFieldBaseProps {
  control: Control<T>
  name: FieldPath<T>
  label: string
  icon?: JSX.Element
}

export function FormField<T extends FieldValues>({
  control,
  name,
  label,
  icon,
  placeholder = ELLIPSIS_CHAR,
  type = 'text',
  inputMode,
  required = true,
  ...rest
}: FormFieldProps<T>) {
  const errorId = useId()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const { error, isDirty, invalid } = fieldState
        const valid = isDirty && !invalid
        const isEmail = type === 'email' || inputMode === 'email'
        const placeholderText = isEmail ? 'correo@ejemplo.com' : type === 'password' ? '********' : placeholder

        return (
          <Label.Floating as='div' className='mt-0 mb-2'>
            <span className='font-semibold'>{label}:</span>
            <Input as='label' className={cn(valid && 'border-success outline-success')} validator>
              {icon}
              <input
                {...rest}
                aria-errormessage={errorId}
                aria-invalid={invalid}
                inputMode={inputMode}
                placeholder={placeholderText}
                required={required}
                type={type}
                {...field}
              />
            </Input>
            <Validator.Hint as='small' className='mt-1.5 empty:hidden' id={errorId} role='alert'>
              {error?.message}
            </Validator.Hint>
          </Label.Floating>
        )
      }}
    />
  )
}
