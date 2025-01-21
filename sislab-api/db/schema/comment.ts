import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./user";

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  userId: integer("user_id").references(() => users.id),
  // Missing requestId
  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  }).defaultNow(),
});

export type CommentInsert = typeof comments.$inferInsert;
export type CommentSelect = typeof comments.$inferSelect;
