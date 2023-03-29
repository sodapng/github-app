import 'index.css'

import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from 'routes'

const router = createBrowserRouter(routes)

createRoot(document.querySelector('#root') as HTMLElement).render(
  <RouterProvider router={router} />,
)
