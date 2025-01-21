import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const roles = pgTable("roles", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  }).defaultNow(),
});

export type RoleInsert = typeof roles.$inferInsert;
export type RoleSelect = typeof roles.$inferSelect;
