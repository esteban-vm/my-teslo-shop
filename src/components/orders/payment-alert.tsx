import { Banknote, BanknoteX } from 'lucide-react'
import { Alert } from 'rsc-daisyui'

export function PaymentAlert({ isPaid }: { isPaid: boolean | null }) {
  return (
    <Alert className='mt-2 gap-2 rounded-sm py-2 font-semibold' color={isPaid ? 'success' : 'error'} soft>
      {isPaid ? <Banknote /> : <BanknoteX />}
      <span>{isPaid ? 'Pagada' : 'Pendiente de pago'}</span>
    </Alert>
  )
}
