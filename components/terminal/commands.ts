export interface CommandResult {
  output: string[];
  action?: "clear" | "open-url" | "set-theme" | "set-version";
  url?: string;
  theme?: "dark" | "light";
  version?: "v1" | "v2";
}

const HELP_TEXT = [
  "",
  "  commands:",
  "",
  "  about: who i am",
  "  projects: things i've built",
  "  resume: open my resume",
  "  contact: how to reach me",
  "  dark: switch to dark mode",
  "  light: switch to light mode",
  "  git switch <version>: switch layout (v1, v2, ...)",
  "  clear: clear the terminal",
  "  help: show this message",
  "",
];

const ABOUT_TEXT = [
  "",
  "  cs @ columbia. incoming @ glean.",
  "  building agents and ai orchestration systems.",
  "",
  "  super interested in agents and systems that",
  "  think for themselves.",
  "",
];

const PROJECTS_TEXT = [
  "",
  "  things i've built:",
  "",
  "  ~ opticon",
  "    multi-agent orchestration with cloud vms",
  "    each agent gets its own computer",
  "",
  "  ~ drafted",
  "    agentic draft editor for college essays",
  "    context on your extracurriculars and writing style",
  "",
  "  ~ typr",
  "    real-time competitive typeracing",
  "    monkeytype but multiplayer",
  "",
];

const CONTACT_TEXT = [
  "",
  "  get in touch:",
  "",
  "  email      alexqi321@gmail.com",
  "  github     github.com/alexqise",
  "  linkedin   linkedin.com/in/alqi",
  "  twitter    x.com/alex_qise",
  "",
];

export const WELCOME_TEXT = [
  "  ╭─────────────────────────────╮",
  "  │                             │",
  "  │   welcome to alexqi.dev     │",
  "  │   type 'help' to begin      │",
  "  │                             │",
  "  ╰─────────────────────────────╯",
  "",
];

export function executeCommand(input: string): CommandResult {
  const cmd = input.trim().toLowerCase();

  switch (cmd) {
    case "help":
      return { output: HELP_TEXT };
    case "about":
      return { output: ABOUT_TEXT };
    case "projects":
      return { output: PROJECTS_TEXT };
    case "contact":
      return { output: CONTACT_TEXT };
    case "resume":
      return {
        output: ["", "  opening resume...", ""],
        action: "open-url",
        url: "/resume.pdf",
      };
    case "dark":
      return {
        output: ["", "  switched to dark mode.", ""],
        action: "set-theme",
        theme: "dark",
      };
    case "light":
      return {
        output: ["", "  switched to light mode.", ""],
        action: "set-theme",
        theme: "light",
      };
    case "git switch v1":
      return {
        output: ["", "  switched to branch 'v1'", ""],
        action: "set-version",
        version: "v1",
      };
    case "git switch v2":
      return {
        output: ["", "  switched to branch 'v2'", ""],
        action: "set-version",
        version: "v2",
      };
    case "clear":
      return { output: [], action: "clear" };
    case "":
      return { output: [] };
    default:
      return {
        output: [
          "",
          `  command not found: ${cmd}`,
          "  type 'help' for available commands.",
          "",
        ],
      };
  }
}
