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

  const testImage = screen.getByRole<HTMLInputElement>('img', { name: 'image' })

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

  for (const { imgSrc } of cards) {
    const testImage = screen.getByAltText<HTMLImageElement>(imgSrc)
    expect(testImage.src).toContain(imgSrc)
  }

  expect(screen.getAllByRole('img').length).toBe(cards.length)
})
