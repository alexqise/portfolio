import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "alex qi",
  description:
    "cs @ columbia. incoming @ glean. building agents and ai orchestration systems.",
  openGraph: {
    title: "alex qi",
    description:
      "cs @ columbia. incoming @ glean. building agents and ai orchestration systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jetbrains.variable} font-mono antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
