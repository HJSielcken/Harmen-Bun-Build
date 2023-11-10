import { renderToReadableStream } from "react-dom/server";
import Index from './build/App'

const basePath = './build'

Bun.serve({
  async fetch(request) {
    const { pathname } = new URL(request.url)
    if (pathname === '/') return new Response(await renderToReadableStream(<Index />))

    const file = Bun.file(`${basePath}${pathname}`)
    const fileExists = Boolean(file.size)

    if (fileExists) return new Response(file)

    return new Response('Not Found', { status: 404 })
  }
})
