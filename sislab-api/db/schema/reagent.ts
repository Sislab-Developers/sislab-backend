import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const reagents = pgTable("reagents", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  chemicalNotation: varchar("chemical_notation").notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  }),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  }),
});

export type ReagentInsert = typeof reagents.$inferInsert;
export type ReagentSelect = typeof reagents.$inferSelect;
