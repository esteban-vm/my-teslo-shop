import type { FieldValues } from 'react-hook-form'
import type { LabeledFormControlProps } from '@/types'
import { DataSelect } from '@/components/shared'
import { Gender } from '@/prisma/generated/enums'

export function GenderSelect<T extends FieldValues>(props: LabeledFormControlProps<T>) {
  return (
    <DataSelect {...props}>
      {Object.values(Gender).map((gender) => (
        <option key={gender} value={gender}>
          {gender}
        </option>
      ))}
    </DataSelect>
  )
}
