import type { Metadata } from 'next'
import { NewUserForm } from '@/components/auth'

export const metadata: Metadata = {
  title: 'Registrarse',
}

export default function NewUserPage() {
  return <NewUserForm />
}
