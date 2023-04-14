import 'index.css'
import 'react-toastify/dist/ReactToastify.css'

import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from 'routes'
import { store } from 'store'

const router = createBrowserRouter(routes)

createRoot(document.querySelector('#root') as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
