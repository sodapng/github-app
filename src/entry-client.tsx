import 'index.css'
import 'react-toastify/dist/ReactToastify.css'

import { hydrateRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from 'routes'
import { setupStore } from 'store'
import { StrictMode } from 'react'

const store = setupStore(window.__PRELOADED_STATE__)
delete window.__PRELOADED_STATE__

hydrateRoot(
  document.querySelector('#root') as HTMLElement,
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
