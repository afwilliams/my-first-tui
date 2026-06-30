import { BoxRenderable, TextRenderable, type CliRenderer } from "@opentui/core";
import type { AppTheme } from "../theme.js";
import type { ConsoleMessage } from "../types/console.js";

export function createUserMessageView(
  renderer: CliRenderer,
  theme: AppTheme,
  message: ConsoleMessage,
): BoxRenderable {
  const root = new BoxRenderable(renderer, {
    width: "100%",
    flexShrink: 0,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 1,
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 2,
    paddingRight: 2,
    marginTop: 1,
    backgroundColor: theme.panel.elevatedBackground,
  });

  if (message.title) {
    const title = new TextRenderable(renderer, {
      content: message.title,
      fg: theme.header.highlight,
    });
    root.add(title);
  }

  const content = new TextRenderable(renderer, {
    content: message.content,
    fg: theme.panel.text,
  });

  root.add(content);

  return root;
}
