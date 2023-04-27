import { Layout } from 'components'
import { About, Form, Main, NotFound } from 'pages'
import { type RouteObject, useRoutes } from 'react-router-dom'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { element: <Main />, index: true },
      { path: '*', element: <NotFound /> },
      { path: 'about', element: <About /> },
      { path: 'form', element: <Form /> },
    ],
  },
]

export const AppRoutes = () => {
  return useRoutes(routes)
}
