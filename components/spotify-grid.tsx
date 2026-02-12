"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Track {
  name: string;
  artist: string;
  album: string;
  image: string;
  url: string;
}

export function SpotifyGrid({ vertical = false }: { vertical?: boolean }) {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/spotify")
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((data) => setTracks(data.tracks || []))
      .catch(() => setError(true));
  }, []);

  if (error) {
    return (
      <section className="space-y-6">
        <h2 className="text-xs tracking-widest text-muted">
          top 5 of the month
        </h2>
        <p className="text-sm text-muted">[ spotify not connected ]</p>
      </section>
    );
  }

  if (tracks.length === 0) {
    return (
      <section className="space-y-6">
        <h2 className="text-xs tracking-widest text-muted">
          top 5 of the month
        </h2>
        <div className="grid grid-cols-5 gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="aspect-square rounded bg-surface animate-pulse" />
              <div className="h-3 rounded bg-surface animate-pulse w-3/4" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <h2 className="text-xs tracking-widest text-muted">
        top 5 of the month:
      </h2>

      {vertical ? (
        <div className="space-y-3">
          {tracks.map((track, i) => (
            <a
              key={i}
              href={track.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3"
            >
              <div className="relative w-10 h-10 shrink-0 overflow-hidden rounded">
                <Image
                  src={track.image}
                  alt={track.album}
                  fill
                  sizes="40px"
                  className="object-cover transition-opacity group-hover:opacity-80"
                />
              </div>
              <div className="min-w-0">
                <p className="text-sm leading-tight text-foreground truncate">
                  {track.name}
                </p>
                <p className="text-xs leading-tight text-muted truncate">
                  {track.artist}
                </p>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
          {tracks.map((track, i) => (
            <a
              key={i}
              href={track.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group space-y-2"
            >
              <div className="relative aspect-square overflow-hidden rounded">
                <Image
                  src={track.image}
                  alt={track.album}
                  fill
                  sizes="(max-width: 640px) 33vw, 120px"
                  className="object-cover transition-opacity group-hover:opacity-80"
                />
              </div>
              <div className="space-y-0.5 min-w-0">
                <p className="text-[0.65rem] leading-tight text-foreground truncate">
                  {track.name}
                </p>
                <p className="text-[0.6rem] leading-tight text-muted truncate">
                  {track.artist}
                </p>
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
