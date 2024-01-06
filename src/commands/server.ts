const port = 40000

import { Application, Router } from "https://deno.land/x/oak/mod.ts"
import { getState, updateState } from "../lib/state.ts"

export async function startServer() {
  const router = new Router()
  router.get("/", (context) => {
    context.response.body = "OK"
  })

  router.get("/status", (context) => {
    console.log("[david] [server.ts] /status")
    context.response.body = JSON.stringify(getState())
  })

  router.get("/start", (context) => {
    console.log(
      '[david] [server.ts] startServer > router.get("/start"',
      context.params,
    )
    const minutes = Number(context.params["minutes"])
    console.log("[david] [server.ts] /start")

    const state = updateState({ type: "start", minutes })
    context.response.body = JSON.stringify(state)
  })

  // router.get("/abort", (context) => {
  //   state = { ...state, isInWorkSession: false }
  //   context.response.body = JSON.stringify(state)
  // })

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
