import { RGBA, type CliRenderer, type ColorInput } from "@opentui/core";

export type AppTheme = {
  background: ColorInput;
  text: {
    muted: ColorInput;
  };
  header: {
    background: ColorInput;
    accent: ColorInput;
    text: ColorInput;
    muted: ColorInput;
    highlight: ColorInput;
  };
  panel: {
    background: ColorInput;
    elevatedBackground: ColorInput;
    text: ColorInput;
  };
  menu: {
    background: ColorInput;
    text: ColorInput;
    selected: ColorInput;
    selectedText: ColorInput;
    muted: ColorInput;
  };
  footer: {
    text: ColorInput;
  };
};

export const fallbackTheme: AppTheme = {
  background: RGBA.defaultBackground(),
  text: {
    muted: RGBA.fromIndex(8),
  },
  header: {
    background: RGBA.defaultBackground(),
    accent: RGBA.fromIndex(6),
    text: RGBA.defaultForeground(),
    muted: RGBA.fromIndex(8),
    highlight: RGBA.fromIndex(3),
  },
  panel: {
    background: RGBA.defaultBackground(),
    elevatedBackground: RGBA.fromIndex(0),
    text: RGBA.defaultForeground(),
  },
  menu: {
    background: RGBA.defaultBackground(),
    text: RGBA.defaultForeground(),
    selected: RGBA.fromIndex(8),
    selectedText: RGBA.defaultForeground(),
    muted: RGBA.fromIndex(8),
  },
  footer: {
    text: RGBA.defaultForeground(),
  },
};

export async function resolveAppTheme(renderer: CliRenderer): Promise<AppTheme> {
  try {
    const colors = await renderer.getPalette({ size: 16 });
    const background = colors.defaultBackground
      ? RGBA.defaultBackground(colors.defaultBackground)
      : RGBA.defaultBackground();
    const text = colors.defaultForeground
      ? RGBA.defaultForeground(colors.defaultForeground)
      : RGBA.defaultForeground();

    return {
      ...fallbackTheme,
      background,
      text: {
        ...fallbackTheme.text,
        muted: RGBA.fromIndex(8),
      },
      header: {
        ...fallbackTheme.header,
        background,
        text,
      },
      panel: {
        ...fallbackTheme.panel,
        background,
        text,
      },
      menu: {
        ...fallbackTheme.menu,
        background,
        text,
        selectedText: text,
      },
      footer: {
        ...fallbackTheme.footer,
        text,
      },
    };
  } catch {
    return fallbackTheme;
  }
}
