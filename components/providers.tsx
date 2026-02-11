"use client";

import { ThemeProvider } from "next-themes";
import { VersionProvider } from "./version-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <VersionProvider>{children}</VersionProvider>
    </ThemeProvider>
  );
}
