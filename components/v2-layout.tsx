"use client";

import Image from "next/image";
import { AsciiBanana } from "./ascii-banana";
import { GitHubGrid } from "./github-grid";
import { SpotifyGrid } from "./spotify-grid";
import { Footer } from "./footer";

const Link = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-foreground underline decoration-muted underline-offset-4 transition-colors hover:decoration-foreground"
  >
    {children}
  </a>
);

const SocialIcon = ({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-foreground hover:opacity-70 transition-opacity"
    aria-label={label}
  >
    {children}
  </a>
);

export function V2Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <AsciiBanana />
      <main className="flex-1 mx-auto w-full max-w-5xl px-8 sm:px-16 lg:px-24 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_4fr] gap-5 lg:gap-7">
          {/* ── Left column ── */}
          <div className="space-y-4 min-w-0">
            <div className="space-y-4">
              <div className="relative w-full aspect-square overflow-hidden">
                <Image
                  src="/curious-george.png"
                  alt="Alex Qi"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                Alex Qi
              </h1>
              <p className="text-sm text-muted">
                i like building things that think for themselves.
              </p>
            </div>

            {/* Spotify */}
            <SpotifyGrid vertical />
          </div>

          {/* ── Right column ── */}
          <div className="space-y-6 min-w-0">
            {/* Social icons */}
            <div className="flex items-center gap-4">
              <SocialIcon href="https://x.com/alex_qise" label="Twitter / X">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="mailto:alexqi321@gmail.com" label="Email">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </SocialIcon>
              <SocialIcon href="https://github.com/alexqise" label="GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="https://linkedin.com/in/alqi" label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </SocialIcon>
            </div>

            {/* About */}
            <p className="text-sm leading-relaxed text-foreground">
              cs @{" "}
              <Link href="https://columbia.edu">columbia</Link>.
              incoming @{" "}
              <Link href="https://glean.com">glean</Link>.
            </p>

            {/* Intro text */}
            <p className="text-sm leading-relaxed text-muted">
              previous swe intern at{" "}
              <Link href="https://www.capitalone.com">capital one</Link>. won{" "}
              <Link href="https://www.linkedin.com/posts/alqi_mbzuai-activity-7426988620823166976-MONC?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEaLYWQBI-ciWkDxna1rVbzeAcWbXR8a8JM">columbia&apos;s largest hackathon</Link>.
              {" "}interested in agents and ai orchestration.
            </p>

            {/* Projects */}
            <div className="space-y-3">
              <p className="text-sm text-muted">
                some things i&apos;ve built:
              </p>
              <ul className="space-y-2 text-sm text-muted">
                <li>
                  <span className="text-foreground">~ </span>
                  <Link href="https://devpost.com/software/opticon">opticon</Link> — multi-agent orchestration with
                  cloud vms, each agent gets its own computer
                </li>
                <li>
                  <span className="text-foreground">~ </span>
                  <Link href="https://drafted.college">drafted</Link> — agentic draft editor for
                  college essays, context on your extracurriculars and writing
                  style
                </li>
                <li>
                  <span className="text-foreground">~ </span>
                  <Link href="https://playtypr.com">typr</Link> — real-time competitive
                  typeracing, monkeytype but multiplayer
                </li>
              </ul>
            </div>

            {/* GitHub contributions */}
            <GitHubGrid />

            {/* Elo */}
            <div className="space-y-2 text-sm">
              <p className="text-xs tracking-widest text-muted">
                my finest achievements:
              </p>
              <ul className="space-y-1 text-muted">
                <li>
                  <span className="text-foreground">masters</span> league of
                  legends
                </li>
                <li>
                  <span className="text-foreground">ultimate champion </span>  
                  clash royale
                </li>
                <li>
                  <span className="text-foreground">1st of 600</span> columbia
                  poker tournament 2025
                </li>
                <li>
                  <span className="text-foreground">1st of 200</span>{" "}
                  <Link href="https://sig.com">SIG</Link>{" "}
                  &quot;the showdown&quot; qualifier
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <div className="mx-auto w-full max-w-5xl px-8 sm:px-16 lg:px-24">
        <Footer />
      </div>
    </div>
  );
}
