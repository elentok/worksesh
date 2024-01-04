import { Command } from "npm:commander"
import { startServer } from "./commands/server.ts"

function main() {
  const program = new Command()

  program.command("server")
    .description("Start the worksesh server")
    .action(startServer)

  try {
    program.parse()
  } catch (e) {
    if (e instanceof LayerError || e instanceof LayoutError) {
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
