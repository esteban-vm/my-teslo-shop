'use client'

import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { useId } from 'react'
import { Controller } from 'react-hook-form'
import { Input, Label, Validator } from 'rsc-daisyui'
import { ELLIPSIS_CHAR } from '@/lib/constants'

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

        return (
          <div className='w-full'>
            <Label as='label' htmlFor={fieldId}>
              {label}:
            </Label>
            <Input as='label' color={isDirty && !invalid ? 'success' : undefined} validator>
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
            <Validator.Hint as='small' id={errorId} role='alert'>
              {error?.message}
            </Validator.Hint>
          </div>
        )
      }}
    />
  )
}
