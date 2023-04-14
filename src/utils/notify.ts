import { toast } from 'react-toastify'

type TypeOptions = 'info' | 'success' | 'warning' | 'error'

export const notify = (type: TypeOptions, message: string) => {
  toast[type](`🦄 ${message}`, {
    position: 'top-right',
    autoClose: 3000,
  })
}
