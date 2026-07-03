import type { Id } from 'react-toastify'
import { toast } from 'react-toastify'
import { ELLIPSIS_CHAR } from './constants'

export function Toasts() {}

Toasts.execute = handleExecute
Toasts.success = handleSuccess
Toasts.error = handleError
Toasts.close = closeToast

let toastId: Id

function handleExecute(message: string) {
  closeToast()
  toastId = toast.loading(message + ELLIPSIS_CHAR)
}

function handleSuccess(message: string) {
  toast.update(toastId, {
    type: 'success',
    autoClose: 4_000,
    isLoading: false,
    render: <p className='line-clamp-2'>{message}</p>,
  })
}

function handleError(message: string) {
  toast.update(toastId, {
    type: 'error',
    autoClose: 10_000,
    isLoading: false,
    pauseOnHover: true,
    render: <p className='line-clamp-2'>{message}</p>,
  })
}

function closeToast() {
  toast.dismiss(toastId)
}
