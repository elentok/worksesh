import { makeRequest } from "./makeRequest.ts"
import { AbortResponse, StartQuery, StartResponse } from "./types.ts"

export async function sendStatus(): Promise<StartResponse> {
  return await makeRequest("status")
}

export async function sendStart(
  { minutes }: StartQuery,
): Promise<StartResponse> {
  return await makeRequest("start", { minutes: minutes.toString() })
}

export async function sendAbort(): Promise<AbortResponse> {
  return await makeRequest("abort")
}
