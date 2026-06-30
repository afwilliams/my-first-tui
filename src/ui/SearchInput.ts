import { InputRenderable, type CliRenderer } from "@opentui/core";
import type { AppTheme } from "../theme.js";

export function createSearchInput(
  renderer: CliRenderer,
  theme: AppTheme,
): InputRenderable {
  return new InputRenderable(renderer, {
    placeholder: "",
    width: "100%",
    flexGrow: 1,
    value: "",
    textColor: theme.header.text,
    focusedTextColor: theme.header.text,
    placeholderColor: theme.header.muted,
  });
}
