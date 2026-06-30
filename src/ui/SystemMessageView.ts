import { BoxRenderable, TextRenderable, type CliRenderer } from "@opentui/core";
import type { AppTheme } from "../theme.js";
import type { ConsoleMessage, ConsoleMessageStatus } from "../types/console.js";

const SPINNER_FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
const SPINNER_INTERVAL_MS = 80;

const STATUS_GLYPHS: Record<ConsoleMessageStatus, string> = {
  idle: "",
  loading: "⠋",
  success: "✓",
  error: "✗",
};

export function createSystemMessageView(
  renderer: CliRenderer,
  theme: AppTheme,
  message: ConsoleMessage,
): { root: BoxRenderable; setStatus: (status: ConsoleMessageStatus) => void } {
  const root = new BoxRenderable(renderer, {
    width: "100%",
    flexShrink: 0,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 1,
  });

  const initialGlyph = message.status ? STATUS_GLYPHS[message.status] : "";
  const status =
    initialGlyph.length > 0
      ? new TextRenderable(renderer, {
          content: initialGlyph,
          fg: theme.header.highlight,
        })
      : null;

  const title = message.title
    ? new TextRenderable(renderer, {
        content: message.title,
        fg: theme.header.highlight,
      })
    : null;

  const content = new TextRenderable(renderer, {
    content: message.content,
    fg: theme.text.muted,
  });

  if (status) root.add(status);
  if (title) root.add(title);
  root.add(content);

  let index = 0;
  let interval: ReturnType<typeof setInterval> | null = null;
  let animating = false;

  const ensureStatusLabel = () => {
    if (status) return;
    const label = new TextRenderable(renderer, {
      content: STATUS_GLYPHS.loading,
      fg: theme.header.highlight,
    });
    root.add(label, 0);
    // Update captured reference
    return label;
  };

  const startSpinner = () => {
    if (animating) return;
    animating = true;
    const target = ensureStatusLabel();
    if (!target) return;
    interval = setInterval(() => {
      index = (index + 1) % SPINNER_FRAMES.length;
      target.content = SPINNER_FRAMES[index] ?? "";
      root.requestRender();
    }, SPINNER_INTERVAL_MS);
  };

  const stopSpinner = () => {
    if (!interval) return;
    clearInterval(interval);
    interval = null;
    animating = false;
  };

  if (message.status === "loading" && status) {
    startSpinner();
  }

  const setStatus = (next: ConsoleMessageStatus) => {
    if (animating) {
      stopSpinner();
    }
    if (status) {
      status.content = STATUS_GLYPHS[next];
    }
    if (next === "loading") {
      startSpinner();
    }
    root.requestRender();
  };

  return { root, setStatus };
}
