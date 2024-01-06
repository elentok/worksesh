import { Command } from "npm:commander"
import { startServer } from "./commands/server.ts"
import { AppError } from "./lib/types.ts"
import { start } from "./commands/start.ts"
import { status } from "./commands/status.ts"

function main() {
  const program = new Command()

  program.command("server")
    .description("Start the worksesh server")
    .action(startServer)

  program.command("status")
    .description("Shows the current status")
    .action(status)

  program.command("start <minutes>")
    .description("Start a worksession")
    .action(start)

  try {
    program.parse()
  } catch (e) {
    if (e instanceof AppError) {
      console.error(e.message)
      Deno.exit(1)
    } else {
      throw e
    }
  }
}

if (import.meta.main) {
  main()
}
