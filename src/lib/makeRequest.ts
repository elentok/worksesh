import { AppError } from "./types.ts"

export async function makeRequest<TResponse>(
  path: string,
  query: Record<string, string> = {},
): Promise<TResponse> {
  const url = new URL(`http://localhost:40000/${path}`)
  console.log("[david] [makeRequest.ts] makeRequest", query)
  for (const key of Object.keys(query)) {
    url.searchParams.set(key, query[key])
  }
  console.log("[david] [makeRequest.ts] makeRequest", url)
  const resp = await fetch(url.toString())

  if (!resp.ok) {
    throw new AppError(`Request to ${path} failed with error ${resp.status}`)
  }

  return await resp.json()
}
