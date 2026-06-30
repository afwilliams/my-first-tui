import { BoxRenderable, TextRenderable, type CliRenderer } from "@opentui/core";
import type { AppTheme } from "../theme.js";
import { createSearchInput } from "../ui/SearchInput.js";

export function createCommandPanel(renderer: CliRenderer, theme: AppTheme) {
  const root = new BoxRenderable(renderer, {
    width: "100%",
    marginTop: 1,
    flexDirection: "column",
    flexShrink: 0,
    gap: 1,
  });

  const card = new BoxRenderable(renderer, {
    width: "100%",
    flexShrink: 0,
    paddingTop: 1,
    paddingLeft: 2,
    paddingRight: 2,
    paddingBottom: 1,
    flexDirection: "column",
    gap: 1,
    backgroundColor: theme.panel.elevatedBackground,
  });

  const inputRow = new BoxRenderable(renderer, {
    width: "100%",
    flexShrink: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 1,
  });

  const inputPrefix = new TextRenderable(renderer, {
    content: "❯",
    marginRight: 1, 
    fg: theme.header.accent,
  });

  const searchInput = createSearchInput(renderer, theme);

  inputRow.add(inputPrefix);
  inputRow.add(searchInput);

  const searchLabelRow = new BoxRenderable(renderer, {
    width: "100%",
    flexShrink: 0,
    flexDirection: "row",
    gap: 1,
  });

  const searchLabel = new TextRenderable(renderer, {
    content: "User search",
    fg: theme.header.highlight,
  });

  const searchLabel2 = new TextRenderable(renderer, {
    content: "GitHub",
    fg: theme.panel.text,
  });

  const searchSeparator = new TextRenderable(renderer, {
    content: "-",
    fg: theme.header.muted,
  });

  searchLabelRow.add(searchLabel);
  searchLabelRow.add(searchSeparator);
  searchLabelRow.add(searchLabel2);

  card.add(inputRow);
  card.add(searchLabelRow);

  const statusBar = new BoxRenderable(renderer, {
    width: "100%",
    flexShrink: 0,
    flexDirection: "row",
    justifyContent: "flex-end",
  });

  const statusBarText = new TextRenderable(renderer, {
    content: "Esc: quit | Ctrl+C: quit",
    fg: theme.footer.text,
  });

  statusBar.add(statusBarText);
  root.add(card);
  root.add(statusBar);

  return { root, input: searchInput };
}
