import {
  BoxRenderable,
  SelectRenderable,
  TextRenderable,
  type CliRenderer,
} from "@opentui/core";
import type { AppTheme } from "../theme.js";

export function createHelperPanel(
  renderer: CliRenderer,
  theme: AppTheme,
): { root: BoxRenderable; select: SelectRenderable } {
  const root = new BoxRenderable(renderer, {
    width: "100%",
    flexShrink: 0,
    flexDirection: "column",
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 2,
    paddingRight: 2,
    backgroundColor: theme.panel.elevatedBackground,
  });

  const title = new TextRenderable(renderer, {
    content: "How would you like to view the results?",
    fg: theme.header.highlight,
  });

  const select = new SelectRenderable(renderer, {
    height: 6,
    width: "100%",
    options: [
      {
        name: "List",
        description: "Display results as a vertical list of users",
      },
      {
        name: "Table",
        description: "Display results as a compact tabular layout",
      },
    ],
    backgroundColor: theme.panel.elevatedBackground,
    focusedBackgroundColor: theme.panel.elevatedBackground,
    textColor: theme.panel.text,
    selectedBackgroundColor: theme.panel.elevatedBackground,
    selectedTextColor: theme.header.highlight,
    descriptionColor: theme.text.muted,
    selectedDescriptionColor: theme.text.muted,
    showDescription: true,
  });

  const instructions = new TextRenderable(renderer, {
    content: "Press ↑/↓ to move and Enter to select",
    fg: theme.text.muted,
  });

  root.add(title);
  root.add(select);
  root.add(instructions);

  return { root, select };
}
