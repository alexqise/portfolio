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

export function Projects() {
  return (
    <section className="space-y-6">
      <h2 className="text-xs tracking-widest uppercase text-muted">
        experience
      </h2>

      <div className="space-y-4 text-sm leading-relaxed">
        <p className="text-muted">
          previously interned at{" "}
          <Link href="https://www.capitalone.com">capital one</Link>
          . won{" "}
          <Link href="https://www.linkedin.com/posts/alqi_mbzuai-activity-7426988620823166976-MONC?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEaLYWQBI-ciWkDxna1rVbzeAcWbXR8a8JM">columbia&apos;s largest hackathon</Link>.
        </p>

        <p className="text-muted">some things i&apos;ve built:</p>

        <ul className="space-y-3 text-muted">
          <li className="flex gap-3">
            <span className="text-foreground shrink-0">~</span>
            <span>
              <Link href="https://devpost.com/software/opticon">opticon</Link> — multi-agent orchestration with
              cloud vms, each agent gets its own computer
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-foreground shrink-0">~</span>
            <span>
              <Link href="https://drafted.college">drafted</Link> — agentic draft editor for college
              essays, context on your extracurriculars and writing style
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-foreground shrink-0">~</span>
            <span>
              <Link href="https://playtypr.com">typr</Link> — real-time competitive typeracing,
              monkeytype but multiplayer
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}
