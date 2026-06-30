import { BoxRenderable, TextRenderable, type CliRenderer } from "@opentui/core";
import type { AppTheme } from "../theme.js";

const SPINNER_FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
const SPINNER_INTERVAL_MS = 80;

export function createLoader(renderer: CliRenderer, theme: AppTheme) {
  const root = new BoxRenderable(renderer, {
    flexShrink: 0,
    flexDirection: "row",
    justifyContent: "flex-start",
  });

  const label = new TextRenderable(renderer, {
    content: SPINNER_FRAMES[0] ?? "",
    fg: theme.header.highlight,
  });

  root.add(label);

  let index = 0;
  let interval: ReturnType<typeof setInterval> | null = null;

  const start = () => {
    if (interval) return;
    interval = setInterval(() => {
      index = (index + 1) % SPINNER_FRAMES.length;
      label.content = SPINNER_FRAMES[index] ?? "";
      root.requestRender();
    }, SPINNER_INTERVAL_MS);
  };

  const stop = () => {
    if (!interval) return;
    clearInterval(interval);
    interval = null;
  };

  return { root, start, stop };
}
