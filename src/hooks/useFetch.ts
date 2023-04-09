import axios, { AxiosError } from 'axios'
import { useMount } from 'hooks'
import { useState } from 'react'

export const useFetch = <T>(url: string, rootParameters?: Record<string, unknown>) => {
  const [data, setData] = useState<T>()
  const [isError, setIsErrorr] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = (parameters?: Record<string, unknown>) => {
    setIsLoading(true)
    setIsErrorr(false)

    axios
      .get<T>(url, {
        params: parameters ?? rootParameters,
      })
      .then(({ data }) => {
        setData(data)
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          console.error(error)
        }

        setIsErrorr(true)
        setData(undefined)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useMount(fetchData)

  return {
    data,
    isError,
    isLoading,
    fetchData,
  }
}
