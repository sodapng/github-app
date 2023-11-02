import { useEffect, useRef, useState } from 'react'
import { Link, Outlet, useParams, useSearchParams } from 'react-router-dom'
import useSWR from 'swr'
import { CatBreed, catClient } from './api/CatClient'
import { Loader } from './components/Loader'

const useBreeds = (params: {
  page?: number
  limit?: number
  name?: string
}) => {
  const { data, error, isLoading } = useSWR(params, async (_params) => {
    const _data = await catClient.getBreeds(_params)

    return _data
  })

  return {
    data,
    error,
    isLoading,
  }
}

const useBreedById = (id: string | undefined) => {
  const { data, error, isLoading } = useSWR(id, async (_id) => {
    if (!id) return

    const _data = await catClient.getBreedById(_id)

    return _data
  })

  return {
    breed: data,
    error,
    isLoading,
  }
}

export function App() {
  const [searchParams, setSearchParams] = useSearchParams()

  const page = Number(searchParams.get('page') ?? 1)
  const limit = Number(searchParams.get('limit') ?? 9)
  const searchName =
    searchParams.get('name') ?? localStorage.getItem('searchName') ?? undefined

  const { data, isLoading } = useBreeds({
    page,
    limit,
    name: searchName,
  })

  const [isError, setIsError] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    localStorage.setItem('searchName', inputRef.current?.value ?? '')

    setSearchParams((prev) => {
      prev.set('name', inputRef.current?.value ?? '')

      return prev
    })
  }

  if (isError) {
    throw new Error('Sorry.. there was an error')
  }

  return (
    <div className="grid grid-cols-[1fr_3fr] 2 gap-4 container mx-auto px-4 py-4 h-screen font-mono">
      {/* <button onClick={() => setIsError(true)}>Вызвать ошибку! 😈</button> */}
      <div className="flex flex-col gap-2 p-2 border rounded-md">
        <div>
          <form onSubmit={handleSubmit} className="flex gap-1 items-center">
            <input
              className="border rounded-md"
              ref={inputRef}
              type="text"
              defaultValue={searchName}
            />
            <button type="submit">🔍</button>
          </form>
        </div>
        <div className=" h-full">
          {isLoading && (
            <div className="grid w-full h-full place-items-center">
              <Loader />
            </div>
          )}
          {!isLoading && !data && (
            <div className="grid w-full h-full place-items-center">
              <span>Ничего не найдено 😭</span>
            </div>
          )}
          {!isLoading && data && (
            <ul className="flex flex-col gap-2">
              {data.items.map(({ id, name }) => {
                return (
                  <li key={id}>
                    <Link
                      to={`/?details=${id}`}
                      className="border p-2 rounded-md block hover:bg-gray-50"
                    >
                      {name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export function CardCatBreed() {
  console.log(123)

  const { breedId } = useParams()

  const { breed, isLoading } = useBreedById(breedId)

  if (isLoading) {
    return (
      <div className="grid w-full h-full place-items-center border rounded-md p-2">
        <Loader />
      </div>
    )
  }

  return (
    <div className="border rounded-md p-2 flex flex-col gap-2">
      <h1 className="text-3xl font-extrabold">{breed?.name}</h1>
      <img
        loading="lazy"
        className="object-cover w-48 h-48 rounded-md"
        src={breed?.image.url}
        alt={breed?.name}
      />
      <p>{breed?.description}</p>
    </div>
  )
}
