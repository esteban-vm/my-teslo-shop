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
  inputMode,
  className,
  type = 'text',
  required = true,
  placeholder = ELLIPSIS_CHAR,
  ...rest
}: FormFieldProps<T>) {
  const fieldId = useId()
  const errorId = useId()
  const isEmail = type === 'email' || inputMode === 'email'
  placeholder = isEmail ? 'correo@ejemplo.com' : type === 'password' ? '********' : placeholder

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const { error, isDirty, invalid } = fieldState
        const inputStyle = cn(className, isDirty && !invalid && 'border-success outline-success')

        return (
          <div>
            <Label as='label' className='mb-1 cursor-pointer select-none font-semibold' htmlFor={fieldId}>
              {label}:
            </Label>
            <Input as='label' className={inputStyle} validator>
              {icon}
              <input
                {...rest}
                aria-errormessage={errorId}
                aria-invalid={invalid}
                id={fieldId}
                inputMode={inputMode}
                placeholder={placeholder}
                required={required}
                type={type}
                {...field}
              />
            </Input>
            <Validator.Hint as='small' className='mt-1 empty:hidden' id={errorId} role='alert'>
              {error?.message}
            </Validator.Hint>
          </div>
        )
      }}
    />
  )
}
