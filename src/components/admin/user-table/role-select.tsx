'use client'

import type { ChangeEventHandler } from 'react'
import type { UserRole } from '@/schemas/user'
import { useAction } from 'next-safe-action/hooks'
import { Select } from 'rsc-daisyui'
import { changeUserRole } from '@/actions/user'
import { userRoles } from '@/lib/constants'

export function RoleSelect({ userId, role }: UserRole) {
  const { execute, isExecuting } = useAction(changeUserRole)

  const onRoleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    execute({ userId, role: event.target.value as typeof role })
  }

  return (
    <Select disabled={isExecuting} onChange={onRoleChange} value={role ?? ''}>
      {userRoles.map((r) => (
        <option key={r} value={r}>
          {r}
        </option>
      ))}
    </Select>
  )
}
