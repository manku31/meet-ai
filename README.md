# MeetAI

A Next.js application built with modern web technologies including Drizzle ORM, PostgreSQL, and Tailwind CSS.

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/manku31/meet-ai.git
cd meet-ai
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
DATABASE_URL="your_postgresql_database_url_here"
```

**Required Environment Variables:**

- `DATABASE_URL` - PostgreSQL database connection string (e.g., from Neon, Supabase, or your local PostgreSQL instance)

### Database Setup

Push the database schema to your PostgreSQL database:

```bash
npm run db:push
```

To open Drizzle Studio for database management:

```bash
npm run db:studio
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push database schema changes
- `npm run db:studio` - Open Drizzle Studio

## Tech Stack

- **Framework:** Next.js 16
- **Database:** PostgreSQL with Drizzle ORM
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **TypeScript:** Full type safety
- **Database Provider:** Neon Database
