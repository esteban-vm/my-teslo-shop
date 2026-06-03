import type { Metadata } from 'next'
import { NewAccountForm } from '@/components/auth'

export const metadata: Metadata = {
  title: 'Crear cuenta',
}

export default function NewAccountPage() {
  return <NewAccountForm />
}
