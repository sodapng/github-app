import { apiClient, type Character } from 'api/ApiClient'
import { AxiosError } from 'axios'
import { Card, CardForModal, Loader, Modal, Search } from 'components'
import { useMount } from 'hooks'
import { type KeyboardEvent, useState } from 'react'

export function Main() {
  const [query, setQuery] = useState(localStorage.getItem('searchValue') ?? '')
  const [data, setData] = useState<Character[]>()
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [id, setId] = useState<number>(-1)

  const fetchData = () => {
    setIsLoading(true)
    apiClient
      .getCharacters({
        name: query,
      })
      .then(({ data: { results } }) => {
        setData(results)
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          console.log(error.message)
        }
        setData([])
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useMount(fetchData)

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.repeat) return

    if (event.key === 'Enter') {
      fetchData()
    }
  }

  const onOpen = (id: number) => {
    setIsOpen(true)
    setId(id)
  }

  const onClose = () => setIsOpen(false)

  return (
    <div className='mx-auto my-4 min-h-screen px-12 text-slate-600'>
      <Search
        value={query}
        onChange={setQuery}
        onKeyDown={handleKeyDown}
      />
      <div className='flex flex-wrap gap-5'>
        {!isLoading &&
          data?.map(({ id, ...properties }) => {
            return (
              <Card
                key={id}
                onClick={() => onOpen(id)}
                {...properties}
              />
            )
          })}
        {isLoading && <Loader />}
      </div>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <CardForModal
          id={id}
          onClose={onClose}
        />
      </Modal>
    </div>
  )
}
