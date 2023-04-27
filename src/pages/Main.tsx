import { Card, CardForModal, Loader, Modal, Search } from 'components'
import { Fragment, type KeyboardEvent, useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { queryActions, useActionCreators, useAppSelector, useGetCharactersQuery } from 'store'

export function Main() {
  const query = useAppSelector((state) => state.query.value)
  const [value, setValue] = useState(query)
  const { data, isFetching } = useGetCharactersQuery({ name: value })
  const actions = useActionCreators(queryActions)
  const [isOpen, setIsOpen] = useState(false)
  const [id, setId] = useState<number>(-1)

  useEffect(() => {
    actions.setQuery({ value })
  }, [value])

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.repeat) return

    if (event.key === 'Enter') {
      const { value } = event.currentTarget
      setValue(value)
    }
  }

  const onOpen = (id: number) => {
    setId(id)
    setIsOpen(true)
  }

  const onClose = () => {
    setIsOpen(false)
  }

  return (
    <Fragment>
      <div className='mx-auto my-4 w-full flex-auto px-12 text-slate-600'>
        <Search
          value={value}
          onKeyDown={handleKeyDown}
        />
        <div className='grid grid-cols-4 gap-5'>
          {isFetching ? (
            <Loader />
          ) : (
            data?.results?.map(({ id, ...properties }) => (
              <Card
                key={id}
                onClick={() => onOpen(id - 1)}
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
