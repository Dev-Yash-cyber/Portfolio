# Yash Barot — Professional Developer Portfolio & SaaS Platform

> **Full-Stack Developer | React • TypeScript • .NET Core • Node.js • SQL Server • MongoDB**

A production-ready, high-performance developer portfolio website and administrative content management portal built for **Yash Barot**.

---

## 🚀 Key Highlights & Features

- **Cyber-Modern SaaS Aesthetics**: Custom dark & light theming, radial glow meshes, branded technology badges, and interactive simulated code window.
- **Deep-Dive Technical Case Studies**: Dedicated routes (`/projects/:slug`) detailing engineering architecture, problem statements, challenges solved, database schemas, and performance benchmarks.
- **Categorized Skills Matrix**: 6 categorized tech cards (Frontend, Backend, Database, Development Tools, Architecture, Other Tech) and Continuous Learning Roadmap matching design specifications.
- **High-Conversion Inquiries Portal**: Dynamic project inquiry form with budget range, timeline, project type selection, validation, and real-time confetti celebration.
- **Interactive Career Journey**: Chronological development roadmap tracing growth from first lines of code to building enterprise SaaS & agentic AI tools.
- **Printable Online Resume**: Clean, ATS-friendly digital resume matching the official curriculum vitae with direct PDF print triggers.
- **Full Admin Portal & CMS** (`/admin`):
  - **Dashboard**: Lead telemetry, project status, and unread inquiry metrics.
  - **Project CRUD**: Create, edit, delete, mark featured, and configure tech stacks.
  - **Blog CMS**: Markdown editor, tag management, and instant publishing.
  - **Inquiry Management**: Lead status pipeline (`new` → `read` → `contacted` → `qualified` → `closed`), email replies, and deletion.
  - **Site Settings**: Live updates to name, bio, social links, and availability badge.
- **Resilient Offline Architecture**: Operates 100% smoothly standalone or with the included Express TypeScript & MongoDB backend.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS with custom theme variables & glassmorphism
- **Animations**: Framer Motion
- **Routing**: React Router DOM v6
- **Icons**: Lucide React
- **Celebration UX**: Canvas Confetti

### Backend & Storage
- **Server**: Node.js & Express.js (TypeScript)
- **Database**: MongoDB with Mongoose (with offline fallback store)
- **Authentication**: JWT & Bcrypt password hashing
- **Proxy**: Vite API proxy configured for development

---

## 📂 Project Structure

```text
Portfolio/
├── public/                  # Static assets, sitemap.xml, robots.txt, favicon.svg
├── server/                  # Express TypeScript backend
│   ├── config/              # MongoDB connection
│   ├── models/              # Mongoose schemas (Messages, Projects, Blog)
│   └── server.ts            # REST API endpoints & JWT authorization
├── src/
│   ├── assets/              # Static media & illustrations
│   ├── components/
│   │   ├── common/          # Button, Card, Badge, SectionHeader, TechIcon, CodeWindow
│   │   ├── layout/          # Navbar, Footer, Main Layout, Admin Layout
│   │   └── sections/        # Hero, Stats, TechMarquee, SkillsGrid, FeaturedProjects, etc.
│   ├── contexts/            # ThemeContext, ToastContext, AuthContext
│   ├── data/                # Centralized portfolio data (Projects, Skills, Experience, Blog)
│   ├── pages/               # Home, About, Skills, Experience, Projects, ProjectDetails, etc.
│   │   └── admin/           # AdminDashboard, AdminProjects, AdminBlog, AdminMessages, etc.
│   ├── services/            # API client with fallback storage
│   ├── types/               # TypeScript interfaces
│   └── utils/               # Class merger, SEO updater
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

---

## 💻 Getting Started

### 1. Prerequisites
- Node.js 18+ installed on your machine.

### 2. Installation
```bash
# Clone or navigate to the repository
cd d:\Portfolio

# Install dependencies
npm install
```

### 3. Running Locally

#### Option A: Frontend Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

#### Option B: Full-Stack (Frontend + Express API Server)
```bash
npm run dev:all
```
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

---

## 🔐 Admin Portal Credentials

Navigate to `/admin/login` or click **Admin Portal** in the website footer.

- **Email**: `byash140@gmail.com` or `admin@yashbarot.dev`
- **Password**: `admin123` (or `yash2026`)

---

## 🗄️ Connecting MongoDB Atlas

When you are ready to connect your live MongoDB database:

1. Create a `.env` file in the root directory (copy from `.env.example`).
2. Add your MongoDB connection string:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```
3. Start the server with `npm run server` or `npm run dev:all`. The app will automatically connect and persist all inquiries and data to your MongoDB database!

---

## 🌐 Production Build

To generate the optimized static build for deployment to Vercel, Netlify, or GitHub Pages:

```bash
npm run build
```
The output will be placed in the `dist/` directory.

---

## 📄 License
This project is licensed under the MIT License — designed & engineered for **Yash Barot**.
