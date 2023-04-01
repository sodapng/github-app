import { toast } from 'react-toastify'

export const notify = (message: string) =>
  toast.success(message, {
    position: 'bottom-center',
    autoClose: 3000,
  })
