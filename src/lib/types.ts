export class AppError extends Error {
}

export interface State {
  session?: WorkSession
}

export interface WorkSession {
  intervalId: number
  startTime: number
  totalMinutes: number
}

export type Action =
  | { type: "tick" } // one minute tick
  | ({ type: "start" } & StartQuery)
  | { type: "abort" }

export interface StartQuery {
  minutes: number
}
export type StartResponse = State
export type AbortResponse = State

export interface Progress {
  elapsedMinutes: number
  remainingMinutes: number
}
