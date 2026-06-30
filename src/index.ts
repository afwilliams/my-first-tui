import {
  BoxRenderable,
  SelectRenderableEvents,
  createCliRenderer,
} from "@opentui/core";
import { createCommandPanel } from "./panels/CommandPanel.js";
import { createMainPanel } from "./panels/MainPanel.js";
import { searchUsers } from "./services/github.js";
import { resolveAppTheme } from "./theme.js";
import { createHelperPanel } from "./ui/HelperPanel.js";

const renderer = await createCliRenderer();
const theme = await resolveAppTheme(renderer);

renderer.setBackgroundColor(theme.background);

const app = new BoxRenderable(renderer, {
  width: "100%",
  height: "100%",
  flexDirection: "column",
});

const mainPanel = createMainPanel(renderer, theme);
const commandPanel = createCommandPanel(renderer, theme);

app.add(mainPanel.root);
app.add(commandPanel.root);

renderer.root.add(app);

commandPanel.input.on("enter", async () => {
  const query = commandPanel.input.value.trim();
  if (!query) return;
  mainPanel.appendUserMessage(query);
  const sys = mainPanel.appendSystemMessage(
    `Searching user matches for ${query}`,
    { status: "loading" },
  );
  commandPanel.input.value = "";

  let users: Awaited<ReturnType<typeof searchUsers>> = [];
  try {
    users = await searchUsers(query);
    mainPanel.updateMessage(sys.id, { status: "success" });
    const summary =
      users.length === 0
        ? "No users found"
        : `Found ${users.length} matches`;
    mainPanel.appendSystemMessage(summary);
    mainPanel.appendSystemMessage("Preparing your results for display...");
    const helperPanel = createHelperPanel(renderer, theme);
    app.add(helperPanel.root, 1);
    helperPanel.select.on(SelectRenderableEvents.ITEM_SELECTED, (index, option) => {
      app.remove(helperPanel.root.id);
      mainPanel.appendSystemMessage(`Displaying results in ${option.name} mode...`);
      if (users.length === 0) return;
      if (option.name === "List") {
        const logins = users.map((u) => u.login);
        mainPanel.appendListMessage("Results", logins);
      } else if (option.name === "Table") {
        const rows = users.map((u) => ({ login: u.login, html_url: u.html_url }));
        mainPanel.appendTableMessage("Results", rows);
      }
    });
    helperPanel.select.focus();
  } catch {
    mainPanel.updateMessage(sys.id, { status: "error" });
    mainPanel.appendSystemMessage("Failed to fetch users", {
      status: "error",
    });
  }
});

commandPanel.input.focus();

renderer.keyInput.on("keypress", (key) => {
  if (key.name === "escape" || (key.ctrl && key.name === "c")) {
    renderer.destroy();
    process.exit(0);
  }
});

renderer.start();
