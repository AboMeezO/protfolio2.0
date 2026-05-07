# EV King V2 Platform

> **Note:** This project is currently a work in progress and remains incomplete. It is actively under development, and there is no live or deployed online version available at this time.

## Project Vision & Main Purpose
EV King V2 was conceived to solve a critical business problem: the original EV King digital storefront was running on an aging, clunky WordPress monolithic architecture. It suffered from poor load times, restrictive plugin ecosystems, and an inability to deliver the premium, high-tech experience that electric vehicle buyers expect. 

The main purpose of this project is a complete digital rebranding and replatforming. We are building a fully decoupled, headless architecture with absolute control over the UX, data relationships, and business logic. This allows us to handle complex vehicle inventory, dynamic financial calculators, and internal CRM tools without the overhead or limitations of WordPress.

## Comprehensive Tech Stack

### Frontend Architecture
The frontend is built for instantaneous navigation, type safety, and premium interactions.
- **Core:** React 19 driven by Vite for ultra-fast HMR and optimized production bundling.
- **Routing:** `@tanstack/react-router` for strictly typed routing, ensuring no broken links, handling URL search params flawlessly, and enabling advanced preloading strategies.
- **State & Data Fetching:** `@tanstack/react-query` for robust server-state management, caching, background synchronization, and optimistic UI updates.
- **Form Management:** `@tanstack/react-form` coupled with `Zod` (`zod`) for rigorous client-side schema validation and error handling.
- **Styling Engine:** Tailwind CSS v4 (`@tailwindcss/vite`) for zero-runtime utility classes, ensuring a minimal CSS payload and a highly maintainable design system.
- **Animations:** A hybrid approach using Framer Motion (`motion`) for layout transitions and React-based animations, alongside GSAP (`gsap`) for complex, timeline-based scroll interactions and premium micro-animations.
- **Localization:** `i18next` and `react-i18next` to provide a seamless, deeply integrated Arabic/English bilingual experience.
- **Icons & UI:** `lucide-react` for scalable SVG iconography and Radix UI (`@radix-ui/react-slot`) for accessible component primitives.

### Backend & CMS Architecture (NestJS)
To break away from WordPress, we engineered a custom backend infrastructure using **NestJS**. This serves as our headless CMS and core API layer.
- **Core Framework:** NestJS (TypeScript-based, utilizing dependency injection for high modularity and scalable architecture).
- **Database ORM:** Prisma (`@prisma/client`), providing absolute type safety from the database schema directly to the backend controllers and frontend types.
- **Database:** PostgreSQL (managed and mapped via Prisma migrations).
- **Authentication & Identity:** Clerk (`@clerk/express`, `@clerk/react`). We offloaded complex identity management to Clerk to ensure enterprise-grade security, while syncing user states to our local database via webhooks to maintain relational mapping (Favorites, Leads, Roles).

## Key Features & Platform Capabilities

### 1. Bespoke Vehicle Inventory CMS
Instead of generic WordPress post types, the system utilizes a strictly typed `Vehicle` model containing EV-specific metrics (Range in km, Battery kWh, Acceleration, Top Speed, Drivetrain). Multiple high-res images are handled relationally (`VehicleImage`), allowing for dynamic galleries and primary image tagging.

### 2. Role-Based Access Control (RBAC)
The NestJS backend implements a granular permission system (`User`, `Role`, `UserRole` mapping). This ensures that standard users can browse and favorite vehicles, while Admins have exclusive access to manage the vehicle inventory, update team members (`TeamMember`), and moderate customer testimonials (`Testimonial`).

### 3. Integrated CRM & Lead Generation
The platform features a built-in lead capture and support system. When users inquire about a vehicle, it generates a `Lead` securely tied to the database, tracking the status (NEW, CONTACTED, CLOSED). This acts as a custom support ticketing system hidden securely within the admin portal.

### 4. Interactive Financial Tools
We built custom, client-side calculators to drive user engagement and assist in the purchasing decision:
- **Invoice Calculator:** Dynamically calculates vehicle pricing, applicable taxes, and associated fees.
- **EV Savings Calculator:** Computes long-term fuel and maintenance savings of an EV against traditional combustion engines based on user input.

## Application Structure & Pages
The application is organized into a comprehensive route tree handling diverse user intents:
- **Index (`/`):** The landing experience featuring Best Selling sections, interactive Masked Images, dynamic Stats, and Brand showcases.
- **Inventory (`/listings`, `/listings/$id`):** Dynamic vehicle browsing, filtering, and deep-dive detail pages showcasing specs and galleries.
- **Comparison (`/compare`):** A dedicated tool for comparing technical specifications of multiple EVs side-by-side.
- **Content & SEO (`/blog`, `/blog/$id`):** Custom blog engine designed for high SEO performance and community engagement.
- **Company (`/about`, `/team`, `/contact`):** Corporate identity pages and lead generation endpoints.
- **User Portal (`/login`):** Secured entry points for user favorites and backend admin management.
- **Trust & Legal (`/testimonials`, `/privacy`, `/terms`):** Moderated user reviews and necessary compliance documents.

## How We Did It & Overcoming Challenges

### Escaping the WordPress Monolith
**Challenge:** The old site relied on heavy PHP execution and fragmented databases (`wp_postmeta`), making it slow and difficult to maintain.
**Solution:** We decoupled the frontend from the backend. By serving a statically built SPA via Vite and exposing a secure RESTful API via NestJS, we eliminated server-render blocking. We used Prisma to architect a clean, highly relational PostgreSQL database, allowing us to query exact EV specifications instantly without joining multiple meta tables.

### Handling Complex State & Performance
**Challenge:** EV buyers need to filter through complex specs (range, price, brand) and compare vehicles instantly without waiting for page reloads.
**Solution:** We utilized `@tanstack/react-query` to cache the inventory catalog on the client. Coupled with `@tanstack/react-router`'s loader functions, we parallelize data fetching before the UI even renders. This makes navigating from the listings page to a specific car's detail page feel instantaneous.

### Achieving a Premium Feel Without Performance Loss
**Challenge:** High-end animations usually cause layout thrashing, repaint issues, and drop frame rates, especially on mobile.
**Solution:** We carefully orchestrated our animations, offloading heavy visual updates to the GPU. We used GSAP's optimized transform calculations for scroll-triggered events and Framer Motion's layout animations, explicitly avoiding animating expensive CSS properties like `margin` or `width`. The result is a buttery smooth, 60fps experience that looks expensive but loads in milliseconds.
