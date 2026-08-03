import type { FieldValues } from 'react-hook-form'
import type { LabeledFormControlProps } from '@/types'
import { DataSelect } from '@/components/shared'
import { Gender } from '@/prisma/generated/enums'

export function GenderSelect<T extends FieldValues>(props: LabeledFormControlProps<T>) {
  return (
    <DataSelect {...props}>
      {Object.entries(Gender).map(([key, value]) => (
        <option key={key} value={value}>
          {value}
        </option>
      ))}
    </DataSelect>
  )
}
