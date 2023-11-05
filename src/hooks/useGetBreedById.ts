import useSWR from 'swr'

import { catClient } from '../api/CatClient'

export const useGetBreedById = (id: string | undefined) => {
  const response = useSWR(id, async (_id) => {
    if (!id) return

    const _data = await catClient.getBreedById(_id)

    return _data
  })

  return response
}
