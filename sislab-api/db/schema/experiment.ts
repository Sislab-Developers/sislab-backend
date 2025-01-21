import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const experiments = pgTable("experiments", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  experimentNumber: integer("experiment_number").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export type ExperimentInsert = typeof experiments.$inferInsert;
export type ExperimentSelect = typeof experiments.$inferSelect;
