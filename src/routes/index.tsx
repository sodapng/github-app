import { LayoutWithRouter } from 'components/Layout'
import { About, Main, NotFound } from 'pages'
import { RouteObject } from 'react-router-dom'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <LayoutWithRouter />,
    children: [
      { element: <Main />, index: true },
      { path: '*', element: <NotFound /> },
      { path: 'about', element: <About /> },
    ],
  },
]
