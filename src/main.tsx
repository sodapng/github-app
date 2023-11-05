import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { App, CardCatBreed } from './App'
import { ErrorBoundary } from './components'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary fallback={<h1>Oops... 🔥</h1>}>
        <App />
      </ErrorBoundary>
    ),
    children: [
      {
        path: '/:breedId',
        element: <CardCatBreed />,
      },
    ],
  },
])

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
