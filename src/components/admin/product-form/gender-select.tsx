import type { FieldValues } from 'react-hook-form'
import type { NamedFormControlProps } from '@/types'
import { DataSelect } from '@/components/shared'
import { Gender } from '@/prisma/generated/enums'

export function GenderSelect<T extends FieldValues>(props: NamedFormControlProps<T>) {
  return (
    <DataSelect label='Género' {...props}>
      {Object.values(Gender).map((gender) => {
        return (
          <option key={gender} value={gender}>
            {gender}
          </option>
        )
      })}
    </DataSelect>
  )
}
