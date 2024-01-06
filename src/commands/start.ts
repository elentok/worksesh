import { sendStart } from "../lib/actionRequests.ts"

export async function start(minutes: number) {
  const resp = await sendStart({ minutes })
  console.log("[david] [start.ts] start", resp)
}
