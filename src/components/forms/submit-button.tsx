'use client'

import type { Control, FieldValues } from 'react-hook-form'
import { useFormState } from 'react-hook-form'
import { Button } from 'rsc-daisyui'

export type SubmitButtonBaseProps = Omit<Parameters<typeof Button>[0], 'type'>

export interface SubmitButtonProps<T extends FieldValues> extends SubmitButtonBaseProps {
  control: Control<T>
}

export function SubmitButton<T extends FieldValues>({ control, ...rest }: SubmitButtonProps<T>) {
  const { isValid } = useFormState({ control })
  return <Button {...rest} className='mt-2' color='primary' disabled={!isValid} type='submit' />
}
