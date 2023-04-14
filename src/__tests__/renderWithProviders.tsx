import type { PropsWithChildren, ReactElement } from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'

import { store } from 'store'

export function renderWithProviders(ui: ReactElement) {
  function Wrapper({ children }: PropsWithChildren<{}>) {
    return <Provider store={store}>{children}</Provider>
  }

  return { store, ...render(ui, { wrapper: Wrapper }) }
}
