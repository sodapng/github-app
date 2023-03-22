import { LayoutWithRouter } from 'components'
import { About, Form, Main, NotFound } from 'pages'
import { RouteObject } from 'react-router-dom'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <LayoutWithRouter />,
    children: [
      { element: <Main />, index: true },
      { path: '*', element: <NotFound /> },
      { path: 'about', element: <About /> },
      { path: 'form', element: <Form /> },
    ],
  },
]
