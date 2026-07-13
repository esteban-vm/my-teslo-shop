import type { UserResult } from '@/types'
import { RoleSelect } from './role-select'

export function UserRow({ user }: { user: UserResult }) {
  const { id, name, email, role } = user

  return (
    <tr className='text-nowrap hover:bg-base-300'>
      <td className='font-semibold'>{id}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>
        <RoleSelect role={role} userId={id} />
      </td>
    </tr>
  )
}
