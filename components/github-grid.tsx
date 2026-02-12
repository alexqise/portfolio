"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

interface ContributionDay {
  contributionCount: number;
  date: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface ContributionData {
  totalContributions: number;
  weeks: ContributionWeek[];
}

function getColor(count: number, isDark: boolean): string {
  if (count === 0) return isDark ? "#161616" : "#eaeaea";
  if (count <= 3) return isDark ? "#2a2a2a" : "#c6c6c6";
  if (count <= 6) return isDark ? "#4a4a4a" : "#999";
  if (count <= 9) return isDark ? "#777" : "#666";
  return isDark ? "#b0b0b0" : "#333";
}

export function GitHubGrid() {
  const [data, setData] = useState<ContributionData | null>(null);
  const [error, setError] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    fetch("/api/github")
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then(setData)
      .catch(() => setError(true));
  }, []);

  if (error) {
    return (
      <section className="space-y-6">
        <h2 className="text-xs tracking-widest text-muted">
          contributions
        </h2>
        <p className="text-sm text-muted">[ github data unavailable ]</p>
      </section>
    );
  }

  if (!data) {
    return (
      <section className="space-y-6">
        <h2 className="text-xs tracking-widest text-muted">
          contributions
        </h2>
        <div className="h-[90px] rounded bg-surface animate-pulse" />
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex items-baseline justify-between">
        <h2 className="text-xs tracking-widest text-muted">
          contributions
        </h2>
        <span className="text-xs text-muted">
          {data.totalContributions.toLocaleString()} this year
        </span>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="flex gap-[3px]" style={{ minWidth: "max-content" }}>
          {data.weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.contributionDays.map((day) => (
                <div
                  key={day.date}
                  className="contrib-cell w-[10px] h-[10px] rounded-[2px]"
                  style={{ backgroundColor: getColor(day.contributionCount, isDark) }}
                  title={`${day.contributionCount} contributions on ${day.date}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
