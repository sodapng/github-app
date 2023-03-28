import { useEffect, useLayoutEffect, useRef } from 'react'

export const useUnmount = (callback: () => void) => {
  const callbackReference = useRef(callback)

  useLayoutEffect(() => {
    callbackReference.current = callback
  }, [callback])

  useEffect(() => {
    return () => {
      callbackReference.current()
    }
  }, [])
}
