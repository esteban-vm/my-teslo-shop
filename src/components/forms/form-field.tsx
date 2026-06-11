'use client'

import type { ElementType } from 'react'
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
  icon?: ElementType
}

export function FormField<T extends FieldValues>({
  control,
  name,
  label,
  icon: Icon,
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
        const placeholderText = isEmail ? 'ejemplo@email.com' : type === 'password' ? '********' : placeholder

        const inputStyle = cn('w-full', valid && 'border-success outline-success')
        const labelStyle = cn('font-semibold', required && 'after:font-semibold after:text-current after:content-["*"]')
        const iconStyle = cn('cursor-pointer text-current/50', invalid ? 'text-error' : valid && 'text-success')

        return (
          <Label.Floating as='div' className='even:mt-2'>
            <span className={labelStyle}>{label}</span>
            <Input as='label' className={inputStyle} validator>
              {Icon && <Icon className={iconStyle} />}
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
