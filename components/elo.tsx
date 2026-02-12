const rankings = [
  { rank: "masters", game: "league of legends" },
  { rank: "ultimate champion", game: "clash" },
  { rank: "1st / 600", game: "columbia poker tournament" },
  { rank: '1st / 200', game: 'sig "the showdown" qualifier' },
];

export function Elo() {
  return (
    <section className="space-y-6">
      <h2 className="text-xs tracking-widest uppercase text-muted">
        competitive
      </h2>

      <ul className="space-y-2 text-sm">
        {rankings.map((r) => (
          <li key={r.game} className="flex items-baseline gap-3">
            <span className="text-foreground shrink-0">{r.rank}</span>
            <span className="text-muted">—</span>
            <span className="text-muted">{r.game}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
