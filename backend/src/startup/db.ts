import { drizzle } from "drizzle-orm/node-postgres";
import { pool } from "../utils/db";

export const connectToDatabase = async () => {
  try {
    pool.on("connect", () => {
      console.log(`[Postgres]: connected`);
    });
    pool.on("error", (error) => {
      console.log(`[Postgres]: failled to connect -> ${error.message}`);
    });
    const client = await pool.connect();
    client.release();
    return drizzle(pool);
  } catch (error) {
    throw new Error(`failled to connected to the database: ${error.message}`);
  }
};
