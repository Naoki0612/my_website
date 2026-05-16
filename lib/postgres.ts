import { Pool } from "pg";

const connectionString =
  process.env.SUPABASE_SESSION_POOL_URL ||
  process.env.POSTGRES_URL ||
  process.env.DATABASE_URL;

declare global {
  var guestbookPool: Pool | undefined;
}

export function getPostgresPool() {
  if (!connectionString) {
    throw new Error("Missing PostgreSQL connection string.");
  }

  if (!globalThis.guestbookPool) {
    globalThis.guestbookPool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
      max: 5
    });
  }

  return globalThis.guestbookPool;
}
