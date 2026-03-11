# Library Website – SIES GST

A full-stack web application for the SIES Graduate School of Technology (GST) college library. The site lets students browse e-resources, view syllabi and previous year question papers (PYQs), donate/suggest books, and stay updated with library news. An admin panel allows authorised staff to manage the database directly.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Features](#features)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## Project Structure

```
Libray-Website/
├── Frontend/        # React + Vite client application
├── Backend/         # Node.js + Express API server
├── migrate-db/      # MongoDB migration utilities
└── README.md        # This file
```

See the [Frontend README](./Frontend/README.md) and [Backend README](./Backend/README.md) for folder-specific details.

---

## Tech Stack

| Layer     | Technology |
|-----------|-----------|
| Frontend  | React 18, Vite, Tailwind CSS, Zustand, React Router v6 |
| Backend   | Node.js, Express 4, MongoDB (Mongoose), JWT, Cloudinary |
| Auth      | JSON Web Tokens (access + refresh), bcrypt |
| Storage   | Cloudinary (file uploads) |
| Hosting   | Vercel (frontend & backend), Render (backend alternative) |

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 20
- **npm** ≥ 10
- A running **MongoDB** instance (local or Atlas)
- A **Cloudinary** account for file uploads

### 1 – Clone the repository

```bash
git clone https://github.com/Sourish-Kanna/Libray-Website.git
cd Libray-Website
```

### 2 – Start the backend

```bash
cd Backend
cp example.env .env   # fill in the values (see Environment Variables)
npm install
npm run dev
```

### 3 – Start the frontend

```bash
cd ../Frontend
npm install
npm run dev
```

The frontend dev server is available at `http://localhost:5173` and it proxies API requests to the backend running on port `8000`.

---

## Environment Variables

Backend environment variables are documented in [`Backend/example.env`](./Backend/example.env):

| Variable | Description |
|----------|-------------|
| `PORT` | Port the Express server listens on (default `8000`) |
| `MONGODB_URL` | MongoDB connection string for the main database |
| `MONGODB_URL_ADMIN` | MongoDB connection string for the admin database |
| `DB_NAME` | Name of the main database |
| `CORS_ORIGIN` | Allowed CORS origin(s) |
| `ACCESS_TOKEN_SECRET` | Secret key for signing access JWTs |
| `ACCESS_TOKEN_EXPIRY` | Access token expiry duration (e.g. `1d`) |
| `REFRESH_TOKEN_SECRET` | Secret key for signing refresh JWTs |
| `REFRESH_TOKEN_EXPIRY` | Refresh token expiry duration (e.g. `10d`) |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |

---

## Available Scripts

From the **root** of each sub-project:

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production (frontend only) |
| `npm run preview` | Preview the production build (frontend only) |
| `npm run lint` | Run ESLint |
| `npm start` | Start in production mode (backend only) |

---

## Features

- 📚 **E-Resources** – Browse and download study materials
- 📝 **Syllabus & PYQs** – Access syllabi and previous year question papers filtered by branch, year, and semester
- 📰 **News** – Latest library announcements
- 🔗 **Quick Links** – Useful external links for students
- 📖 **Donate / Suggest Books** – Forms for book donations and suggestions
- 🔐 **Admin Panel** – Protected database viewer for authorised staff
- ☁️ **Cloudinary Uploads** – File uploads served via Cloudinary CDN

---

## Deployment

| Service | Purpose |
|---------|---------|
| [Vercel](https://vercel.com) | Frontend & backend deployments |
| [Render](https://render.com) | Alternative backend deployment (`render.yaml`) |

Live site: **https://siesgstlibrary.vercel.app**

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/your-feature`)
3. Commit your changes (`git commit -m 'feat: add your feature'`)
4. Push to the branch (`git push origin feat/your-feature`)
5. Open a Pull Request