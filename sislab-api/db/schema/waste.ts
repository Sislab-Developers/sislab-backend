import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const wastes = pgTable("wastes", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export type WasteInsert = typeof wastes.$inferInsert;
export type WasteSelect = typeof wastes.$inferSelect;
