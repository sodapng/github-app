import axios, { AxiosInstance } from 'axios'

export interface CharacterLocation {
  name: string
  url: string
}

export interface ResourceBase {
  id: number
  name: string
  url: string
  created: string
}

export interface CharacterFilter {
  name?: string
  type?: string
  species?: string
  status?: string
  gender?: string
  page?: number
}

export interface Character extends ResourceBase {
  status: 'Dead' | 'Alive' | 'unknown'
  species: string
  type: string
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown'
  origin: CharacterLocation
  location: CharacterLocation
  image: string
  episode: string[]
}

export interface Info<T> {
  info?: {
    count: number
    pages: number
    next: string | null
    prev: string | null
  }
  results?: T
}

class ApiClient {
  private api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: 'https://rickandmortyapi.com/api/character',
    })
  }

  getCharacters = (filters?: CharacterFilter) => {
    return this.api<Info<Character[]>>({
      params: filters,
    })
  }

  getCharacter = (id: number) => {
    return this.api<Character>(`${id}`)
  }
}

export const apiClient = new ApiClient()
