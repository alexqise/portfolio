"use client";

import { ThemeToggle } from "./theme-toggle";
import { useVersion } from "./version-context";

type VersionOption = { label: "v1" | "v2" | "v3"; enabled: true };

const versions: VersionOption[] = [
  { label: "v1", enabled: true },
  { label: "v2", enabled: true },
  { label: "v3", enabled: true },
];

export function Footer() {
  const { version, setVersion } = useVersion();

  return (
    <footer className="flex items-center justify-between pt-12 pb-8 text-xs text-muted">
      <div className="flex items-center gap-1">
        {versions.map((v) => {
          const isActive = v.label === version;
          const isEnabled = v.enabled;

          return (
            <button
              key={v.label}
              onClick={() => isEnabled && setVersion(v.label)}
              disabled={!isEnabled}
              className={`px-2 py-1 rounded transition-colors ${
                isActive
                  ? "bg-foreground text-background"
                  : isEnabled
                    ? "border border-border hover:border-foreground/30 cursor-pointer"
                    : "border border-border opacity-40 cursor-not-allowed"
              }`}
            >
              {v.label}
              {!isEnabled && " "}
              {!isEnabled && <span className="text-[0.6rem]">soon</span>}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-4">
        <span>&copy; {new Date().getFullYear()}</span>
        <ThemeToggle />
      </div>
    </footer>
  );
}
