import { Action, Progress, State, WorkSession } from "./types.ts"

let state: State = {}

export function getState(): State {
  return { ...state }
}

export function updateState(action: Action): State {
  state = reducer(state, action)
  return state
}

const MINUTE = 1000 * 10

function startTicking(): number {
  return setInterval(() => {
    console.log("[david] [state.ts] tick")
    updateState({ type: "tick" })
  }, MINUTE)
}

function calcProgress(session: WorkSession): Progress {
  const elapsedMinutes = Math.round(
    (Date.now() - session.startTime) / 1000 / 60,
  )
  const remainingMinutes = session.totalMinutes - elapsedMinutes
  console.log("[david] [state.ts] calcProgress", {
    totalMinutes: session.totalMinutes,
    elapsedMinutes,
    remainingMinutes,
  })
  return {
    elapsedMinutes,
    remainingMinutes,
  }
}

function reducer(oldState: State, action: Action): State {
  console.log("[david] [state.ts] reducer", action)
  switch (action.type) {
    case "tick":
      if (oldState.session == null) {
        throw new Error("Got a tick action even though there's no session")
      }
      if (calcProgress(oldState.session).remainingMinutes <= 0) {
        stopSession(oldState.session, { isAbort: false })
        return { ...oldState, session: undefined }
      }
      return oldState
    case "start":
      return {
        ...oldState,
        session: {
          startTime: Date.now(),
          intervalId: startTicking(),
          totalMinutes: action.minutes,
        },
      }
    case "abort":
      if (oldState.session != null) {
        stopSession(oldState.session, { isAbort: true })
      }
      return { ...oldState, session: undefined }
  }
}

function stopSession(
  session: WorkSession,
  { isAbort }: { isAbort: boolean },
) {
  console.log("[david] [state.ts] stopSession")
  clearInterval(session.intervalId)

  if (isAbort) {
    console.info("session aborted")
  } else {
    console.info("session completed successfuly")
  }
}
