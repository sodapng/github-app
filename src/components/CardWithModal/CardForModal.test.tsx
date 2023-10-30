import { randomUUID } from 'node:crypto'

import { renderWithProviders } from '__tests__/renderWithProviders'
import { screen, waitForElementToBeRemoved } from '@testing-library/react'
import { CardForModal } from 'components'
import { expect, test, vi } from 'vitest'

const mockLoaderTestId = randomUUID()

vi.mock('components/Loader', () => ({
  Loader: () => <div data-testid={mockLoaderTestId} />,
}))

test('CardForModal', async () => {
  renderWithProviders(<CardForModal id={1} />)

  expect(screen.getByTestId(mockLoaderTestId)).not.toBeNull()

  await waitForElementToBeRemoved(() => screen.queryByTestId(mockLoaderTestId))

  expect(await screen.findByText('Rick Sanchez')).toBeInTheDocument()
})
