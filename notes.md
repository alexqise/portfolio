# portfolio spec — alexqi.dev

## context

alex qi is building a personal portfolio site from scratch. cs @ columbia, incoming @ glean, interested in agents and ai orchestration. the repo is empty — greenfield next.js project on vercel.

inspiration: jia.build (personality-forward, casual) and vansh.nyc (minimal, centered, clean). landing somewhere in between — lowercase casual-professional tone, monochrome palette, all-monospace typography.

---

## design system

### palette
- **dark mode (default):** background `#0a0a0a`, text `#e5e5e5`, muted `#737373`, border `#262626`
- **light mode:** background `#fafafa`, text `#171717`, muted `#737373`, border `#e5e5e5`
- **no accent color** — pure monochrome. spotify green and github colors are the only color splashes (from embedded content)

### typography
- **all monospace** — JetBrains Mono (primary), system monospace fallback
- heading sizes: hero ascii art (large), section headers `text-lg`, body `text-sm`/`text-base`

### animations (moderate)
- fade-in on page load
- scroll-triggered reveals (intersection observer, staggered)
- smooth theme transition (css transition on background/color)
- typing animation for terminal
- hover states on links and interactive elements (opacity shift)

### layout
- centered single-column, max-width ~640px (like vansh.nyc)
- generous vertical spacing between sections
- responsive — stacks cleanly on mobile

---

## page structure (top to bottom)

### 1. hero — ascii wordmark
- large figlet-style ASCII block letters: "ALEX QI"
- centered, prominent
- subtle fade-in on load

### 2. about
- short paragraph, lowercase casual-professional tone
- "cs @ columbia. incoming @ glean. building agents and ai orchestration systems."
- keep it to 2-3 sentences max

