'use client'

import type { FieldValues } from 'react-hook-form'
import type { LabeledFormControlProps } from '@/types'
import { useAction } from 'next-safe-action/hooks'
import { useEffect } from 'react'
import { getCategories } from '@/actions/category'
import { DataSelect } from '@/components/shared'

export function CategorySelect<T extends FieldValues>(props: LabeledFormControlProps<T>) {
  const {
    result: { data: categories },
    execute,
    isExecuting,
  } = useAction(getCategories)

  useEffect(execute, [execute])

  return (
    <DataSelect disabled={isExecuting} {...props}>
      {categories?.map(({ id, name }) => {
        return (
          <option key={id} value={id}>
            {name}
          </option>
        )
      })}
    </DataSelect>
  )
}
