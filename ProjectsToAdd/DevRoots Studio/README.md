# DevRoots Studio v2

Welcome to the comprehensive documentation for DevRoots Studio v2. This project is a production-ready, full-stack application that powers the DevRoots Studio agency platform, user dashboard, admin panel, and an innovative Discord Bot Builder store.

This document covers every single aspect of the project, including the architecture, tech stack, feature set, deployment strategies, packages, tools, and the development approach we took to build it.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture & Approach](#architecture--approach)
3. [Technology Stack](#technology-stack)
4. [Frontend Ecosystem](#frontend-ecosystem)
5. [Backend Ecosystem](#backend-ecosystem)
6. [Core Features & Systems](#core-features--systems)
7. [Discord Bot Builder](#discord-bot-builder)
8. [Database Schema & Models](#database-schema--models)
9. [Security & Authentication](#security--authentication)
10. [Payment Processing](#payment-processing)
11. [Project Structure](#project-structure)
12. [Deployment & DevOps](#deployment--devops)
13. [Setup & Development](#setup--development)

---

## Project Overview

DevRoots Studio v2 is designed as a modular, scalable, and high-performance monolithic application. While it has separate codebase folders for `FrontEnd` and `BackEnd`, the production build serves the frontend statically from the backend via NestJS, simplifying deployment while maintaining development agility.

The application serves multiple purposes:
- **Public Agency Site:** Showcasing our portfolio, expertise, team, and clients.
- **Client & User Portal:** A dashboard where users can manage their sessions, view notifications, save showcase items, and purchase products.
- **Discord Bot Builder:** An automated pipeline for users to configure, purchase, and build customized Discord bots directly from the platform.
- **Admin Control Panel:** A fully integrated CMS and management suite for roles, permissions, content, users, audit logs, and the store catalog.

---

## Architecture & Approach

Our architectural approach revolves around separating concerns logically while maintaining a cohesive deployment unit.

- **Monorepo Style Setup:** The root directory houses the `FrontEnd`, `BackEnd`, and `DiscordBotBuilder` packages.
- **Backend-Driven SPA:** In development, Vite and NestJS run concurrently on different ports with proxying. In production, Vite builds to the `public` directory of the backend, and NestJS serves the `index.html` as a fallback for the Single Page Application (SPA), dynamically injecting SEO meta tags based on the requested route.
- **Feature-Module Backend:** NestJS is utilized to its full potential by breaking the application into highly focused modules (Auth, Users, Payment, BotBuilder, Store, RBAC, etc.).
- **Client-Server State Split:** We explicitly divide state management on the frontend. `TanStack Query` handles all asynchronous server state, caching, and background updates, while `Jotai` provides atomic, lightweight client-side state.

---

## Technology Stack

### General & DevOps
- **Node.js** (v18+) & **TypeScript**
- **Docker** & **Docker Compose**
- **Prisma ORM** with **PostgreSQL**
- **Railway** for production hosting

### Backend (NestJS 11)
- **Framework:** NestJS 11, Express
- **Language:** TypeScript
- **Security:** Helmet, CORS, CSRF Protection, Express Rate Limiter
- **Data Validation:** Zod, class-validator
- **Auth:** Passport, Discord OAuth2, JSON Web Tokens (JWT)
- **Documentation:** Swagger, Scalar NestJS API Reference
- **Logging:** Winston, Winston Daily Rotate File
- **Utilities:** Adm-zip (for bot builder artifact packaging), Cheerio, Nodemailer, Cache Manager.

### Frontend (React 18 & Vite)
- **Core Library:** React 18, React DOM
- **Build Tool:** Vite
- **Routing:** React Router v6
- **Styling:** Tailwind CSS, PostCSS, Autoprefixer
- **UI Components:** Radix UI primitives, shadcn/ui components
- **State Management:** TanStack Query (React Query) v5, Jotai
- **Forms & Validation:** React Hook Form, Zod hook resolvers
- **Animations:** Framer Motion, Lenis (smooth scrolling), React Parallax Tilt
- **Payments:** PayPal React JS SDK
- **Data Visualization:** Recharts, Mermaid (diagrams)
- **Content Rendering:** React Markdown, Rehype (raw, sanitize, slug), Remark GFM
- **Theme:** Next-Themes (Dark/Light mode support)

---

## Frontend Ecosystem

The frontend is a React application optimized for extreme performance, smooth user experiences, and dynamic interactions.

### Packages & Tools Used:
- `@tanstack/react-query`: Powerful data synchronization, caching, optimistic updates.
- `jotai`: A primitive and flexible state management library for React.
- `framer-motion`: Production-ready declarative animations.
- `lenis`: A lightweight robust smooth scroll library.
- `lucide-react` & `react-icons`: Comprehensive icon packs.
- `react-hook-form` + `@hookform/resolvers`: Performant, flexible, and extensible forms with easy-to-use validation via Zod.
- `date-fns`: Modern JavaScript date utility library.
- `@dnd-kit/core`: Drag-and-drop interactions for admin ordering.

### Design System & UI
We adopted **Tailwind CSS** for rapid, utility-first styling combined with **Radix UI** for accessible, unstyled UI primitives. On top of this, we implemented **shadcn/ui** patterns to build reusable components like Accords, Dialogs, Dropdowns, Selects, Toasts, and more.
We also feature **Glassmorphism** concepts and dynamic mouse-glow effects on the UI for a premium, modern aesthetic.

---

## Backend Ecosystem

The backend is built on **NestJS 11**, offering a strongly-typed, scalable architectural pattern heavily inspired by Angular.

### Packages & Tools Used:
- `@nestjs/core`, `@nestjs/common`, `@nestjs/platform-express`
- `@prisma/client` & `@prisma/adapter-pg`: Type-safe database client and PostgreSQL adapter.
- `passport`, `passport-discord`, `passport-jwt`: Robust authentication middleware ecosystem.
- `@nestjs/swagger` & `@scalar/nestjs-api-reference`: Automatic OpenAPI schema generation and beautiful interactive API documentation.
- `winston`: Advanced logging system outputting to rotating files and the console.
- `zod` & `nestjs-zod`: Runtime type validation across boundaries.
- `@paypal/checkout-server-sdk`: Secure server-side validation and capture of PayPal orders.

---

## Core Features & Systems

### Role-Based Access Control (RBAC)
The platform implements a fully dynamic RBAC system. 
- **Roles:** Defined dynamically in the database (e.g., owner, admin, user).
- **Permissions:** Granular permission keys like `users.manage`, `content.manage`, `builds.manage`.
- **Enforcement:** A custom NestJS guard (`@RequirePermissions()`) checks user claims stored in their JWT to determine access.

### Content Management System (CMS)
Administrators can modify the website copy dynamically:
- **Hero Sections:** Taglines, CTA text.
- **Portfolios:** Customizable portfolio pages for team members with projects, stats, and expertise.
- **Showcase Items:** Markdown-based blog/showcase posts with tags and metadata.
- **Site Navigation & Footer:** Dynamic links configurable via the dashboard.

### Audit & Notifications
- **Audit Logs:** Every critical action (login, profile update, store purchase, role assignment) is logged persistently in the database, allowing admins to trace history.
- **In-App Notifications:** Users receive targeted or broadcast notifications for events (e.g., successful bot build, security alerts). Preferences allow toggling emails vs. in-app alerts.

### Interactive API Documentation
Available at `/api/docs`, the backend serves a Scalar-powered interactive API reference auto-generated from NestJS Swagger decorators. It supports full endpoint testing and schema viewing.

---

## Discord Bot Builder

A standout feature of DevRoots Studio v2 is the internal `DiscordBotBuilder` package. This acts as an independent build engine.

### How it Works
1. **Catalog:** The builder scans a directory of independent bot features (e.g., `greet`, `polls`, `stats`).
2. **Dependencies:** It resolves dependencies between features using a topological sort.
3. **Merging:** It takes a `base-template` (NestJS + Discord.js + React Dashboard) and merges the requested features into it.
4. **Generation:** It auto-generates routes, API modules, and Discord commands dynamically.
5. **Output:** It packages the entire ready-to-run bot project into a zip file (`.tgz`), delivering it to the user's dashboard for download.

---

## Database Schema & Models

We use Prisma with PostgreSQL. The schema is highly relational.

### Key Models
- **User:** Stores Discord OAuth identities, refresh tokens, effective profile overrides, and tracks timestamps and locations.
- **Session:** Tracks individual device logins, handling refresh tokens, IP addresses, and User-Agents.
- **RoleDefinition & PermissionDefinition:** The backbone of the RBAC system.
- **AuditLog:** Immutable records of system changes.
- **Notification & NotificationCampaign:** For real-time user updates.
- **SiteMeta, NavLink, PortfolioProfile, ShowcaseItem:** CMS tables for the frontend display.
- **Feature & Preset:** Store catalog items.
- **Cart, Order, Build:** E-commerce tables handling the checkout lifecycle and the resulting bot builder artifacts.

---

## Security & Authentication

### Discord OAuth2
We implemented passwordless authentication using Discord OAuth2. 
1. The user clicks Login, redirecting to Discord.
2. Discord redirects to the NestJS callback.
3. NestJS creates/updates the `User`, generating a JWT Access Token (short-lived) and a Refresh Token (long-lived).
4. The Refresh token is stored in a secure, `httpOnly`, `SameSite=None` cookie.
5. The Access token is returned to the frontend and kept in memory to prevent XSS exfiltration.

### API Protections
- **CSRF:** Implemented via a Double-Submit Cookie pattern. A `devroots_csrf` cookie is set, and the client must return the same value in an `x-csrf-token` header for state-changing requests.
- **Helmet.js:** Adds secure HTTP response headers.
- **Throttler (Rate Limiting):** Limits repeated requests to prevent brute force and abuse, configured with short, medium, and long windows.

---

## Payment Processing

We integrate with the **PayPal Checkout SDK**.
- **Frontend:** Uses `@paypal/react-paypal-js` to render the smart payment buttons in the cart.
- **Backend:** Defines `/api/payment/create-order` and `/api/payment/capture-order`.
- **Workflow:** 
  1. User adds bot Presets or Features to their Cart.
  2. The backend calculates the true total in USD to prevent client-side tampering.
  3. PayPal confirms the transaction.
  4. The backend captures the payment, clears the cart, marks the Order as paid, and dispatches an event to the `BotBuilderService` to compile the user's customized bot artifact.

---

## Project Structure

The repository is structured to separate concerns while maintaining a unified lifecycle.

```text
DevRoots-Studio-v2/
├── BackEnd/                     # NestJS API & Services
│   ├── prisma/                  # Schema, migrations, seeds
│   ├── src/                     # All backend modules
│   │   ├── auth/                # OAuth, JWT, session logic
│   │   ├── rbac/                # Roles and permissions guards
│   │   ├── payment/             # PayPal handlers
│   │   ├── bot-builder/         # Integrates with the builder engine
│   │   └── main.ts              # Entry point & SPA fallback config
│   ├── config.yaml              # Backend configuration variables
│   └── package.json
│
├── FrontEnd/                    # React SPA
│   ├── src/
│   │   ├── components/          # Reusable UI, Layouts, Forms
│   │   ├── pages/               # Route endpoints (Home, Dashboard, Admin)
│   │   ├── hooks/               # Custom React & TanStack Query hooks
│   │   ├── store/               # Jotai global state atoms
│   │   └── App.tsx              # React Router definition
│   ├── tailwind.config.ts       # Utility class configuration
│   └── package.json
│
├── DiscordBotBuilder/           # The automated bot compilation engine
│   ├── base-template/           # The skeleton for generated bots
│   ├── builder/                 # The compilation logic
│   └── features/                # The catalog of injectable bot modules
│
├── Dockerfile                   # Multi-stage production build script
├── docker-compose.yml           # Local dev orchestration
└── railway.toml                 # Production PaaS configuration
```

---

## Deployment & DevOps

The application is deployed as a single, cohesive unit using **Docker**.

### Build Pipeline (Dockerfile)
1. **Frontend Stage:** Installs Vite dependencies and builds the SPA into static HTML/JS/CSS assets.
2. **DiscordBotBuilder Stage:** Compiles the shared and builder scripts for the bot engine.
3. **Backend Stage:** Installs NestJS dependencies, copies the built Frontend into the `public` folder, and compiles the TypeScript API.
4. **Production Stage:** Uses a minimal Node.js Alpine image, copies all built artifacts, trims dev dependencies, and defines the start command.

### Start Sequence
When the container boots (e.g., on Railway):
1. `npx prisma migrate deploy` runs to ensure the database schema is up-to-date.
2. `node prisma/seed.js` runs to populate default CMS data, roles, and permissions (it is strictly idempotent).
3. `node dist/src/main.js` starts the web server. The backend intercepts API routes and serves the injected SPA `index.html` for everything else.

---

## Setup & Development

### Local Prerequisites
- Node.js (v18+)
- PostgreSQL (or SQLite for dev testing)
- A Discord Application (for OAuth2 Client ID/Secret)
- A PayPal Sandbox Developer Account

### Running the App
The project requires concurrent execution of the frontend and backend in development.

1. **Database:**
   ```bash
   cd BackEnd
   npx prisma generate
   npx prisma migrate dev
   npm run prisma:seed
   ```

2. **Backend Configuration:**
   Edit `BackEnd/config.yaml` to include your Discord credentials and PayPal sandbox keys.

3. **Start Backend Server:**
   ```bash
   cd BackEnd
   npm run start:dev
   ```

4. **Start Frontend Server:**
   ```bash
   cd FrontEnd
   npm run dev
   ```

### Gaining Admin Access
Because authentication is passwordless via Discord, initial admin access requires a manual promotion:
1. Log in to the frontend via Discord to create your user record.
2. Add your Discord ID to the `auth.discord.ownerIds` array in `BackEnd/config.yaml`.
3. Restart the backend and log back in. The backend will automatically promote your account to the `owner` role, granting full access to the CMS, Users, RBAC, and Store Admin panels.

---
*DevRoots Studio v2 is built for resilience, speed, and maximum developer productivity. The codebase is heavily documented inline and follows strict TypeScript standard practices.*
