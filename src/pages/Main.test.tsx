import { randomUUID } from 'node:crypto'

import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import characters from 'data/characters.json'
import { Main } from 'pages'
import { expect, test, vi } from 'vitest'

const mockLoaderTestId = randomUUID()

vi.mock('components/Loader', () => ({
  Loader: () => <div data-testid={mockLoaderTestId} />,
}))

test('Main', async () => {
  render(<Main />)

  expect(screen.getByTestId(mockLoaderTestId)).not.toBeNull()

  await waitForElementToBeRemoved(() => screen.queryByTestId(mockLoaderTestId))

  for (const character of characters.results) {
    expect(await screen.findByText(character.name)).toBeInTheDocument()
  }
})
