import { TriangleAlert } from 'lucide-react'
import { Alert } from 'rsc-daisyui'
import { cn } from '@/lib/ui'

export function ErrorAlert({ isShowing }: { isShowing: boolean }) {
  return (
    <Alert
      className={cn('w-fit gap-1 px-2 py-1 text-sm', isShowing ? 'fade-in animate-in' : 'hidden')}
      color='error'
      soft
    >
      <TriangleAlert className='size-4 stroke-current' />
      <span>Tamaño requerido</span>
    </Alert>
  )
}
