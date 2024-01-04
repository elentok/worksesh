const port = 40000

import { Application, Router } from "https://deno.land/x/oak/mod.ts"

export async function startServer() {
  const router = new Router()
  router.get("/", (context) => {
    context.response.body = "Hello world!"
  })

  const app = new Application()
  app.use(router.routes())
  app.use(router.allowedMethods())

  await app.listen({ port })

  // function handler(request: Request): Response {
  //   return new Response("hello", { status: 200 })
  // }
  //
  // Deno.serve({ port }, handler)
}
