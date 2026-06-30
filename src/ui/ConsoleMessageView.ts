import type { BoxRenderable, CliRenderer } from "@opentui/core";
import type { AppTheme } from "../theme.js";
import type {
  ConsoleMessage,
  ConsoleMessageStatus,
} from "../types/console.js";
import { createSystemMessageView } from "./SystemMessageView.js";
import { createUserMessageView } from "./UserMessageView.js";

export type ConsoleMessageView = {
  root: BoxRenderable;
  setStatus?: (status: ConsoleMessageStatus) => void;
};

export function createConsoleMessage(
  renderer: CliRenderer,
  theme: AppTheme,
  message: ConsoleMessage,
): ConsoleMessageView {
  if (message.role === "user") {
    return {
      root: createUserMessageView(renderer, theme, message),
    };
  }
  return createSystemMessageView(renderer, theme, message);
}
