'use client'

import type { FieldValues } from 'react-hook-form'
import type { FormControlProps } from '@/types'
import { useAction } from 'next-safe-action/hooks'
import { useEffect } from 'react'
import { getCountries } from '@/actions/country'
import { DataSelect } from '@/components/shared'

export function CountrySelect<T extends FieldValues>(props: FormControlProps<T>) {
  const {
    result: { data: countries },
    execute,
    isExecuting,
  } = useAction(getCountries)

  useEffect(execute, [execute])

  return (
    <DataSelect disabled={isExecuting} label='País' {...props}>
      {countries?.map(({ id, name }) => {
        return (
          <option key={id} value={id}>
            {name}
          </option>
        )
      })}
    </DataSelect>
  )
}
