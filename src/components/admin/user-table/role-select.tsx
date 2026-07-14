'use client'

import type { ChangeEventHandler } from 'react'
import type { UserRole } from '@/schemas/user'
import { useAction } from 'next-safe-action/hooks'
import { Select } from 'rsc-daisyui'
import { changeUserRole } from '@/actions/user'
import { authClient } from '@/auth-client'
import { userRoles } from '@/lib/constants'

export function RoleSelect({ userId, role }: UserRole) {
  const { data: session, isPending } = authClient.useSession()
  const { execute, isExecuting } = useAction(changeUserRole)

  const onRoleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    execute({ userId, role: event.target.value as typeof role })
  }

  const isDisabled = isExecuting || isPending || userId === session?.user.id

  return (
    <Select disabled={isDisabled} onChange={onRoleChange} value={role ?? ''}>
      {userRoles.map((r) => (
        <option key={r} value={r}>
          {r}
        </option>
      ))}
    </Select>
  )
}
