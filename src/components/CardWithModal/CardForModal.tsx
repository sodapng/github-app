import cx from 'clsx'
import { Loader } from 'components'
import { XMarkIcon } from 'icons'
import { useEffect } from 'react'
import { useGetCharacterByIdQuery } from 'store'

type CardForModalProperties = {
  id: number
  onClose?: () => void
}

export function CardForModal({ id, onClose }: CardForModalProperties) {
  const { data, isFetching, isError } = useGetCharacterByIdQuery(id)

  useEffect(() => {
    if (isError) {
      onClose?.()
    }
  }, [isError, onClose])

  if (isFetching) return <Loader />
  if (isError) return null

  return (
    <div className='relative z-50'>
      <div className='flex w-[600px] flex-row gap-2 rounded-lg border bg-white p-2 shadow-2xl shadow-zinc-500'>
        <div className='w-[230px] overflow-hidden rounded-md'>
          <img
            aria-label='image'
            loading='lazy'
            className='object-cover'
            src={data?.image}
            alt='{data.image}'
            width='230'
            height='230'
          />
        </div>
        <div className='flex flex-col justify-around text-lg font-bold text-slate-700'>
          <div>
            <p className='flex items-center gap-2 text-3xl'>{data?.name}</p>
            <span className='flex items-center gap-2'>
              <span
                className={cx(
                  'w-2 h-2 rounded-full',
                  data?.status === 'unknown'
                    ? 'bg-slate-500'
                    : data?.status === 'Dead'
                    ? 'bg-red-500'
                    : 'bg-green-500',
                )}
              />
              {data?.status} - {data?.species} - {data?.gender}
            </span>
          </div>
          <div>
            <p className='text-base text-slate-600'>Last known location:</p>
            <p className=''>{data?.location?.name}</p>
          </div>
          <div>
            <p className='text-base text-slate-600'>First seen in:</p>
            <p className=''>Episode {data?.episode?.at(0)?.match(/\d+$/g)}</p>
          </div>
        </div>
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
