import { Card, CardForModal, Loader, Modal, Search } from 'components'
import { Fragment, type KeyboardEvent, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { queryActions, useActionCreators, useAppSelector, useGetCharactersQuery } from 'store'

export function Main() {
  const actions = useActionCreators(queryActions)
  const query = useAppSelector((state) => state.query.value)
  const [isOpen, setIsOpen] = useState(false)
  const [id, setId] = useState<number>(-1)
  const { isLoading, data } = useGetCharactersQuery({ name: query })

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.repeat) return

    if (event.key === 'Enter') {
      const { value } = event.currentTarget
      actions.setQuery({ value })
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
      <ToastContainer />
    </Fragment>
  )
}
