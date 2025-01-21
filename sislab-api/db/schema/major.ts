import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const majors = pgTable("majors", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  }).defaultNow(),
});

export type MajorInsert = typeof majors.$inferInsert;
export type MajorSelect = typeof majors.$inferSelect;
