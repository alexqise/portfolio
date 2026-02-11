export function About() {
  return (
    <section className="space-y-4">
      <p className="text-sm leading-relaxed text-foreground">
        cs @ columbia. incoming @{" "}
        <a
          href="https://glean.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline decoration-muted underline-offset-4 transition-colors hover:decoration-foreground"
        >
          glean
        </a>
        .
      </p>
      <p className="text-sm leading-relaxed text-muted">
        super interested in agents and ai orchestration. i like building things
        that think for themselves.
      </p>
    </section>
  );
}
