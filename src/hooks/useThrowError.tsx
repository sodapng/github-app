import { useState } from 'react'

export const useThrowError = (error?: string) => {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    throw new Error(error ?? 'Sorry.. there was an error')
  }

  const Component = (
    <button key="useThrowError" onClick={() => setHasError(true)}>
      Вызвать ошибку! 😈
    </button>
  )

  return [setHasError, Component] as const
}
