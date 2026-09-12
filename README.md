# Yogender Singh — Portfolio

A production-ready, single-page portfolio for Yogender Singh, AI/ML & Software Engineer. Built with React 19, TanStack Start, Tailwind CSS v4, Motion, Three.js, React Three Fiber, and Drei.

## Install

Requirements: Node.js 20+ and Bun 1.2+.

```bash
git clone <repository-url>
cd <repository-name>
bun install
```

## Run locally

```bash
bun run dev
```

Open `http://localhost:3000` or the URL printed in the terminal.

## Production build

```bash
bun run build
```

Preview the production output with:

```bash
bun run preview
```

## Deploy to GitHub Pages

This project includes `.github/workflows/deploy-pages.yml`. In GitHub:

1. Open **Settings → Pages**.
2. Set **Source** to **GitHub Actions**.
3. Push to the `main` branch.
4. The workflow builds and deploys the static site automatically.

For a project repository such as `username.github.io/portfolio`, set the repository variable `VITE_BASE_PATH` to `/portfolio/`. For a user site such as `username.github.io`, leave it as `/`.

The portfolio uses one page with section anchors, so refreshes never depend on client-side subroutes.

## Export or create a ZIP

From the directory above the project:

```bash
zip -r yogender-singh-portfolio.zip <repository-name> -x "*/node_modules/*" "*/.git/*" "*/dist/*"
```

The ZIP contains the complete editable source. Run `bun install` after extracting it.

## Replace the résumé

Place the final PDF at:

```text
public/Yogender-Singh-Resume.pdf
```

Keep that exact filename so every résumé link continues to work.

## Replace project visuals

Project visuals are custom responsive interface compositions in `src/components/portfolio/ProjectVisuals.tsx`. Update a project’s matching visual component there. If replacing one with an image, place the optimized WebP/AVIF asset in `public/assets/`, add meaningful alt text, set width and height, and use `loading="lazy"`.

## Profile links

LinkedIn and GitHub are configured in `src/components/portfolio/Portfolio.tsx`. Update either constant there if a profile URL changes.

## Quality and accessibility

The site includes keyboard-accessible project dialogs, semantic sections, visible focus states, reduced-motion handling, responsive layouts, a touch-safe mobile menu, and a CSS fallback while 3D loads.
