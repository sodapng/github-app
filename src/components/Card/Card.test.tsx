import { render, screen } from '@testing-library/react'
import { Card } from 'components'
import cards from 'data/cards.json'
import { expect, test } from 'vitest'

test('Компонент Card отображает заголовок и изображение правильно', () => {
  const { body, imgSrc, title } = cards[0]

  render(
    <Card
      title={title}
      body={body}
      imgSrc={imgSrc}
    />,
  )

  expect(screen.getByText(title)).toBeInTheDocument()

  const testImage = screen.getByRole('img', { name: 'image' }) as HTMLImageElement

  expect(testImage.src).toContain(imgSrc)
})

test('Компонент Card отображает изображение правильно для всех карточек', () => {
  render(
    <>
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
    </>,
  )

  // eslint-disable-next-line no-restricted-syntax
  for (const { imgSrc } of cards) {
    const testImage = screen.getByAltText(imgSrc) as HTMLImageElement
    expect(testImage.src).toContain(imgSrc)
  }

  expect(screen.getAllByRole('img').length).toBe(cards.length)
})
