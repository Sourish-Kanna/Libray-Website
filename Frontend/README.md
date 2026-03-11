# Frontend – Library Website

The client-side application for the SIES GST Library Website, built with **React 18** and **Vite**.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Pages & Routes](#pages--routes)
- [State Management](#state-management)
- [Styling](#styling)

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| [React 18](https://react.dev) | UI library |
| [Vite](https://vite.dev) | Build tool & dev server |
| [React Router v6](https://reactrouter.com) | Client-side routing |
| [Zustand](https://zustand-demo.pmnd.rs) | Global state management |
| [Tailwind CSS](https://tailwindcss.com) | Utility-first styling |
| [Axios](https://axios-http.com) | HTTP client for API calls |
| [React Toastify](https://fkhadra.github.io/react-toastify) | Toast notifications |
| [Font Awesome](https://fontawesome.com) | Icon library |
| [Vercel Analytics](https://vercel.com/analytics) | Usage analytics |

---

## Project Structure

```
Frontend/
├── public/               # Static assets
├── src/
│   ├── Pages/            # Page-level components
│   │   ├── AboutUs.jsx
│   │   ├── Books-Donate.jsx
│   │   ├── Books-Suggest.jsx
│   │   ├── ContactUs.jsx
│   │   ├── DatabaseViewer.jsx
│   │   ├── E-Resources.jsx
│   │   ├── Others.jsx
│   │   └── QuickLinks.jsx
│   ├── Store/            # Zustand stores
│   ├── assets/           # Images and other assets
│   ├── css/              # Global CSS
│   ├── utils/            # Utility functions
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── HomePage.jsx
│   ├── Layout.jsx
│   ├── LoginPage.jsx
│   ├── Navigation.jsx
│   ├── NewsComponent.jsx
│   ├── ProtectedRoute.jsx
│   └── main.jsx          # App entry point & router setup
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── postcss.config.js
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 20
- **npm** ≥ 10
- The [backend server](../Backend/README.md) running on port `8000`

### Installation

```bash
# From the repository root
cd Frontend
npm install
npm run dev
```

The dev server starts at **http://localhost:5173**.

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite development server with HMR |
| `npm run build` | Build the application for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across all `.js` and `.jsx` files |

---

## Pages & Routes

| Route | Component | Access |
|-------|-----------|--------|
| `/` or `/home` | `HomePage` | Public |
| `/about` | `AboutUs` | Public |
| `/contactus` | `ContactUs` | Public |
| `/E-Resources` | `E-Resources` | Public |
| `/others` | `Others` | Public |
| `/quicklinks` | `QuickLinks` | Public |
| `/donate-books` | `Books-Donate` | Public |
| `/suggest-books` | `Books-Suggest` | Public |
| `/admin/db-viewer` | `DatabaseViewer` | Protected (admin) |
| `/login` | `LoginPage` | Public |

Protected routes are wrapped by `ProtectedRoute.jsx` which redirects unauthenticated users to the login page.

---

## State Management

Global state is handled with **Zustand** stores located in `src/Store/`. Authentication state (user info, tokens) is persisted and shared across components through these stores.

---

## Styling

The project uses **Tailwind CSS** for utility-based styling, configured in `tailwind.config.js`. Global base styles and CSS resets live in `src/css/index.css`.
