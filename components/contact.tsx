const links = [
  { label: "email", href: "mailto:alexqi321@gmail.com", display: "alexqi321@gmail.com" },
  { label: "github", href: "https://github.com/alexqise", display: "alexqise" },
  { label: "linkedin", href: "https://linkedin.com/in/alqi", display: "alqi" },
  { label: "twitter", href: "https://x.com/alex_qise", display: "@alex_qise" },
];

export function Contact() {
  return (
    <section className="space-y-6">
      <h2 className="text-xs tracking-widest uppercase text-muted">
        get in touch
      </h2>

      <ul className="space-y-2 text-sm">
        {links.map((link) => (
          <li key={link.label} className="flex items-baseline gap-3">
            <span className="text-muted shrink-0 w-16">{link.label}</span>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline decoration-muted underline-offset-4 transition-colors hover:decoration-foreground"
            >
              {link.display}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
