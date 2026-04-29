# Sudoku

A sudoku app built with Next.js, Prisma, and PostgreSQL.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4, CVA |
| State | Jotai |
| ORM | Prisma 7 (`@prisma/adapter-pg`) |
| Database | PostgreSQL (Docker) |

## Project structure

```
app/
  page.tsx              # Home — grid of all puzzles
  game/[id]/page.tsx    # Play a specific puzzle
  api/sync/route.ts     # Game state sync endpoint (WIP)
components/             # React UI components
hooks/
  useGame.tsx           # Cell editing, undo/redo, keyboard nav, validation
server/                 # Server actions (sudokus, games, users)
shared/
  types.d.ts            # Puzzle / Coordinates / BoardValidityState types
  validate.ts           # Row / col / box conflict detection
  atoms.ts              # Jotai atoms
lib/
  db.ts                 # Prisma client singleton
prisma/
  schema.prisma         # Data model
  migrations/           # SQL migration history
  seed.ts               # 3 seed puzzles (easy / medium / hard)
```

## Data model

**Sudoku** — a puzzle definition  
- `puzzle`: `(number | null)[][]` — 9×9 grid, `null` for blank cells  
- `solution`: `number[][]` — complete 9×9 grid

**Game** — a player's in-progress session  
- `state`: current board state (starts as a copy of `puzzle`)  
- belongs to a `User` and a `Sudoku`

**User** — a player; has many `Game`s

## Dev setup

**Prerequisites:** Docker, Node.js

```sh
# 1. Start the database
docker compose up -d

# 2. Install dependencies
npm install

# 3. Apply migrations
npx prisma migrate dev

# 4. Seed 3 puzzles (easy / medium / hard)
npm run db:seed

# 5. Start the app
npm run dev
```

The `.env` file ships with credentials that match `docker-compose.yml`, so no edits are needed for local development.

| Service | URL |
|---|---|
| App | http://localhost:3000 |
| Adminer (DB UI) | http://localhost:8080 |
| PostgreSQL | localhost:5433 |

## Available scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Production build |
| `npm run db:seed` | Seed the database with 3 puzzles |
| `npm run prisma:migrate` | Run Prisma migrations |
| `npm run prisma:dbpush` | Push schema changes without a migration |
| `npm run lint` | Run ESLint |

## Regenerating the Prisma client

After editing `prisma/schema.prisma`, regenerate the client:

```sh
npx prisma generate
```

The generated client lives in `generated/prisma/` (not `node_modules`).
