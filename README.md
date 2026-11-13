<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&height=220&color=0:080B18,45:312E81,100:06B6D4&text=PHANTOMX&fontSize=78&fontColor=FFFFFF&fontAlignY=38&desc=Your%20next%20screen%20starts%20here.&descAlignY=60&descSize=18" width="100%" alt="PhantomX banner" />

<p>
<a href="https://github.com/ansh44233/PhantomX/stargazers"><img src="https://img.shields.io/github/stars/ansh44233/PhantomX?style=for-the-badge&logo=github&color=7c3aed" alt="Stars" /></a>
<a href="https://github.com/ansh44233/PhantomX/network/members"><img src="https://img.shields.io/github/forks/ansh44233/PhantomX?style=for-the-badge&logo=git&color=0891b2" alt="Forks" /></a>
<a href="https://github.com/ansh44233/PhantomX/issues"><img src="https://img.shields.io/github/issues/ansh44233/PhantomX?style=for-the-badge&color=ea580c" alt="Issues" /></a>
<a href="https://github.com/ansh44233/PhantomX/commits/main"><img src="https://img.shields.io/github/last-commit/ansh44233/PhantomX?style=for-the-badge&color=0f766e" alt="Last commit" /></a>
</p>

### Movies. Series. Anime. One immersive place.

[Explore the code](https://github.com/ansh44233/PhantomX) · [Report a bug](https://github.com/ansh44233/PhantomX/issues/new) · [Request a feature](https://github.com/ansh44233/PhantomX/issues/new)

</div>

---

## ✦ What is PhantomX?

**PhantomX** is a dark, cinematic entertainment discovery application built with React, with an optional Electron desktop experience. Browse movies and TV, explore title information, search for something new, and keep track of titles you want to revisit.

The project has two ways to run:

- **Web app:** the React interface, suitable for local development and static hosting such as Vercel.
- **Desktop app:** an Electron wrapper for supported desktop-only integrations.

> **Development status:** PhantomX is a work in progress. Features and third-party providers can vary by platform. A successful Vercel deployment, playback availability, or production readiness should be verified independently.

## ✦ At a glance

| Experience | What it offers |
|---|---|
| Discover | Browse movie and TV collections |
| Search | Find titles through supported TMDB categories |
| Explore | View available title details, genres and cast information |
| Your library | Personal favorites, saved titles and watch-related views |
| Playback choices | Choose from configured external embed providers |
| Music area | Access the app's music section |
| Desktop shell | Run the interface inside Electron |

**A note on playback:** PhantomX does not host or distribute movies, shows, or streams. Playback integrations rely on external providers. Their availability, legality, quality, regional access and uptime are outside this project's control. Use services and content you are authorized to access.

## ✦ Interface preview

Screenshots will be added after capturing the current running application. This repository does not currently provide verified product screenshots, so no mockup is presented as a real app capture.

## ✦ Built with

- React 18 and React Router
- Styled Components and Framer Motion
- TMDB API for supported movie and TV metadata
- Electron for the optional desktop shell
- React Icons and Lucide React
- Create React App / react-scripts

## 🚀 Run it locally

### Requirements

- Node.js **26.x** (as configured in package.json)
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/ansh44233/PhantomX.git
cd PhantomX
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the web app

```bash
npm start
```

Open http://localhost:3000.

### 4. Create a production build

```bash
npm run build
```

The generated static site is written to build/.

### Optional: launch the Electron app

```bash
npm run electron-dev
```

This runs the React development server and opens the Electron shell. Desktop integrations are not available in the Vercel-hosted website.

## ☁️ Deploy to Vercel

PhantomX's web frontend is built with Create React App. Import this repository into Vercel and deploy the repository root.

| Vercel setting | Value |
|---|---|
| Framework preset | Create React App |
| Root directory | ./ |
| Node.js version | **26.x** |
| Install command | npm install |
| Build command | npm run build |
| Output directory | build |

The repository's vercel.json may provide project-specific overrides. If Vercel reports a build failure, use the **first meaningful error** in Build Logs rather than relying only on the final summary line.

### After deployment

- Open the deployed homepage.
- Test search and a title details page.
- Refresh a nested route directly.
- Check browser DevTools for failed API requests.
- Remember that Electron-only features do not run on Vercel.

## 🧭 Project layout

```text
PhantomX/
├── public/
│   ├── electron.js
│   ├── electron-no-discord.js
│   ├── preload.js
│   └── index.html
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # App screens
│   ├── services/         # API, provider and storage logic
│   ├── styles/           # Global styles and theme
│   ├── App.js
│   └── index.js
├── package.json
├── package-lock.json
└── vercel.json
```

## 🔐 Configuration & privacy notes

- Movie and TV metadata is requested from TMDB.
- A key embedded in frontend code is visible to anyone who loads the website. Do not treat browser-delivered keys as private secrets; review applicable usage restrictions and rotate credentials if necessary.
- Browser-based saved data is stored in that visitor's browser unless a server-side sync feature is explicitly implemented.
- External providers may collect data or apply their own terms and privacy policies. Review those services independently.

## 🛠 Troubleshooting

<details>
<summary><strong>Vercel says the Node.js version is unsupported</strong></summary>

Confirm the project's Node.js setting is **26.x** and that the latest commit containing the updated engines field is deployed. Then trigger a fresh deployment. Check the deployment's Build Logs if the message persists.

</details>

<details>
<summary><strong>Build fails on Vercel</strong></summary>

Confirm the Root Directory is ./, the output directory is build, and the deployment is using the latest package.json and lockfile. Read the earliest actionable error in Build Logs; dependency, lint and compilation errors need different fixes.

</details>

<details>
<summary><strong>A nested page returns 404 after refresh</strong></summary>

Check the SPA rewrite in vercel.json and confirm the latest deployment includes it. Also verify the route works when navigating from inside the app.

</details>

<details>
<summary><strong>Posters or metadata are missing</strong></summary>

Check the browser network panel and the TMDB response. Network restrictions, API limits, invalid credentials or upstream outages can affect metadata.

</details>

<details>
<summary><strong>A playback provider does not work</strong></summary>

Providers are external and may be unavailable, blocked, unsupported in a region, or incompatible with a browser. Try another configured option where appropriate.

</details>

## 🤝 Contributing

Ideas, bug reports and pull requests are welcome.

1. Fork this repository.
2. Create a branch: feature/your-feature.
3. Make a focused change.
4. Run relevant checks, including npm run build.
5. Open a pull request with a clear summary and test notes.

When reporting a bug, include steps to reproduce, your browser or operating system, and the relevant error output. Never post private credentials or tokens.

## 📈 Star history

<a href="https://star-history.com/#ansh44233/PhantomX&Date">
<img src="https://api.star-history.com/svg?repos=ansh44233/PhantomX&type=Date" alt="PhantomX star history chart" width="100%" />
</a>

## 📄 License

No LICENSE file is currently present in this repository. Until a license is added, do not assume the code is licensed for unrestricted reuse or redistribution.

---

<div align="center">

**Made by [Ansh](https://github.com/ansh44233)**

If PhantomX interests you, consider leaving a ⭐ on the repository.

[Back to top](#phantomx)

</div>
