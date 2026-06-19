import type { Metadata } from 'next'
import { NewUserForm } from '@/components/forms'

export const metadata: Metadata = {
  title: 'Registrarse',
}

export default function NewUserPage() {
  return <NewUserForm />
}
