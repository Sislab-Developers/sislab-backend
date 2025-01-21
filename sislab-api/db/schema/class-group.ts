import {
  boolean,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { labs } from "./lab";
import { majors } from "./major";
import { courses } from "./course";
import { users } from "./user";

export const classGroups = pgTable("class_groups", {
  id: serial("id").primaryKey(),
  labId: integer("lab_id").references(() => labs.id),
  majorId: integer("major_id").references(() => majors.id),
  courseId: integer("course_id").references(() => courses.id),
  numberOfStudents: integer("number_of_students").notNull(),
  numberOfTeams: integer("number_of_teams").notNull(),
  dayOfWeek: integer("day_of_week").notNull(),
  startTime: integer("start_time").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  userId: integer("user_id").references(() => users.id),
  period: varchar("period").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export type ClassGroupInsert = typeof classGroups.$inferInsert;
export type ClassGroupSelect = typeof classGroups.$inferSelect;
