'use client'

import type { Role } from '@/prisma/generated/client'
import type { ChangeUserRole } from '@/schemas/user'
import { useAction } from 'next-safe-action/hooks'
import { Select } from 'rsc-daisyui'
import { changeUserRole } from '@/actions/user'
import { userRoles } from '@/lib/constants'

export function RoleSelect({ userId, role }: ChangeUserRole) {
  const { execute, isExecuting } = useAction(changeUserRole)

  return (
    <Select
      disabled={isExecuting}
      onChange={(event) => execute({ userId, role: event.target.value as Role })}
      value={role ?? ''}
    >
      {userRoles.map((r) => (
        <option key={r} value={r}>
          {r}
        </option>
      ))}
    </Select>
  )
}
