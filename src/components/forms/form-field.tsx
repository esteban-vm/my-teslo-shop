import type { Control, FieldPath, FieldValues } from 'react-hook-form'
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
  type = 'text',
  required = true,
  placeholder = ELLIPSIS_CHAR,
  ...rest
}: FormFieldProps<T>) {
  const fieldId = `${name}-field-id`
  const errorId = `${name}-error-id`
  const isEmail = type === 'email' || inputMode === 'email'
  placeholder = isEmail ? 'correo@ejemplo.com' : type === 'password' ? '********' : placeholder

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const { error, isDirty, invalid } = fieldState

        return (
          <Label.Floating as='div' className='mt-0 mb-2'>
            <span className='font-semibold'>{label}:</span>
            <Input as='label' className={cn(isDirty && !invalid && 'border-success outline-success')} validator>
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
            <Validator.Hint as='small' className='mt-1.5 empty:hidden' id={errorId} role='alert'>
              {error?.message}
            </Validator.Hint>
          </Label.Floating>
        )
      }}
    />
  )
}
