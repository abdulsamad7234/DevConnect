# DevConnect – Developer Portfolio Hub

A responsive developer portfolio platform built with **HTML**, **CSS**, and **vanilla JavaScript**. DevConnect lets anyone enter a GitHub username and instantly generate a polished portfolio page with live profile data, repositories, detected tech stack, and social links — all powered by the **GitHub REST API**.

![DevConnect Preview](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![GitHub API](https://img.shields.io/badge/GitHub%20REST%20API-181717?style=flat&logo=github&logoColor=white)

## Features

- **GitHub REST API Integration** – Dynamically fetches user profiles and repositories
- **Dark / Light Mode** – Theme toggle with `localStorage` persistence and system preference detection
- **Responsive Design** – Mobile-first layout that scales beautifully to desktop
- **Interactive Navigation** – Scroll spy, smooth scrolling, and mobile hamburger menu
- **Live Project Cards** – Stars, forks, language tags, and descriptions from real repos
- **Auto-detected Skills** – Languages extracted and ranked from repository data
- **Social Links** – GitHub, website, Twitter, and email pulled from profile
- **Performance Optimized** – No frameworks, minimal dependencies, skeleton loading states

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/devconnect.git
   cd devconnect
   ```

2. **Open in browser**
   ```bash
   # Option A: Open index.html directly
   start index.html        # Windows
   open index.html         # macOS
   xdg-open index.html     # Linux

   # Option B: Use a local dev server (recommended)
   npx serve .
   ```

3. **Enter a GitHub username** (e.g. `octocat`, `gaearon`, or your own) and click **Load Profile**.

## Project Structure

```
devconnect/
├── index.html          # Main HTML structure
├── css/
│   └── styles.css      # Mobile-first styles, theming, animations
├── js/
│   ├── main.js         # App entry point & orchestration
│   ├── github-api.js   # GitHub REST API module
│   ├── ui.js           # DOM rendering utilities
│   ├── theme.js        # Dark/light mode toggle
│   └── navigation.js   # Nav menu, scroll spy, header effects
├── .gitignore
└── README.md
```

## GitHub API Usage

DevConnect uses the public [GitHub REST API](https://docs.github.com/en/rest):

| Endpoint | Purpose |
|---|---|
| `GET /users/{username}` | Profile info, avatar, bio, stats |
| `GET /users/{username}/repos` | Public repositories (sorted by last updated) |

**Rate limits:** Unauthenticated requests are limited to **60/hour** per IP. For higher limits, add a personal access token in `js/github-api.js`.

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | Semantic HTML5 |
| Styling | CSS3 (Custom Properties, Grid, Flexbox) |
| Logic | ES6+ JavaScript (Modules) |
| Data | GitHub REST API v3 |
| Fonts | Inter, JetBrains Mono (Google Fonts) |

## License

MIT License – feel free to use this project for learning, portfolios, or as a template.
