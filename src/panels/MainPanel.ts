import {
  ASCIIFontRenderable,
  BoxRenderable,
  ScrollBoxRenderable,
  TextRenderable,
  type CliRenderer,
} from "@opentui/core";
import type { AppTheme } from "../theme.js";
import type {
  ConsoleMessage,
  ConsoleMessageStatus,
} from "../types/console.js";
import {
  createConsoleMessage,
  type ConsoleMessageView,
} from "../ui/ConsoleMessageView.js";
import { createListMessageView } from "../ui/ListMessageView.js";
import { createTableMessageView } from "../ui/TableMessageView.js";

type UpdateMessageOptions = {
  content?: string;
  status?: ConsoleMessageStatus;
};

type AppendSystemMessageOptions = {
  title?: string;
  status?: ConsoleMessageStatus;
};

export function createMainPanel(renderer: CliRenderer, theme: AppTheme) {
  const root = new ScrollBoxRenderable(renderer, {
    width: "100%",
    flexGrow: 1,
    minHeight: 0,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-start",
    padding: 1,
    stickyScroll: true,
    stickyStart: "bottom",
    verticalScrollbarOptions: {
      visible: false,
    },
  });

  root.verticalScrollBar.visible = false;

  const welcomeInitial = new ASCIIFontRenderable(renderer, {
    text: "GS",
    font: "block",
    color: theme.header.accent,
  });

  const welcomeTitle = new TextRenderable(renderer, {
    content: "GITHUB SEARCH",
    fg: theme.header.accent,
  });

  root.add(welcomeInitial);
  root.add(welcomeTitle);

  const views = new Map<string, ConsoleMessageView>();

  const hideWelcome = () => {
    if (welcomeInitial.parent === root) {
      root.remove(welcomeInitial.id);
    }
    if (welcomeTitle.parent === root) {
      root.remove(welcomeTitle.id);
    }
    root.requestRender();
  };

  const appendConsoleMessage = (message: ConsoleMessage) => {
    hideWelcome();
    const view = createConsoleMessage(renderer, theme, message);
    root.add(view.root);
    views.set(message.id, view);
    root.requestRender();
    return message;
  };

  const appendUserMessage = (content: string, title?: string) => {
    return appendConsoleMessage({
      id: crypto.randomUUID(),
      role: "user",
      title,
      content,
    });
  };

  const appendSystemMessage = (
    content: string,
    options: AppendSystemMessageOptions = {},
  ) => {
    return appendConsoleMessage({
      id: crypto.randomUUID(),
      role: "system",
      title: options.title,
      content,
      status: options.status,
    });
  };

  const updateMessage = (id: string, options: UpdateMessageOptions) => {
    const view = views.get(id);
    if (!view) return;
    if (options.status !== undefined && view.setStatus) {
      view.setStatus(options.status);
    }
    if (options.content !== undefined) {
      const labels = view.root
        .getChildren()
        .filter((child): child is TextRenderable => child instanceof TextRenderable);
      const contentLabel = labels[labels.length - 1] ?? labels[0];
      if (contentLabel) {
        contentLabel.content = options.content;
        view.root.requestRender();
      }
    }
  };

  const appendListMessage = (title: string, items: string[]) => {
    hideWelcome();
    const view = createListMessageView(renderer, theme, title, items);
    root.add(view);
    root.requestRender();
    return view;
  };

  const appendTableMessage = (
    title: string,
    rows: { login: string; html_url: string }[],
  ) => {
    hideWelcome();
    const view = createTableMessageView(renderer, theme, title, rows);
    root.add(view);
    root.requestRender();
    return view;
  };

  return {
    root,
    hideWelcome,
    appendConsoleMessage,
    appendUserMessage,
    appendSystemMessage,
    appendListMessage,
    appendTableMessage,
    updateMessage,
  };
}
