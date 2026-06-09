import { CheckCircle } from 'lucide-react'
import { Alert } from 'rsc-daisyui'

export function SuccessAlert() {
  return (
    <Alert color='success' data-size soft>
      <CheckCircle />
      <span>Añadido con éxito</span>
    </Alert>
  )
}
