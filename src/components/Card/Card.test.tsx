import { render, screen } from '@testing-library/react'
import { Card } from 'components'
import cards from 'data/cards.json'
import { expect, test } from 'vitest'

test('Компонент Card отображает заголовок и изображение правильно', () => {
  const { id, image, name } = cards[0]

  render(
    <Card
      key={id}
      name={name}
      image={image}
    />,
  )

  expect(screen.getByText(name)).toBeInTheDocument()

  const testImage = screen.getByRole<HTMLInputElement>('img', { name: 'image' })

  expect(testImage.src).toContain(image)
})

test('Компонент Card отображает изображение правильно для всех карточек', () => {
  render(
    <>
      {cards.map(({ id, image, name }) => {
        return (
          <Card
            key={id}
            name={name}
            image={image}
          />
        )
      })}
    </>,
  )

  for (const { image } of cards) {
    const testImage = screen.getByAltText<HTMLImageElement>(image)
    expect(testImage.src).toContain(image)
  }

  expect(screen.getAllByRole('img').length).toBe(cards.length)
})
