<div align="center">

<br/>

```
██████╗ ██╗  ██╗ █████╗ ███╗   ██╗████████╗ ██████╗ ███╗   ███╗██╗  ██╗
██╔══██╗██║  ██║██╔══██╗████╗  ██║╚══██╔══╝██╔═══██╗████╗ ████║╚██╗██╔╝
██████╔╝███████║███████║██╔██╗ ██║   ██║   ██║   ██║██╔████╔██║ ╚███╔╝
██╔═══╝ ██╔══██║██╔══██║██║╚██╗██║   ██║   ██║   ██║██║╚██╔╝██║ ██╔██╗
██║     ██║  ██║██║  ██║██║ ╚████║   ██║   ╚██████╔╝██║ ╚═╝ ██║██╔╝ ██╗
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝    ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝
```

### 🎬 Next-Gen Streaming Experience — by [Ansh](https://github.com/ansh44233)

<br/>

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org)
[![Electron](https://img.shields.io/badge/Electron-19.x-47848F?style=for-the-badge&logo=electron&logoColor=white)](https://electronjs.org)
[![License](https://img.shields.io/badge/License-MIT-8b5cf6?style=for-the-badge)](LICENSE)
[![Stars](https://img.shields.io/github/stars/ansh44233/PhantomX?style=for-the-badge&color=06b6d4)](https://github.com/ansh44233/PhantomX/stargazers)
[![Forks](https://img.shields.io/github/forks/ansh44233/PhantomX?style=for-the-badge&color=8b5cf6)](https://github.com/ansh44233/PhantomX/network/members)

<br/>

> Stream movies, shows, and anime. No ads. No fluff. Just vibes.

<br/>

[🚀 Live Demo](https://phantomx.vercel.app) · [🐛 Report Bug](https://github.com/ansh44233/PhantomX/issues) · [✨ Request Feature](https://github.com/ansh44233/PhantomX/issues)

</div>

---

## 🌟 Features

- 🎬 **Trending Content** — Movies, TV shows & anime updated daily via TMDB
- 🔍 **Smart Search** — Real-time search with instant results
- 🎵 **Built-in Music Player** — Dedicated music browsing section
- 📱 **Fully Responsive** — Looks clean on mobile, tablet & desktop
- 🌙 **Dark / Light Theme** — Toggle anytime, saved to preferences
- 📚 **Personal Library** — Favorites, watch history & continue watching
- 🎮 **Discord Rich Presence** — Flex what you're watching on Discord
- 🖥️ **Native Desktop App** — Powered by Electron for a true app feel
- 🔥 **Hover Trailers** — Cards auto-play YouTube trailers on hover
- 📊 **Genre Filtering** — Filter everything by genre on the homepage
- ⚡ **Glassmorphism UI** — Smooth animations via Framer Motion
- 🛡️ **Ad Blocker** — Built-in content filtering for Electron mode

---

## 📸 Screenshots

<!-- Add screenshots here -->
> Coming soon — feel free to contribute screenshots!

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn
- A free [TMDB API key](https://www.themoviedb.org/settings/api)

### Web App

```bash
git clone https://github.com/ansh44233/PhantomX.git
cd PhantomX
npm install
npm start
```

App runs at `http://localhost:3000`

### Desktop App (Electron)

```bash
npm run electron-dev
```

> Opens the full desktop app with Discord RPC, adblocker, and native window controls.

---

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| **UI Framework** | React 18 |
| **Styling** | Styled Components + Tailwind utilities |
| **Animations** | Framer Motion |
| **Routing** | React Router v6 |
| **Desktop** | Electron 19 |
| **Data** | TMDB API |
| **Discord** | discord-rpc |
| **Icons** | react-icons (Feather) |

---

## 📁 Project Structure

<details>
<summary>Click to expand</summary>

```
PhantomX/
├── public/
│   ├── electron.js          # Electron main process
│   ├── preload.js           # Electron preload script
│   └── index.html
├── src/
│   ├── components/
│   │   ├── HeroSection/     # Hero banner with trailer autoplay
│   │   ├── ContentCard/     # Movie/show cards with hover trailers
│   │   ├── ContentRow/      # Horizontal scrollable content rows
│   │   ├── Sidebar/         # Collapsible icon sidebar
│   │   ├── Navbar/          # Top navigation bar
│   │   ├── MobileHeader/    # Mobile top header
│   │   └── MobileNavigation/# Bottom nav for mobile
│   ├── pages/
│   │   ├── Home/            # Main homepage
│   │   ├── Search/          # Search page
│   │   ├── MovieDetails/    # Movie/TV detail page
│   │   ├── Player/          # Video player
│   │   ├── Music/           # Music section
│   │   ├── Library/         # Saved content
│   │   ├── Favorites/       # Favorited items
│   │   └── History/         # Watch history
│   ├── services/
│   │   ├── tmdbApi.js       # TMDB API calls
│   │   ├── discordRPC.js    # Discord Rich Presence
│   │   ├── localStorage.js  # Local persistence
│   │   └── trailerService.js
│   └── styles/
│       ├── GlobalStyle.js   # CSS variables & global styles
│       └── theme.js         # Theme object
└── package.json
```

</details>

---

## 🎨 Customization

### Change Accent Color

Edit `src/styles/GlobalStyle.js`:

```css
--accent-color: #8b5cf6;       /* primary purple */
--accent-secondary: #06b6d4;   /* cyan accent */
```

### Change Font

```css
--font-family: 'Your Font', sans-serif;
```

Add the font import to `public/index.html`.

---

## ⚙️ Environment Setup

Create a `.env` file in root (if the app requires API keys configured in services):

```env
REACT_APP_TMDB_API_KEY=your_tmdb_api_key_here
```

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

1. Fork the repo
2. Create your branch: `git checkout -b feature/something-cool`
3. Commit changes: `git commit -m 'add something cool'`
4. Push: `git push origin feature/something-cool`
5. Open a PR

---

## 📜 License

MIT License — Copyright © 2024 Ansh

Feel free to use, modify, and distribute. Just don't be weird about it.

---

<div align="center">

Built with 💜 by **[Ansh](https://github.com/ansh44233)**

⭐ Star the repo if you found it useful!

</div>
