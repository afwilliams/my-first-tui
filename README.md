# GitHub Search TUI

A terminal user interface built with [OpenTUI](https://github.com/anomalyco/opentui) for searching GitHub users from the command line.

## Features

- Search GitHub users by login.
- Animated status indicators (loading, success, error).
- Choose between list and table view for results.
- Terminal-native keyboard navigation.
- Theme tokens that respect the terminal's default foreground/background.

## Stack

- [Bun](https://bun.sh) as the runtime and package manager.
- [OpenTUI](https://github.com/anomalyco/opentui) for the terminal UI.
- TypeScript for type safety.

## Getting started

Install dependencies:

```bash
bun install
```

Run the app:

```bash
bun run dev
```

Build / type check:

```bash
bunx tsc --noEmit
```

## Project structure

```
src/
  index.ts                  # Entry point, bootstrap, wiring
  theme.ts                  # Theme tokens (background, text, panel, etc.)
  panels/
    CommandPanel.ts         # Bottom panel with the search input
    MainPanel.ts             # Top panel with the chat / results
  ui/
    ConsoleMessageView.ts   # Dispatcher by role
    UserMessageView.ts      # Render for user messages
    SystemMessageView.ts    # Render for system messages with status
    HelperPanel.ts          # Select prompt for result format
    ListMessageView.ts      # List view of results
    TableMessageView.ts     # Table view of results
    SearchInput.ts          # Input renderable
  types/
    console.ts              # ConsoleMessage, ConsoleMessageStatus
  services/
    github.ts               # GitHub API client (searchUsers)
```

## Architecture notes

- Each view in `ui/` is a small factory that owns its render and, when relevant, its own animation.
- `panels/` are compositions of views, not views themselves.
- `index.ts` is the only place that wires the panels, the input, and the GitHub service.
- The theme is built around terminal defaults (`RGBA.defaultBackground`, `RGBA.defaultForeground`) plus a few ANSI accent slots.

## License

MIT
