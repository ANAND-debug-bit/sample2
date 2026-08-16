# Ari Vale — Editorial Developer Portfolio

A typography-led React + Vite portfolio with an editorial studio aesthetic, responsive navigation, scroll reveals, grayscale project artwork, and a restrained burnt-orange accent.

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

## Build for production

```bash
npm run build
npm run preview
```

The production files are generated in `dist/`.

## Deploy to Vercel

1. Create a new GitHub repository.
2. Upload the contents of this folder to the repository root.
3. In Vercel, choose **Add New Project** and import the GitHub repository.
4. Keep the framework as **Vite**.
5. Use `npm run build` as the build command and `dist` as the output directory.
6. Deploy.

The included `vercel.json` already contains these settings and the SPA rewrite.

## Personalize

The portfolio currently uses the sample identity **Ari Vale**. Update the name, bio, email, social URLs, project copy, and copyright year in `src/App.tsx`. Update colors, typography, and responsive behavior in `src/index.css`.