export type ConsoleRole = "user" | "assistant" | "system";

export type ConsoleMessageStatus =
  | "idle"
  | "loading"
  | "success"
  | "error";

export type ConsoleMessage = {
  id: string;
  role: ConsoleRole;
  title?: string;
  content: string;
  status?: ConsoleMessageStatus;
};
