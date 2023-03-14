import { About, Main, NotFound } from 'pages'
import { RouteObject } from 'react-router-dom'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Main />,
    errorElement: <NotFound />,
  },
  { path: 'about', element: <About /> },
]
