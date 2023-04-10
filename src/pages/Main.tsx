import type { Character, Info } from 'api/ApiClient'
import { Card, CardForModal, Loader, Modal, Search } from 'components'
import { useFetch } from 'hooks'
import { Fragment, type KeyboardEvent, useState } from 'react'

export function Main() {
  const [query, setQuery] = useState(localStorage.getItem('searchValue') ?? '')
  const [isOpen, setIsOpen] = useState(false)
  const [id, setId] = useState<number>(-1)
  const { data, fetchData, isLoading } = useFetch<Info<Character[]>>(
    'https://rickandmortyapi.com/api/character',
    { name: query },
  )

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.repeat || !query) return

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
    <Fragment>
      <div className='mx-auto my-4 w-full flex-auto px-12 text-slate-600'>
        <Search
          value={query}
          onChange={setQuery}
          onKeyDown={handleKeyDown}
        />
        <div className='grid grid-cols-4 gap-5'>
          {isLoading ? (
            <Loader />
          ) : (
            data?.results?.map(({ id, ...properties }) => (
              <Card
                key={id}
                onClick={() => onOpen(id)}
                {...properties}
              />
            ))
          )}
        </div>
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
    </Fragment>
  )
}
