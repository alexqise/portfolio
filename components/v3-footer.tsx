"use client";

import { ThemeToggle } from "./theme-toggle";
import { useVersion } from "./version-context";

type VersionOption = { label: "v1" | "v2" | "v3"; enabled: true };

const versions: VersionOption[] = [
  { label: "v1", enabled: true },
  { label: "v2", enabled: true },
  { label: "v3", enabled: true },
];

export function V3Footer() {
  const { version, setVersion } = useVersion();

  return (
    <div className="fixed bottom-5 left-5 z-50 flex items-center gap-3">
      <div className="flex items-center gap-1">
        {versions.map((v) => {
          const isActive = v.label === version;
          return (
            <button
              key={v.label}
              onClick={() => setVersion(v.label)}
              className={`px-2 py-1 rounded text-xs transition-colors ${
                isActive
                  ? "bg-foreground text-background"
                  : "border border-border hover:border-foreground/30 cursor-pointer"
              }`}
            >
              {v.label}
            </button>
          );
        })}
      </div>
      <ThemeToggle />
    </div>
  );
}
