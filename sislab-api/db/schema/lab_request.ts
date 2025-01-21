import { integer, pgTable, serial, timestamp } from "drizzle-orm/pg-core";
import { users } from "./user";
import { classGroups } from "./class-group";
import { experiments } from "./experiment";

export const labRequests = pgTable("lab_requests", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  groupId: integer("group_id").references(() => classGroups.id),
  experimentId: integer("experiment_id").references(() => experiments.id),
  requestDate: timestamp("request_date", { withTimezone: true }).notNull(),
  handledByUserId: integer("handled_by_user_id").references(() => users.id),
  handledAt: timestamp("handled_date", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export type LabRequestInsert = typeof labRequests.$inferInsert;
export type LabRequestSelect = typeof labRequests.$inferSelect;
