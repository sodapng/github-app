import { apiClient, Character } from 'api/ApiClient'
import { AxiosError } from 'axios'
import { Loader } from 'components'
import { useMount } from 'hooks'
import { XMarkIcon } from 'icons'
import { useState } from 'react'

type CardForModalProperties = {
  id: number
  onClose: React.MouseEventHandler<HTMLDivElement>
}

export function CardForModal({ id, onClose }: CardForModalProperties) {
  const [data, setData] = useState<Character>({} as Character)
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = () => {
    setIsLoading(true)
    apiClient
      .getCharacter(id)
      .then(({ data }) => {
        setData(data)
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          console.log(error.message)
        }
        setData({} as Character)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useMount(fetchData)

  if (isLoading) return <Loader />

  return (
    <div className='relative z-50'>
      <div className='flex max-w-[310px] flex-col gap-2 rounded-lg border bg-white p-2 shadow-2xl shadow-slate-800'>
        <div className='h-36 overflow-hidden rounded-md'>
          <img
            aria-label='image'
            loading='lazy'
            className='object-cover'
            src={data.image}
            alt={data.image}
            width={292}
            height={144}
          />
        </div>
        <h5 className='line-clamp-1 font-semibold'>{data.name}</h5>
      </div>
      <div
        onClick={onClose}
        className='absolute right-0 top-0 -mr-5 -mt-5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white shadow-md hover:bg-violet-50'
      >
        <XMarkIcon className='h-7 w-7 text-violet-500' />
      </div>
    </div>
  )
}
