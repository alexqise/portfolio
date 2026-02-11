export function AsciiHero() {
  const art = `
 █████╗ ██╗     ███████╗██╗  ██╗     ██████╗ ██╗
██╔══██╗██║     ██╔════╝╚██╗██╔╝    ██╔═══██╗██║
███████║██║     █████╗   ╚███╔╝     ██║   ██║██║
██╔══██║██║     ██╔══╝   ██╔██╗     ██║▄▄ ██║██║
██║  ██║███████╗███████╗██╔╝ ██╗    ╚██████╔╝██║
╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝     ╚══▀▀═╝ ╚═╝`.trimStart();

  return (
    <div className="w-full overflow-hidden py-8 sm:py-16">
      <pre
        className="text-foreground leading-tight select-none text-[0.45rem] sm:text-[0.65rem] md:text-xs"
        aria-label="Alex Qi"
      >
        {art}
      </pre>
    </div>
  );
}
