'use client'

import type { FieldValues } from 'react-hook-form'
import type { LabeledFormControlProps } from '@/types'
import { useId } from 'react'
import { Controller } from 'react-hook-form'
import { Input, Label, Validator } from 'rsc-daisyui'
import { ELLIPSIS_CHAR } from '@/lib/constants'

export type BaseFormFieldProps = Omit<JSX.IntrinsicElements['input'], 'name'>

export interface FormFieldProps<T extends FieldValues> extends LabeledFormControlProps<T>, BaseFormFieldProps {
  icon?: JSX.Element
}

export function FormField<T extends FieldValues>({
  control,
  name,
  label,
  icon,
  inputMode,
  maxLength,
  type = 'text',
  required = true,
  placeholder = ELLIPSIS_CHAR,
  ...rest
}: FormFieldProps<T>) {
  const fieldId = useId()
  const errorId = useId()

  const isPassword = type === 'password'
  const isEmail = type === 'email' || inputMode === 'email'

  maxLength = isPassword ? 20 : maxLength
  placeholder = isEmail ? 'correo@ejemplo.com' : isPassword ? '********' : placeholder

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error, isDirty, invalid } }) => {
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
                maxLength={maxLength}
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
