import { ThemeToggle } from "./theme-toggle";

const versions = [
  { label: "v1", active: true },
  { label: "v2", active: false },
  { label: "v3", active: false },
];

export function Footer() {
  return (
    <footer className="flex items-center justify-between pt-16 pb-8 text-xs text-muted">
      <div className="flex items-center gap-1">
        {versions.map((v) => (
          <span
            key={v.label}
            className={`px-2 py-1 rounded ${
              v.active
                ? "bg-foreground text-background"
                : "border border-border opacity-40 cursor-not-allowed"
            }`}
          >
            {v.label}
            {!v.active && " "}
            {!v.active && <span className="text-[0.6rem]">soon</span>}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <span>&copy; {new Date().getFullYear()}</span>
        <ThemeToggle />
      </div>
    </footer>
  );
}
