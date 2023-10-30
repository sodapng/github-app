import { randomUUID } from 'node:crypto'

import { renderWithProviders } from '__tests__/renderWithProviders'
import { screen, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import characters from 'data/characters.json'
import { Main } from 'pages'
import { expect, test, vi } from 'vitest'

const mockLoaderTestId = randomUUID()

vi.mock('components/Loader', () => ({
  Loader: () => <div data-testid={mockLoaderTestId} />,
}))

test('Main', async () => {
  const user = userEvent.setup()

  renderWithProviders(<Main />)

  expect(screen.getByTestId(mockLoaderTestId)).not.toBeNull()

  await waitForElementToBeRemoved(() => screen.queryByTestId(mockLoaderTestId))

  for (const character of characters.results) {
    expect(await screen.findByText(character.name)).toBeInTheDocument()
  }

  await user.click(await screen.findByTestId('Rick Sanchez'))
  const location = await screen.findByText('Citadel of Ricks')
  expect(location)
  await user.click(await screen.findByTestId('modal-close'))
  expect(location).not.toBeInTheDocument()
  const search = await screen.findByTestId('search')
  await user.type(search, 'Abradolf{enter}')
  expect(search).toHaveValue('Abradolf')
  await user.click(await screen.findByTestId('Abradolf Lincler'))
  expect(await screen.findByText('Testicle Monster Dimension'))
})
