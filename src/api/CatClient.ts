import axios from 'axios'

interface Meta {
  total_items: number
  total_pages: number
  current_page: number
  per_page: number
  remaining_count: number
}

export interface CatBreed {
  id: number
  name: string
  description: string
  image: {
    url: string
  }
}

export interface CatApiResponse {
  meta: Meta
  items: CatBreed[]
}

class CatClient {
  private api

  constructor(baseURL: string) {
    this.api = axios.create({
      baseURL,
    })
  }

  async getBreeds({
    page = 1,
    limit = 9,
    name,
  }: { page?: number; limit?: number; name?: string } = {}) {
    const { data } = await this.api.get<CatApiResponse>('/breeds', {
      params: {
        page,
        limit,
        name: name && `*${name}`,
      },
    })

    return data
  }

  async getBreedById(id: string) {
    const { data } = await this.api.get<CatBreed>(`/breeds/${id}`)

    return data
  }
}

export const catClient = new CatClient('https://2ff5030c446d8ca4.mokky.dev')
