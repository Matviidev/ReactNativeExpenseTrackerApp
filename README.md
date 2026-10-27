# FinTrack

A personal expense tracker built with Expo and React Native. Users sign up, log income and expenses, and get a quick overview of their balance.

## Features

- Email/password authentication with persisted sessions
- Dashboard with total balance, income, expenses and recent activity
- Transactions list with type filter and sorting
- Create, edit and delete transactions with categories and dates
- Profile editing with avatar upload

## Tech stack

Expo Router, React Native Paper, Zustand, React Hook Form, Supabase (Auth, Postgres, Storage), TypeScript.

## Project structure

```
src/
  app/          file-based routes, (auth) and (app) groups guarded by session
  features/     auth, dashboard, transactions, profile: screens, components, api, hooks
  shared/       theme tokens, UI kit, Supabase client, helpers
```

## Getting started

```bash
npm install
cp .env.example .env   # set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_KEY
npm start
```

The Supabase project needs `user_profiles` and `transactions` tables and a public `main` storage bucket for avatars.

## Scripts

- `npm start` – start the Expo dev server
- `npm run android` / `npm run ios` / `npm run web` – run on a platform
- `npm run lint` – lint with ESLint
- `npm run typecheck` – type-check with TypeScript
