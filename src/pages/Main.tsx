import { Card, Search } from 'components'
import cards from 'data/cards.json'

export function Main() {
  return (
    <div className="mx-auto mt-24 mb-4 min-h-screen px-12">
      <Search />
      <div className="flex flex-wrap gap-5">
        {cards.map(({ id, body, imgSrc, title }) => {
          return (
            <Card
              key={id}
              body={body}
              title={title}
              imgSrc={imgSrc}
            />
          )
        })}
      </div>
    </div>
  )
}
