const port = 40000

export function startServer() {
  function handler(request: Request): Response {
    return new Response("hello", { status: 200 })
  }

  Deno.serve({ port }, handler)
}
