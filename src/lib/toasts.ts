import type { Id } from 'react-toastify'
import { toast } from 'react-toastify'

export function Toasts() {}

Toasts.execute = handleExecute
Toasts.success = handleSuccess
Toasts.error = handleError
Toasts.close = closeToast

let toastId: Id

function handleExecute(message: string) {
  closeToast()
  toastId = toast.loading(message)
}

function handleSuccess(message: string, onClose: () => void) {
  toast.update(toastId, {
    type: 'success',
    autoClose: 4000,
    isLoading: false,
    render: message,
    onClose,
  })
}

function handleError(message: string) {
  toast.update(toastId, {
    type: 'error',
    isLoading: false,
    closeButton: true,
    autoClose: false,
    render: message,
  })
}

function closeToast() {
  toast.dismiss(toastId)
}
