//-------------------------------
// Drizzle via PostgresJS driver

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "@/drizzle/schema";

const client = postgres(process.env.POSTGRES_URL! as string, {
  prepare: false,
  max: 200,
  idle_timeout: 0,
});
export const db = drizzle(client, { schema, logger: true });

//--------------------
//Drizzel via neon driver

// import * as schema from "@/drizzle/schema";

// import { drizzle } from "drizzle-orm/neon-http";
// import { neon } from "@neondatabase/serverless";

// const sql = neon(process.env.POSTGRES_URL!);
// export const db = drizzle(sql, { schema, logger: true });

//---------------------
// Drizzel via neone driver for local connection

// import * as schema from "@/drizzle/schema";

// import { drizzle } from "drizzle-orm/neon-http";
// import { neon, neonConfig } from "@neondatabase/serverless";

// // if we're running locally
// if (!process.env.VERCEL_ENV) {
//   // Set the WebSocket proxy to work with the local instance

//   neonConfig.wsProxy = (host) => `${host}:5433/v1`;
//   // Disable all authentication and encryption
//   neonConfig.useSecureWebSocket = false;
//   neonConfig.pipelineTLS = false;
//   neonConfig.pipelineConnect = false;
// }

// if (!process.env.POSTGRES_URL) {
//   throw new Error("POSTGRES_URL is not set");
// }
// const sql = neon(process.env.POSTGRES_URL);
// export const db = drizzle(sql, { schema, logger: true });
