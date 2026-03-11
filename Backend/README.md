# Backend – Library Website

The REST API server for the SIES GST Library Website, built with **Node.js**, **Express**, and **MongoDB**.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| [Node.js](https://nodejs.org) | JavaScript runtime |
| [Express 4](https://expressjs.com) | Web framework |
| [MongoDB](https://www.mongodb.com) + [Mongoose](https://mongoosejs.com) | Database & ODM |
| [JSON Web Tokens](https://jwt.io) | Stateless authentication |
| [bcrypt](https://github.com/kelektiv/node.bcrypt.js) | Password hashing |
| [Cloudinary](https://cloudinary.com) | File / image storage |
| [Multer](https://github.com/expressjs/multer) | Multipart file uploads |
| [express-rate-limit](https://github.com/express-rate-limit/express-rate-limit) | API rate limiting |
| [dotenv](https://github.com/motdotla/dotenv) | Environment variable management |
| [nodemon](https://nodemon.io) | Dev auto-restart |

---

## Project Structure

```
Backend/
├── src/
│   ├── controllers/        # Route handler logic
│   │   ├── branchController.js
│   │   ├── newsController.js
│   │   ├── pyqs.controller.js
│   │   ├── semesterController.js
│   │   ├── syllabus.controller.js
│   │   ├── user.controllers.js
│   │   └── yearsController.js
│   ├── db/                 # Database connection helpers
│   ├── middlewares/        # Express middlewares (auth, upload, etc.)
│   ├── models/             # Mongoose schema definitions
│   │   ├── Branch.model.js
│   │   ├── Semester.model.js
│   │   ├── Year.model.js
│   │   ├── news.model.js
│   │   ├── pyqs.model.js
│   │   ├── syllabus.model.js
│   │   └── user.model.js
│   ├── routes/             # Express routers
│   │   ├── branchRoutes.js
│   │   ├── newsRoute.js
│   │   ├── pyqs.route.js
│   │   ├── semesterRoutes.js
│   │   ├── syllabus.route.js
│   │   ├── user.routes.js
│   │   └── year.routes.js
│   ├── utils/              # Utility helpers (logger, etc.)
│   ├── app.js              # Express app setup (CORS, middleware, routes)
│   ├── constants.js        # Shared constants
│   └── index.js            # Server entry point
├── public/                 # Static files served by Express
├── example.env             # Template for required environment variables
├── package.json
├── render.yaml             # Render deployment config
└── vercel.json             # Vercel deployment config
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 20
- **npm** ≥ 10
- A running **MongoDB** instance (local or [Atlas](https://www.mongodb.com/atlas))
- A **Cloudinary** account

### Installation

```bash
# From the repository root
cd Backend
cp example.env .env   # then fill in every value
npm install
npm run dev
```

The server starts at **http://localhost:8000** by default.

---

## Environment Variables

Copy `example.env` to `.env` and fill in each value:

| Variable | Description |
|----------|-------------|
| `PORT` | Port the server listens on (default `8000`) |
| `MONGODB_URL` | Connection string for the main MongoDB database |
| `MONGODB_URL_ADMIN` | Connection string for the admin MongoDB database |
| `DB_NAME` | Name of the main database |
| `CORS_ORIGIN` | Allowed frontend origin(s) for CORS |
| `ACCESS_TOKEN_SECRET` | Secret used to sign access JWTs |
| `ACCESS_TOKEN_EXPIRY` | Access token lifetime (e.g. `1d`) |
| `REFRESH_TOKEN_SECRET` | Secret used to sign refresh JWTs |
| `REFRESH_TOKEN_EXPIRY` | Refresh token lifetime (e.g. `10d`) |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Your Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Your Cloudinary API secret |

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start with nodemon and dotenv (auto-restarts on file changes) |
| `npm start` | Start in production mode (no auto-restart) |
| `npm run lint` | Run ESLint |

---

## API Endpoints

All routes are prefixed with `/api/v1`.

| Prefix | Router file | Description |
|--------|-------------|-------------|
| `/api/v1/users` | `user.routes.js` | User registration, login, logout |
| `/api/v1/syllabus` | `syllabus.route.js` | Syllabus documents |
| `/api/v1/pyqs` | `pyqs.route.js` | Previous year question papers |
| `/api/v1/news` | `newsRoute.js` | Library news & announcements |
| `/api/v1/branch` | `branchRoutes.js` | Academic branches |
| `/api/v1/semester` | `semesterRoutes.js` | Semesters |
| `/api/v1/year` | `year.routes.js` | Academic years |

A `GET /` health-check endpoint returns `{ "message": "Library Management System Backend is running..." }`.

---

## Authentication

The API uses a **JWT access/refresh token** scheme:

1. `POST /api/v1/users/login` returns an **access token** and a **refresh token** (stored in an HTTP-only cookie).
2. Include the access token in the `Authorization: Bearer <token>` header for protected routes.
3. Use the refresh token endpoint to obtain a new access token when it expires.

Passwords are hashed with **bcrypt** before storage.
