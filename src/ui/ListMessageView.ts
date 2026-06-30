import { BoxRenderable, TextRenderable, type CliRenderer } from "@opentui/core";
import type { AppTheme } from "../theme.js";

export function createListMessageView(
  renderer: CliRenderer,
  theme: AppTheme,
  title: string,
  items: string[],
): BoxRenderable {
  const root = new BoxRenderable(renderer, {
    width: "100%",
    flexShrink: 0,
    flexDirection: "column",
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 2,
    paddingRight: 2,
  });

  const titleLabel = new TextRenderable(renderer, {
    content: title,
    fg: theme.header.highlight,
  });

  const list = new BoxRenderable(renderer, {
    width: "100%",
    flexShrink: 0,
    flexDirection: "column",
  });

  for (const item of items) {
    const itemLabel = new TextRenderable(renderer, {
      content: item,
      fg: theme.panel.text,
    });
    list.add(itemLabel);
  }

  root.add(titleLabel);
  root.add(list);

  return root;
}
