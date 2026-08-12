import type { FieldValues } from 'react-hook-form'
import type { NamedFormControlProps } from '@/types'
import { DataSelect } from '@/components/shared'
import { CategoryName } from '@/prisma/generated/enums'

export function CategorySelect<T extends FieldValues>(props: NamedFormControlProps<T>) {
  return (
    <DataSelect label='Categoría' {...props}>
      {Object.values(CategoryName).map((category) => {
        return (
          <option key={category} value={category}>
            {category}
          </option>
        )
      })}
    </DataSelect>
  )
}
