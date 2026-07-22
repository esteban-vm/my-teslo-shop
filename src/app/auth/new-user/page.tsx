import type { Metadata } from 'next'
import { NewUserForm } from '@/components/auth'

export const metadata: Metadata = {
  title: 'Registrarse',
}

export type Props = PageProps<'/auth/new-user'>

export default function Page() {
  return <NewUserForm />
}
