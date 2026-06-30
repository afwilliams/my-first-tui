import { BoxRenderable, TextRenderable, type CliRenderer } from "@opentui/core";
import type { AppTheme } from "../theme.js";

export type TableRow = {
  login: string;
  html_url: string;
};

export function createTableMessageView(
  renderer: CliRenderer,
  theme: AppTheme,
  title: string,
  rows: TableRow[],
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

  const table = new BoxRenderable(renderer, {
    width: "100%",
    flexShrink: 0,
    flexDirection: "column",
  });

  for (const row of rows) {
    const rowLabel = new TextRenderable(renderer, {
      content: `${row.login.padEnd(20)} ${row.html_url}`,
      fg: theme.panel.text,
    });
    table.add(rowLabel);
  }

  root.add(titleLabel);
  root.add(table);

  return root;
}