### 3. experience & projects (inline narrative)
- flowing text with inline links, not cards
- example structure:
  > previously interned at [capital one](link) (w/ return offer). won [columbia's largest hackathon](linkedin post link).
  >
  > some things i've built:
  > - [opticon](devpost) — multi-agent orchestration with cloud vms, each agent gets its own computer
  > - [drafted](landing page) — agentic draft editor for college essays, context on your extracurriculars and writing style
  > - [typr](website) — real-time competitive typeracing, monkeytype but multiplayer

### 4. competitive / elo
- minimal text list, understated
- format: `rank — game/event`
  ```
  masters — league of legends
  ultimate champion — clash
  ultimate league — pvz heroes
  1st / 600 — columbia poker tournament
  1st / 200 — sig "the showdown" qualifier
  ```

### 5. github contributions
- custom-styled contribution grid (not green — uses site's monochrome palette)
- fetch data from github api (`alexqise`)
- white/gray squares on dark bg, dark gray squares on light bg
- show last 52 weeks like standard github grid

### 6. spotify — top 5 tracks
- album art grid (5 covers in a row or 2-3 column grid)
- track name + artist below each cover
- data from spotify web api (top tracks, short_term range)
- api route to handle token refresh server-side

### 7. contact — dedicated section
- "get in touch" or similar
- email, github, linkedin, twitter/x
- links styled inline, monochrome

### 8. footer
- version switcher: "v1" label, placeholder/locked indicators for future versions
- theme toggle (sun/moon icon)
- small copyright or just the year

---

## terminal (easter egg)

### trigger
- small button in bottom-right corner of the page (subtle, maybe a `>_` icon)
- clicking opens a vscode-style terminal panel that slides up from the bottom
- takes up ~40% of viewport height, overlays the page

### terminal ui
- dark background (slightly different shade than page), monospace font
- blinking cursor, command prompt like `visitor@alexqi ~ $`
- scrollable output area
- close button (x) in top-right of terminal panel

### commands
| command | behavior |
|---------|----------|
| `help` | lists all available commands |
| `about` | prints about section text |
| `resume` | opens resume pdf in new tab |
| `projects` | lists projects with links |
| `contact` | prints contact info/links |
| `dark` | switches to dark mode |
| `light` | switches to light mode |
| `clear` | clears terminal output |

- unknown commands: "command not found. type 'help' for available commands."
- welcome message on open with ascii art or greeting

---

## version switcher

### v1 (current)
- the design described in this spec
- labeled "v1" in footer

### future versions
- placeholder slots showing "v2", "v3" etc. as locked/coming soon
- architecture: version layouts as separate component trees, switched via context/state
- the switcher itself is a small pill/segmented control in the footer

---

## tech stack

### framework & deployment
- **next.js 14+** (app router)
- **typescript**
- **tailwind css** (with custom theme tokens for dark/light)
- **deployed on vercel**

### key dependencies
- `next` + `react` + `react-dom`
- `tailwindcss` + `@tailwindcss/typography` (if needed)
- `next-themes` (dark/light mode with system detection)
- JetBrains Mono via google fonts or self-hosted

### api routes (next.js route handlers)
1. **`/api/spotify`** — fetches top 5 tracks from spotify web api
   - uses refresh token flow (client credentials stored in env vars)
   - caches response for ~1 hour to avoid rate limits
2. **`/api/github`** — fetches contribution data from github graphql api
   - public data, no auth needed (or use a PAT for higher rate limits)
   - caches response for ~6 hours

### env vars needed
```
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REFRESH_TOKEN=
GITHUB_TOKEN= (optional, for higher rate limits)
```

---

## file structure

```
portfolio/
├── app/
│   ├── layout.tsx          # root layout, fonts, theme provider
│   ├── page.tsx            # main page (all sections)
│   ├── globals.css         # tailwind base + custom styles
│   └── api/
│       ├── spotify/route.ts
│       └── github/route.ts
├── components/
│   ├── ascii-hero.tsx      # figlet ascii wordmark
│   ├── about.tsx           # about section
│   ├── projects.tsx        # experience + projects narrative
│   ├── elo.tsx             # competitive rankings
│   ├── github-grid.tsx     # custom contribution graph
│   ├── spotify-grid.tsx    # album art grid
│   ├── contact.tsx         # contact section
│   ├── footer.tsx          # footer w/ version switcher
│   ├── theme-toggle.tsx    # dark/light toggle
│   ├── terminal/
│   │   ├── terminal.tsx    # main terminal component
│   │   ├── terminal-button.tsx  # trigger button
│   │   └── commands.ts     # command definitions & handlers
│   └── scroll-reveal.tsx   # intersection observer wrapper
├── lib/
│   ├── spotify.ts          # spotify api helpers
│   └── github.ts           # github api helpers
├── public/
│   └── resume.pdf          # resume file
├── .env.local              # api keys (gitignored)
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## implementation order

1. **scaffold** — `create-next-app`, tailwind, fonts, theme provider, dark mode toggle
2. **hero + about + projects + elo + contact + footer** — static sections, layout, typography
3. **github contributions** — api route + custom-styled grid component
4. **spotify widget** — api route + album art grid component
5. **terminal easter egg** — trigger button, overlay panel, command system
6. **version switcher** — footer ui, v1 active + placeholders for future
7. **animations** — scroll reveals, fade-ins, hover states, theme transitions
8. **polish** — responsive testing, meta tags, og image, favicon, final copy

---

## verification

- [ ] dark mode loads by default, toggle switches to light
- [ ] ascii wordmark renders correctly at all viewport sizes
- [ ] all project links open in new tabs
- [ ] github grid fetches and displays contribution data with monochrome palette
- [ ] spotify grid shows 5 album covers with track names (requires env vars)
- [ ] terminal opens from bottom-right button, all commands work
- [ ] unknown terminal commands show error message
- [ ] version switcher shows v1 active, future versions as locked
- [ ] scroll animations trigger on reveal
- [ ] responsive layout works on mobile (375px+)
- [ ] lighthouse performance score > 90
- [ ] `npm run build` succeeds with no errors
