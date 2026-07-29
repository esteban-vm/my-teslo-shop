'use client'

import type { FieldValues } from 'react-hook-form'
import type { BaseFormControlProps } from '@/types'
import { useFormState } from 'react-hook-form'
import { Button } from 'rsc-daisyui'
import { cn } from '@/lib/ui'

export function SubmitButton<T extends FieldValues>({ control, className, ...rest }: BaseFormControlProps<T>) {
  const { isValid } = useFormState({ control })
  return <Button {...rest} className={cn('mt-2', className)} color='primary' disabled={!isValid} type='submit' />
}
