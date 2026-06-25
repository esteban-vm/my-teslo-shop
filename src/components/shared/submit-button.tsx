'use client'

import type { Control, FieldValues } from 'react-hook-form'
import { useFormState } from 'react-hook-form'
import { Button } from 'rsc-daisyui'
import { cn } from '@/lib/ui'

export type SubmitButtonBaseProps = Parameters<typeof Button>[0]

export interface SubmitButtonProps<T extends FieldValues> extends SubmitButtonBaseProps {
  control: Control<T>
}

export function SubmitButton<T extends FieldValues>({ control, className, ...rest }: SubmitButtonProps<T>) {
  const { isValid } = useFormState({ control })
  return <Button {...rest} className={cn('mt-2', className)} color='primary' disabled={!isValid} type='submit' />
}
