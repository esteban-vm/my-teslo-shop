import { TriangleAlert } from 'lucide-react'
import { Alert } from 'rsc-daisyui'

export function ErrorAlert() {
  return (
    <Alert color='error' data-size soft>
      <TriangleAlert />
      <span>Tamaño requerido</span>
    </Alert>
  )
}
