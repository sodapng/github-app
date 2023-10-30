import characters from 'data/characters.json'
import { rest } from 'msw'

export const handlers = [
  rest.get('https://rickandmortyapi.com/api/character', (request, response, context) => {
    const name = request.url.searchParams.get('name')
    if (name && name !== '') {
      const filtred = characters.results.filter((character) => character.name.includes(name))
      return response(
        context.status(200),
        context.json({
          ...characters,
          results: filtred,
        }),
      )
    }

    return response(context.status(200), context.json(characters))
  }),
  rest.get('https://rickandmortyapi.com/api/character/:id', (request, response, context) => {
    const { id } = request.params
    return response(context.status(200), context.json(characters.results.at(+id - 1)))
  }),
]
