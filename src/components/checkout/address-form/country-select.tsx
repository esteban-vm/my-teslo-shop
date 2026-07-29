'use client'

import type { FieldValues } from 'react-hook-form'
import type { LabeledFormControlProps } from '@/types'
import { useAction } from 'next-safe-action/hooks'
import { useEffect } from 'react'
import { getCountries } from '@/actions/country'
import { DataSelect } from '@/components/shared'

export function CountrySelect<T extends FieldValues>(props: LabeledFormControlProps<T>) {
  const {
    result: { data: countries },
    execute,
    isExecuting,
  } = useAction(getCountries)

  useEffect(execute, [execute])

  return <DataSelect data={countries} disabled={isExecuting} {...props} />
}
