import {
  buildCreateApi,
  coreModule,
  fetchBaseQuery,
  reactHooksModule,
} from '@reduxjs/toolkit/query/react'
import { Character, CharacterFilter, Info } from 'models/character'
import { notify } from 'utils'

const createApi = buildCreateApi(
  coreModule(),
  reactHooksModule({ unstable__sideEffectsInRender: true }),
)

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rickandmortyapi.com/api',
    validateStatus: (response, body: { error: string }) => {
      if (!response.ok) {
        notify('error', body.error)

        return false
      }

      return true
    },
  }),
  endpoints: (build) => ({
    getCharacters: build.query<Info<Character[]>, CharacterFilter | void>({
      query: (filter) => ({ url: 'character', params: filter ?? undefined }),
    }),
    getCharacterById: build.query<Character, number>({
      query: (id) => `character/${id}`,
    }),
  }),
  keepUnusedDataFor: 300,
})

export const {
  useGetCharactersQuery,
  useLazyGetCharactersQuery,
  useLazyGetCharacterByIdQuery,
  useGetCharacterByIdQuery,
} = api
