"use client";

import { useVersion } from "@/components/version-context";
import { V1Layout } from "@/components/v1-layout";
import { V2Layout } from "@/components/v2-layout";
import { Terminal } from "@/components/terminal/terminal";

export default function Home() {
  const { version } = useVersion();

  return (
    <>
      {version === "v1" ? <V1Layout /> : <V2Layout />}
      <Terminal />
    </>
  );
}
