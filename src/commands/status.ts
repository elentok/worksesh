import { sendStatus } from "../lib/actionRequests.ts"

export async function status() {
  const resp = await sendStatus()
  console.log("[david] [start.ts] start", resp)
}
