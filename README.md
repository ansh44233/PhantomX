<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:09090b,50:312e81,100:0891b2&height=210&section=header&text=PhantomX&fontSize=76&fontColor=ffffff&fontAlignY=38&desc=A%20cinematic%20movie%20%26%20series%20discovery%20experience&descAlignY=60&descSize=16" width="100%" alt="PhantomX banner" />

<p>
  <a href="https://github.com/ansh44233/PhantomX/stargazers"><img src="https://img.shields.io/github/stars/ansh44233/PhantomX?style=for-the-badge&color=8b5cf6&label=STARS" alt="GitHub stars" /></a>
  <a href="https://github.com/ansh44233/PhantomX/network/members"><img src="https://img.shields.io/github/forks/ansh44233/PhantomX?style=for-the-badge&color=0891b2&label=FORKS" alt="GitHub forks" /></a>
  <a href="https://github.com/ansh44233/PhantomX/issues"><img src="https://img.shields.io/github/issues/ansh44233/PhantomX?style=for-the-badge&color=7c3aed" alt="Open issues" /></a>
  <a href="https://github.com/ansh44233/PhantomX/commits/main"><img src="https://img.shields.io/github/last-commit/ansh44233/PhantomX?style=for-the-badge&color=0e7490" alt="Last commit" /></a>
</p>

**Discover movies, TV shows and anime in one dark, cinematic interface.**

[Repository](https://github.com/ansh44233/PhantomX) · [Report an issue](https://github.com/ansh44233/PhantomX/issues) · [Request a feature](https://github.com/ansh44233/PhantomX/issues)

</div>

---

## Overview

**PhantomX** is a React-based entertainment discovery interface with an optional Electron desktop shell. It brings movie, TV and anime discovery, search, title details, personal lists and playback-provider selection into one responsive application.

The web build is designed for static hosting (including Vercel). Electron-specific capabilities are available only when the desktop app is running.

> **Project status:** Under active development. The repository contains the application source and deployment configuration; a successful production deployment and every feature/provider are not implied by this README.

## Highlights

| Area | Included experience |
|---|---|
| Discover | Trending, popular and top-rated movie and TV listings |
| Search | Search across supported TMDB media categories |
| Explore | Title details, genres, cast and related information where provided by TMDB |
| Personal library | Favorites, watch history, saved items and continue-watching views |
| Playback | Select from configured third-party embed providers when available |
| Music | Dedicated music section in the application |
| Personalization | Theme preferences and responsive layouts |
| Desktop | Electron window, with desktop-only integrations such as Discord Rich Presence and ad-blocking components |

**Provider availability note:** Playback embeds are supplied by external services. Their uptime, catalog, regional availability, content rights and browser compatibility are outside PhantomX\’s control. A provider appearing in the app does not mean its content is hosted by this project.

## Preview

The repository currently does not include verified, up-to-date product screenshots. The best preview is the running application after following the setup steps below.

## Tech stack

- **Frontend:** React 18
- **Styling:** Styled Components
- **Motion:** Framer Motion
- **Routing:** React Router
- **Metadata:** The Movie Database (TMDB) API
- **Desktop wrapper:** Electron
- **Icons:** React Icons and Lucide React
- **Build system:** Create React App (react-scripts)

## Run locally

### Requirements

- Node.js 20.x
- npm (bundled with Node.js)
- Git

### Install and start the web app

```bash
git clone https://github.com/ansh44233/PhantomX.git
cd PhantomX
npm ci
npm start
```

Open [http://localhost:3000](http://localhost:3000).

### Build for production

```bash
npm run build
```

The production-ready static files are generated in the `build/` directory.

### Run the Electron desktop app

```bash
npm run electron-dev
```

This starts the React development server and opens the Electron desktop shell. Some integrations require their own desktop environment and may not work in a normal browser or hosted Vercel deployment.

## Deploy to Vercel

PhantomX uses Create React App, so deploy the repository root as a static frontend.

The included `vercel.json` provides the deployment settings. If configuring the project manually in Vercel, use:

| Setting | Value |
|---|---|
| Framework preset | Create React App |
| Root directory | `./` |
| Install command | `npm ci --ignore-scripts` |
| Build command | `CI=false PUBLIC_URL=/ npm run build` |
| Output directory | `build` |
| Node.js version | `20.x` |

### Deployment checklist

1. Import `ansh44233/PhantomX` into Vercel.
2. Select the `main` branch.
3. Confirm the settings above (or allow Vercel to read `vercel.json`).
4. Start a deployment and open its **Build Logs** if it fails.
5. After deployment, test the home page, a detail page, search and a refresh on a nested route.

**Important:** Vercel hosts the React web frontend only. It does not run the Electron desktop shell, Discord Rich Presence, or desktop ad-blocking integrations.

## Configuration and data

- PhantomX uses TMDB for movie and TV metadata and artwork.
- The TMDB API key currently resides in the frontend source. Anything shipped to a browser can be inspected by visitors; do not put private credentials or secrets in frontend code. Review the key\’s usage restrictions in your TMDB account.
- Browser storage is local to the visitor\’s browser. It is not automatically synchronized between devices.
- External playback providers may fail independently of the PhantomX interface.

## Project structure

```text
PhantomX/
├── public/
│   ├── electron.js
│   ├── electron-no-discord.js
│   ├── preload.js
│   └── index.html
├── src/
│   ├── components/       # Shared interface components
│   ├── pages/            # Home, search, details, player, library, etc.
│   ├── services/         # TMDB, playback providers, storage, Discord
│   ├── styles/           # Global styles and theme
│   ├── App.js
│   └── index.js
├── package.json
├── package-lock.json
└── vercel.json
```

## Troubleshooting

<details>
<summary><strong>Vercel build fails</strong></summary>

- Check that the project is using Node.js 20.x.
- Confirm the root directory is the repository root.
- Confirm the output directory is `build`, not `dist`.
- Read the first actual error in the Vercel Build Logs; the last line is often only a summary.
- If dependency installation fails, check whether `package.json` and `package-lock.json` are in sync.

</details>

<details>
<summary><strong>Page works locally but a refresh on Vercel returns 404</strong></summary>

The Vercel rewrite in `vercel.json` sends application routes to `index.html`. Confirm that the latest deployment includes this file and that the project is deploying from the repository root.

</details>

<details>
<summary><strong>Movies or images do not load</strong></summary>

Check your network connection and TMDB API response. External API rate limits, key restrictions or service outages can affect metadata independently of the app.

</details>

<details>
<summary><strong>Playback does not start</strong></summary>

Playback is provided by external embed services. Try another configured provider and check whether that provider supports the title, region and browser. PhantomX does not control third-party availability.

</details>

## Contributing

Contributions, bug reports and focused improvements are welcome.

1. Fork the repository.
2. Create a branch: `git checkout -b feature/your-change`.
3. Make and test your change.
4. Commit with a clear message.
5. Push your branch and open a pull request.

For bugs, include the browser/OS, steps to reproduce and the relevant console or deployment log. Never include API secrets or personal credentials in an issue.

## License

No license file is currently included in this repository. Until a license is added, the project should not be assumed to be available for unrestricted reuse, redistribution or commercial use.

---

<div align="center">

**Built by [Ansh](https://github.com/ansh44233)**

<a href="https://github.com/ansh44233/PhantomX">Explore PhantomX on GitHub</a>

</div>
