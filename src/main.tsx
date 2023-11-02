import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { App, CardCatBreed } from './App'
import { ErrorBoundary } from './components/ErrorBoundary'

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
        path: '/?details=:breedId',
        element: <CardCatBreed />,
        caseSensitive: false,
      },
    ],
  },
])

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
