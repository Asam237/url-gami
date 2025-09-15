import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const url = pgTable("url", {
  id: serial("id").primaryKey(),
  original_url: varchar({ length: 255 }),
  short_code: varchar({ length: 255 }),
});
