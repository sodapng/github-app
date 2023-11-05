import cn from 'clsx'
import { useLayoutEffect, useRef, useState } from 'react'
import {
  Link,
  Outlet,
  useOutletContext,
  useParams,
  useSearchParams,
} from 'react-router-dom'

import { Loader } from './components'
import { useGetBreedById, useGetBreeds, useThrowError } from './hooks'

export function App() {
  const [show, setShow] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams({
    page: '1',
    limit: '9',
    name: localStorage.getItem('searchName') ?? '',
  })
  const [_, ErrorButton] = useThrowError()

  const page = Number(searchParams.get('page'))
  const limit = Number(searchParams.get('limit'))
  const searchName =
    searchParams.get('name') ?? localStorage.getItem('searchName') ?? undefined

  const { data, isLoading } = useGetBreeds({
    page,
    limit,
    name: searchName,
  })

  useLayoutEffect(() => {
    setSearchParams({
      page: `${page}`,
      limit: `${limit}`,
      name: `${searchName}`,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    localStorage.setItem('searchName', inputRef.current?.value ?? '')

    setSearchParams((prev) => {
      prev.set('name', inputRef.current?.value ?? '')
      prev.set('page', '1')

      return prev
    })
  }

  const handleClickPage = (value: number) => () => {
    setSearchParams((prev) => {
      prev.set('page', String(Number(page) + value))

      return prev
    })
  }

  return (
    <div
      className={cn(
        'relative grid 2 gap-4 container mx-auto px-4 py-4 h-screen font-mono',
        show && 'grid-cols-[1fr_3fr]',
      )}
    >
      <div className="flex flex-col gap-2 p-2 border rounded-md">
        {ErrorButton}
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
                      to={`/${id}?${searchParams}`}
                      onClick={() => setShow(true)}
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
        <div className="flex gap-2">
          <button disabled={page === 1} onClick={handleClickPage(-1)}>
            prev
          </button>
          <button
            disabled={page >= data?.meta.total_pages!}
            onClick={handleClickPage(1)}
          >
            next
          </button>
        </div>
        <div>
          <input
            type="number"
            value={limit}
            onChange={(e) => {
              setSearchParams((prev) => {
                prev.set('limit', e.target.value)

                return prev
              })
            }}
          />
        </div>
      </div>
      <Outlet context={[setShow]} />
    </div>
  )
}

export function CardCatBreed() {
  const [setShow] =
    useOutletContext<[React.Dispatch<React.SetStateAction<boolean>>]>()
  const { breedId } = useParams()
  const [searchParams] = useSearchParams()
  const { data, isLoading } = useGetBreedById(breedId)

  if (isLoading) {
    return (
      <div className="grid w-full h-full place-items-center border rounded-md p-2">
        <Loader />
      </div>
    )
  }

  return (
    <>
      <Link
        to={`/?${searchParams}`}
        className="absolute top-0 left-0 cursor-pointer bg-gray-50 opacity-30 w-full h-full"
        onClick={() => setShow(false)}
      />
      <div className="relative z-10 bg-white border rounded-md p-2 flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold">{data?.name}</h1>
        <img
          loading="lazy"
          className="object-cover w-48 h-48 rounded-md"
          src={data?.image.url}
          alt={data?.name}
        />
        <p>{data?.description}</p>
      </div>
    </>
  )
}
