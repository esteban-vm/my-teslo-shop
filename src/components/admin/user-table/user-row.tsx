import type { UserDB } from '@/schemas/user'
import { RoleSelect } from './role-select'

export function UserRow({ user }: { user: UserDB }) {
  const { id, name, email, role } = user

  return (
    <tr>
      <td className='max-w-30 truncate' title={id}>
        {id}
      </td>
      <td>{name}</td>
      <td>{email}</td>
      <td className='w-40 py-0'>
        <RoleSelect role={role} userId={id} />
      </td>
    </tr>
  )
}
