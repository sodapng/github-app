import 'index.css'
import 'react-toastify/dist/ReactToastify.css'

import { renderToPipeableStream } from 'react-dom/server'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom/server'
import { AppRoutes } from 'routes'
import { api, setupStore } from 'store'

import type { Response } from 'express'
import { StrictMode } from 'react'

const store = setupStore()

export async function render(response: Response, url: string, template: string) {
  let didError = false

  await store.dispatch(api.endpoints.getCharacters.initiate({ name: '' }))
  await Promise.all(store.dispatch(api.util.getRunningQueriesThunk()))

  const preloadedState = store.getState()

  const [firstPart, secondPart] = template
    .replace(
      '<!--app-preloadState-->',
      `window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}`,
    )
    .split('<!--app-html-->')

  const { pipe } = renderToPipeableStream(
    <StrictMode>
      <Provider store={store}>
        <StaticRouter location={`/${url}`}>
          <AppRoutes />
        </StaticRouter>
      </Provider>
    </StrictMode>,
    {
      onShellReady() {
        response.statusCode = didError ? 500 : 200
        response.setHeader('content-type', 'text/html')
        response.write(firstPart)
        pipe(response)
        response.write(secondPart)
      },
      onError() {
        didError = true
      },
    },
  )
}
