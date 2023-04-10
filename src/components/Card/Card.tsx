import type { MouseEventHandler } from 'react'

type CardProperties = {
  name: string
  image: string
  onClick?: MouseEventHandler<HTMLDivElement>
}

export function Card({ image, name, onClick }: CardProperties) {
  return (
    <div
      data-testid={name}
      onClick={onClick}
      className='flex cursor-pointer flex-col gap-2 justify-self-center rounded-lg border p-2 shadow-md shadow-violet-100 hover:border-violet-500 hover:ring hover:ring-violet-300 hover:ring-offset-1'
    >
      <div className='h-36 overflow-hidden rounded-md'>
        <img
          aria-label='image'
          loading='lazy'
          className='object-cover'
          src={image}
          alt={image}
          width={292}
          height={144}
        />
      </div>
      <h5 className='line-clamp-1 font-semibold'>{name}</h5>
    </div>
  )
}
