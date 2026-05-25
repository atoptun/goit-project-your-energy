# YourEnergy

YourEnergy is a fitness exercise catalog built with Vite and TypeScript. The app
lets users browse exercises by category, filter content by muscles, body parts,
and equipment, view detailed exercise information in a modal, and save favorite
exercises for later review.

## Features

- Exercise catalog with category-based browsing
- Filters by muscles, body parts, and equipment
- Exercise details modal with rating flow
- Favorites page for saved exercises
- Random motivational quote block
- Responsive header, footer, and mobile menu

## Tech Stack

- Vite
- TypeScript
- Axios
- iziToast

## Getting Started

### Prerequisites

- Node.js 24+
- npm

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Available Pages

- Main page: exercise catalog and filters
- Favorites page: saved exercises management

## Project Structure

- src/index.html and src/main.ts - main application entry
- src/favorites.html and src/favorites.ts - favorites page entry
- src/js/ - application logic, services, and UI modules
- src/css/ - global and feature-specific styles
- src/partials/ - HTML partials used by Vite HTML injection

## Deployment

The production build is configured for GitHub Pages and uses the
/goit-advancedjs-fp-03/ base path.

[Tech Specs](https://docs.google.com/spreadsheets/d/1I-cnXqfg4xXXcNOycpQY5HAk-SHKYHocjK89CzNgnhA/edit?gid=0#gid=0)

[Figma design](https://www.figma.com/design/zKPKZDAKSveZXmG9506rDs/YourEnergy--Copy-?node-id=87-4849&t=Bd6HS03ahkNE6glH-0)

[API docs](https://your-energy.b.goit.study/api-docs)
