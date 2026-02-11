import { NextResponse } from "next/server";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const TOP_TRACKS_URL =
  "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5";

async function getAccessToken(): Promise<string> {
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
    "base64"
  );

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN!,
    }),
  });

  if (!response.ok) {
    throw new Error(`Token refresh failed: ${response.status}`);
  }

  const data = await response.json();
  return data.access_token;
}

export async function GET() {
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    return NextResponse.json(
      { error: "Spotify credentials not configured" },
      { status: 500 }
    );
  }

  try {
    const accessToken = await getAccessToken();

    const response = await fetch(TOP_TRACKS_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
      next: { revalidate: 3600 }, // 1 hour cache
    });

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.status}`);
    }

    const data = await response.json();

    const tracks = data.items.map(
      (track: {
        name: string;
        artists: { name: string }[];
        album: { name: string; images: { url: string }[] };
        external_urls: { spotify: string };
      }) => ({
        name: track.name,
        artist: track.artists.map((a: { name: string }) => a.name).join(", "),
        album: track.album.name,
        image: track.album.images[1]?.url || track.album.images[0]?.url,
        url: track.external_urls.spotify,
      })
    );

    return NextResponse.json({ tracks });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch Spotify data" },
      { status: 500 }
    );
  }
}
