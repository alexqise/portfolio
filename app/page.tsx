import { AsciiHero } from "@/components/ascii-hero";
import { About } from "@/components/about";
import { Projects } from "@/components/projects";
import { Elo } from "@/components/elo";
import { GitHubGrid } from "@/components/github-grid";
import { SpotifyGrid } from "@/components/spotify-grid";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Terminal } from "@/components/terminal/terminal";
import { ScrollReveal } from "@/components/scroll-reveal";

export default function Home() {
  return (
    <>
      <main className="mx-auto max-w-2xl px-6 py-12 sm:py-20">
        <ScrollReveal>
          <AsciiHero />
        </ScrollReveal>

        <div className="space-y-20">
          <ScrollReveal delay={100}>
            <About />
          </ScrollReveal>

          <ScrollReveal delay={50}>
            <Projects />
          </ScrollReveal>

          <ScrollReveal delay={50}>
            <Elo />
          </ScrollReveal>

          <ScrollReveal delay={50}>
            <GitHubGrid />
          </ScrollReveal>

          <ScrollReveal delay={50}>
            <SpotifyGrid />
          </ScrollReveal>

          <ScrollReveal delay={50}>
            <Contact />
          </ScrollReveal>
        </div>

        <Footer />
      </main>

      <Terminal />
    </>
  );
}
