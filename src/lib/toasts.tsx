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

function handleSuccess(message: string, onClose: () => void) {
  toast.update(toastId, {
    type: 'success',
    closeButton: true,
    isLoading: false,
    render: <p className='line-clamp-3'>{message}</p>,
    onClose,
  })
}

function handleError(message: string) {
  toast.update(toastId, {
    type: 'error',
    autoClose: 10_000,
    isLoading: false,
    pauseOnHover: true,
    render: <p className='line-clamp-3'>{message}</p>,
  })
}

function closeToast() {
  toast.dismiss(toastId)
}
