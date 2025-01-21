import { integer, pgTable, timestamp } from "drizzle-orm/pg-core";
import { comments } from "./comment";
import { labRequests } from "./lab_request";

export const requestComments = pgTable("request_comments", {
  requestId: integer("request_id")
    .notNull()
    .references(() => labRequests.id),
  commentId: integer("comment_id").references(() => comments.id),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});
