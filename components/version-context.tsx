"use client";

import { createContext, useContext, useState } from "react";

type Version = "v1" | "v2";

const VersionContext = createContext<{
  version: Version;
  setVersion: (v: Version) => void;
}>({ version: "v2", setVersion: () => {} });

export function VersionProvider({ children }: { children: React.ReactNode }) {
  const [version, setVersion] = useState<Version>("v2");
  return (
    <VersionContext.Provider value={{ version, setVersion }}>
      {children}
    </VersionContext.Provider>
  );
}

export function useVersion() {
  return useContext(VersionContext);
}
