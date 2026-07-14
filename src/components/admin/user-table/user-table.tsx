import type { UserResult } from '@/types'
import { Table } from 'rsc-daisyui'
import { UserRow } from './user-row'

export function UserTable({ users }: { users: UserResult[] }) {
  return (
    <section className='data-table'>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre completo</th>
            <th>Correo electrónico</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow key={user.id} user={user} />
          ))}
        </tbody>
      </Table>
    </section>
  )
}
