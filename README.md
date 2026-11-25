# CampusCraft

## Overview
CampusCraft is a modern **Next.js 16** web application that serves as a scaffold for building a campus marketplace. It provides a clean project structure, integrated authentication with Supabase, and a UI built with **Tailwind CSS 4** and **shadcn/ui**. The repository includes a ready‑to‑deploy Vercel configuration and a set of npm scripts that cover the typical development workflow.

---

## Repository Structure
```
CampusCraft/                 # Repository root
├── README.md               # This file
└── CampusCraft/            # Next.js application root (Vercel project root)
    ├── app/                # App Router pages & layouts
    ├── components/         # Shared React components
    ├── hooks/              # Custom React hooks
    ├── lib/                # Utilities and Supabase client helpers
    ├── public/             # Static assets (images, favicons, …)
    ├── package.json        # Project metadata & script definitions
    └── package-lock.json   # Exact npm dependency lockfile
```

> **Vercel Root Directory:** `CampusCraft/CampusCraft` (relative to the repository root).

---

## Tech Stack
- **Framework:** Next.js 16 (App Router) with React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4, shadcn/ui components
- **Database / Auth:** Supabase JavaScript client (`@supabase/ssr` helpers)
- **Theming:** `next-themes` for system‑aware light/dark mode
- **Package Manager:** npm (Node.js 20.9+)

---

## Getting Started
### Prerequisites
- **Node.js** version **20.9** or newer
- **npm** (comes with Node)
- A Supabase project (for authentication & data storage)

### Installation
```bash
# Clone the repo (if you haven't already)
git clone <repository-url>
cd CampusCraft

# Install dependencies inside the Next.js app directory
cd CampusCraft/CampusCraft
npm ci
```

### Environment Variables
Create a `.env.local` file in `CampusCraft/CampusCraft/` with the following contents:
```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
```
> **Important:** The publishable key is safe for the browser. Never commit secret or service‑role keys (those should be kept server‑side and never exposed via `NEXT_PUBLIC_*`).

### Development Server
```bash
npm run dev
```
Open **http://localhost:3000** in your browser. The app automatically respects your OS colour scheme – press **d** to toggle light/dark mode when no input is focused.

---

## Scripts
| Command | Description |
|---|---|
| `npm run dev` | Starts the development server with hot‑reloading |
| `npm run build` | Generates an optimized production build |
| `npm run start` | Serves the production build locally |
| `npm run lint` | Runs ESLint over the codebase |
| `npm run typecheck` | Executes TypeScript type checking without emitting files |
| `npm run format` | Formats all TypeScript/TSX files using Prettier |

---

## Deployment to Vercel
1. **Import** the repository in Vercel.
2. In **Project Settings → Build & Deployment**, set **Root Directory** to `CampusCraft/CampusCraft`.
3. Keep the **Framework Preset** as **Next.js** – Vercel auto‑detects the required version and the package manager.
4. Add the environment variables `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` under **Settings → Environment Variables** for **Production**, **Preview**, and **Development** as needed.
5. Click **Deploy**. Vercel will run `npm run build` and serve the resulting `.next` directory.

After any change to environment variables, trigger a new deployment so the updates take effect.

---

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feat/your-feature`).
3. Make your changes and ensure the lint/format scripts pass:
   ```bash
   npm run lint && npm run format
   ```
4. Run the test suite (if any) and verify the app works locally.
5. Open a Pull Request against the `main` branch with a clear description of your changes.

---

## License
This project is licensed under the **MIT License** – see the `LICENSE` file for details.

---

## Learn More & Support
- **Supabase Docs:** https://supabase.com/docs
- **Next.js Documentation:** https://nextjs.org/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **shadcn/ui:** https://ui.shadcn.com

If you encounter any issues, feel free to open an issue on the repository or join the community chat linked from the project homepage.
