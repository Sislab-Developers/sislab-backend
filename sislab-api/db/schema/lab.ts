import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const labs = pgTable("labs", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 10 }).notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  }).defaultNow(),
});

export type LabInsert = typeof labs.$inferInsert;
export type LabSelect = typeof labs.$inferSelect;
