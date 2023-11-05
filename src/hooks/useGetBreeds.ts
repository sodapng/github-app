import useSWR from 'swr'

import { catClient } from '../api/CatClient'

export const useGetBreeds = (params: {
  page?: number
  limit?: number
  name?: string
}) => {
  const response = useSWR(params, async (_params) => {
    const _data = await catClient.getBreeds(_params)

    return _data
  })

  return response
}
