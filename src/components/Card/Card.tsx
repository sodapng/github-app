import { PureComponent } from 'react'

type CardProperties = {
  title: string
  body: string
  imgSrc: string
}

export class Card extends PureComponent<CardProperties> {
  render() {
    const { body, imgSrc, title } = this.props

    return (
      <div className="flex max-w-[310px] cursor-pointer flex-col gap-2 rounded-lg border p-2 shadow-md shadow-violet-100 hover:border-violet-500 hover:ring hover:ring-violet-300 hover:ring-offset-4">
        <div className="h-36 overflow-hidden rounded-md">
          <img
            aria-label="image"
            loading="lazy"
            className="object-cover"
            src={imgSrc}
            alt={imgSrc}
          />
        </div>
        <h5 className="font-semibold line-clamp-1">{title}</h5>
        <p className="line-clamp-4">{body}</p>
      </div>
    )
  }
}
