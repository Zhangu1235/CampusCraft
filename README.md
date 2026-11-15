# CampusCraft
Highlights students building real projects, gaining experience, and earning through their skills.

## Authentication and data setup

1. Copy `.env.example` to `.env` and add the Clerk publishable key and Supabase project URL and publishable key.
2. Start the Vite app with `npm run dev`. Clerk sign-in and sign-up are available at `/login` and `/register`; dashboard routes require a signed-in Clerk session.
3. In the Clerk Dashboard, connect the Clerk application to Supabase using Clerk's Supabase integration setup. In Supabase, add Clerk as a third-party authentication provider and enable Row Level Security on every table before adding application data.
4. Use the exported `useSupabase()` hook from `src/lib/supabase.js` for browser database access. It forwards the current Clerk session token to Supabase.

The current project is a browser-only Vite app. `CLERK_SECRET_KEY` and `SUPABASE_SECRET_KEY` are reserved for a future trusted server and are not used or exposed by this app. Never put a secret key in a `VITE_` variable. User role metadata collected at sign-up is for UI display; enforce permissions with Supabase RLS policies.
