<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,14,20&height=200&section=header&text=PhantomX&fontSize=80&fontAlignY=38&animation=fadeIn&fontColor=ffffff&desc=Next-Gen%20Streaming%20by%20Ansh&descAlignY=58&descSize=20" width="100%" />
</p>

<p align="center">
  <a href="https://github.com/ansh44233/PhantomX/stargazers"><img src="https://img.shields.io/github/stars/ansh44233/PhantomX?style=flat&color=8b5cf6&logo=github" alt="Stars" /></a>
  <a href="https://github.com/ansh44233/PhantomX/network/members"><img src="https://img.shields.io/github/forks/ansh44233/PhantomX?style=flat&color=06b6d4&logo=github" alt="Forks" /></a>
  <a href="https://github.com/ansh44233/PhantomX/issues"><img src="https://img.shields.io/github/issues/ansh44233/PhantomX?style=flat&color=8b5cf6" alt="Issues" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-06b6d4.svg?style=flat" alt="MIT license" /></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.2-61DAFB?style=flat&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Electron-19.x-47848F?style=flat&logo=electron&logoColor=white" alt="Electron" />
  <img src="https://img.shields.io/badge/Framer_Motion-6.x-FF4D4D?style=flat&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/TMDB_API-powered-01B4E4?style=flat&logo=themoviedatabase&logoColor=white" alt="TMDB" />
  <img src="https://img.shields.io/badge/Discord_RPC-integrated-5865F2?style=flat&logo=discord&logoColor=white" alt="Discord" />
</p>

<p align="center">
  <strong>Stream movies, shows & anime. No ads. No fluff. Pure vibes.</strong>
</p>

<p align="center">
  <a href="https://phantomx.vercel.app">🌐 Live Demo</a> ·
  <a href="https://github.com/ansh44233/PhantomX/issues">🐛 Report Bug</a> ·
  <a href="https://github.com/ansh44233/PhantomX/issues">✨ Feature Request</a>
</p>

---

## What is PhantomX?

PhantomX is a streaming platform UI built with React + Electron. Browse trending movies, TV shows and anime, search anything, manage your personal library, and stream — all wrapped in a clean glassmorphism interface with smooth animations.

Built for the desktop. Works in the browser. Looks great everywhere.

---

## Features

| | Feature |
|---|---|
| 🎬 | Trending movies, TV shows & anime via TMDB |
| 🔍 | Real-time search with instant results |
| 🎵 | Built-in music player section |
| 🔥 | Hover-to-play YouTube trailers on cards |
| 📱 | Fully responsive — mobile + tablet + desktop |
| 🌙 | Dark / Light theme toggle, saved to preferences |
| 📚 | Library, favorites, watch history, continue watching |
| 🎮 | Discord Rich Presence — flex what you're watching |
| 🖥️ | Native desktop app via Electron |
| 📊 | Genre filtering across all content |
| ⚡ | Glassmorphism UI with Framer Motion animations |
| 🛡️ | Built-in ad blocker (Electron mode) |

---

## Quick Start

```bash
git clone https://github.com/ansh44233/PhantomX.git
cd PhantomX
npm install
npm start
```

App runs at `http://localhost:3000`

### Desktop App

```bash
npm run electron-dev
```

Launches the full Electron app with Discord RPC, adblocker, and native window controls.

---

## Tech Stack

<details>
<summary><strong>Show full stack</strong></summary>

| Layer | Tech |
|---|---|
| UI Framework | React 18 |
| Styling | Styled Components |
| Animations | Framer Motion |
| Routing | React Router v6 |
| Desktop Shell | Electron 19 |
| Data Source | TMDB API |
| Discord | discord-rpc |
| Icons | react-icons (Feather set) |
| Build | react-scripts (CRA) |

</details>

---

## Project Structure

<details>
<summary><strong>Expand file tree</strong></summary>

```
PhantomX/
├── public/
│   ├── electron.js          # Main process
│   ├── preload.js           # Electron preload
│   └── index.html
├── src/
│   ├── components/
│   │   ├── HeroSection/     # Hero banner + auto trailer
│   │   ├── ContentCard/     # Cards with hover trailers
│   │   ├── ContentRow/      # Horizontal scroll rows
│   │   ├── Sidebar/         # Collapsible icon sidebar
│   │   ├── Navbar/          # Desktop top nav
│   │   ├── MobileHeader/    # Mobile header
│   │   └── MobileNavigation/# Mobile bottom nav
│   ├── pages/
│   │   ├── Home/            # Main feed
│   │   ├── Search/          # Search
│   │   ├── MovieDetails/    # Movie/TV detail view
│   │   ├── Player/          # Video player
│   │   ├── Music/           # Music section
│   │   ├── Library/         # Saved content
│   │   ├── Favorites/       # Favorited items
│   │   └── History/         # Watch history
│   ├── services/
│   │   ├── tmdbApi.js       # TMDB API
│   │   ├── discordRPC.js    # Discord Rich Presence
│   │   ├── localStorage.js  # Local persistence
│   │   └── trailerService.js
│   └── styles/
│       ├── GlobalStyle.js   # CSS variables & global styles
│       └── theme.js
└── package.json
```

</details>

---

## Customization

Change the accent color in `src/styles/GlobalStyle.js`:

```css
--accent-color: #8b5cf6;      /* primary — purple */
--accent-secondary: #06b6d4;  /* secondary — cyan */
```

Change font:
```css
--font-family: 'Your Font', sans-serif;
```

Add font import in `public/index.html`.

---

## Contributing

PRs are welcome.

1. Fork the repo
2. Create your branch: `git checkout -b feature/your-idea`
3. Commit: `git commit -m 'add your idea'`
4. Push: `git push origin feature/your-idea`
5. Open a PR

---

## License

MIT — Copyright © 2024 Ansh

Use it, modify it, ship it.

---

<p align="center">
  Built with 💜 by <a href="https://github.com/ansh44233"><strong>Ansh</strong></a>
  <br /><br />
  <a href="https://github.com/ansh44233/PhantomX/stargazers">⭐ Star it if you dig it</a>
</p>

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,14,20&height=100&section=footer" width="100%" />
</p>
