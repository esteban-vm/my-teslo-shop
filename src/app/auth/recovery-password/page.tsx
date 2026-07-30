import type { Metadata } from 'next'
import { RecoveryPasswordForm } from '@/components/auth'

export const metadata: Metadata = {
  title: 'Recuperar contraseña',
}

export type Props = PageProps<'/auth/recovery-password'>

export default function Page() {
  return <RecoveryPasswordForm />
}
