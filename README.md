# Project Agua Clara

Project Agua Clara is a facilitator-controlled surety and reinsurance case-study simulation built in Next.js with TypeScript, Tailwind CSS, and Supabase-ready architecture.

## Overview

This prototype includes:

- Participant login flow
- Team case overview and stage pages
- Mock decision engine and deterministic calculation structure
- Facilitator dashboard and QR code page
- Supabase-ready schema and seed examples
- Vercel-compatible deployment guidance

## Getting started

1. Install dependencies:
   npm install
2. Copy the environment template:
   cp .env.example .env.local
3. Update the Supabase and facilitator settings in .env.local.
4. Run the app:
   npm run dev
5. Open http://localhost:3000

## Environment variables

Copy .env.example to .env.local and configure:

- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- FACILITATOR_PASSWORD
- NEXT_PUBLIC_APP_URL

If Supabase is not configured, the app continues in mock mode using deterministic mock data.

## Supabase setup

The project includes schema and seed SQL examples in the `supabase/` folder.

## Deployment

This app is Vercel-compatible. Deploy by:

1. connecting the GitHub repository to Vercel;
2. adding the environment variables from .env.example;
3. setting the project to use the default Next.js build;
4. deploying the production build.

## Mock data and rules

The simulation includes:

- 28 mock teams across four variants
- Five stage definitions
- Thirty decision records
- Example confidential finance rules
- Deterministic calculation scaffolding for server-side logic

## Facilitator controls

The prototype dashboard includes:

- current released stage
- team status
- filters by variant, stage and team
- release and reset controls
- CSV export endpoint
- QR access page for event presentation

## Security notes

- Team access codes are represented as hashes in the data model.
- Facilitator-only pages are separated from the participant flow.
- Participant routes do not expose rule logic or confidential financial tables.
- Calculations are structured to run on the server, not in the browser.

## Prototype notes

This project is a working prototype suitable for a live event demonstration. It intentionally uses deterministic mock data when Supabase is absent so the app can run immediately.
