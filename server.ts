import fs from 'node:fs/promises'

import express from 'express'
import { ViteDevServer } from 'vite'

void (async () => {
  // Constants
  const isProduction = process.env.NODE_ENV === 'production'
  const port = process.env.PORT || 5173
  const base = process.env.BASE || '/'

  // Cached production assets
  const templateHtml = isProduction ? await fs.readFile('./dist/client/index.html', 'utf8') : ''
  const ssrManifest = isProduction
    ? await fs.readFile('./dist/client/ssr-manifest.json', 'utf8')
    : undefined

  // Create http server
  const app = express()

  // Add Vite or respective production middlewares
  let vite: ViteDevServer
  if (isProduction) {
    const compression = (await import('compression')).default
    const sirv = (await import('sirv')).default
    app.use(compression())
    app.use(base, sirv('./dist/client', { extensions: [] }))
  } else {
    const { createServer } = await import('vite')
    vite = await createServer({
      server: { middlewareMode: true },
      appType: 'custom',
      base,
    })
    app.use(vite.middlewares)
  }

  // Serve HTML
  app.use('*', async (request, response) => {
    try {
      const url = request.originalUrl.replace(base, '')

      let template: string
      let render
      if (isProduction) {
        template = templateHtml
        // @ts-ignore
        render = (await import('./dist/server/entry-server.js')).render
      } else {
        // Always read fresh template in development
        template = await fs.readFile('./index.html', 'utf8')
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render
      }

      await render(response, url, template)
    } catch (error) {
      vite?.ssrFixStacktrace(error)
      console.log(error.stack)
      response.status(500).end(error.stack)
    }
  })

  // Start http server
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
  })
})()
