import type { Metadata } from 'next'
import { RecoveryPasswordForm } from '@/components/auth'

export const metadata: Metadata = {
  title: 'Recuperar contraseña',
}

export type Props = PageProps<'/auth/password/recovery'>

export default function Page() {
  return <RecoveryPasswordForm />
}
