import { integer, pgTable, primaryKey, timestamp } from "drizzle-orm/pg-core";
import { users } from "./user";
import { roles } from "./role";

export const userRoles = pgTable(
  "user_roles",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    roleId: integer("role_id")
      .notNull()
      .references(() => roles.id),
    createdAt: timestamp("created_at", {
      withTimezone: true,
    }).defaultNow(),
    updatedAt: timestamp("updated_at", {
      withTimezone: true,
    }).defaultNow(),
  },
  (table) => {
    return [
      {
        pk: primaryKey({ columns: [table.userId, table.roleId] }),
        pkWithCustomName: primaryKey({
          name: "user_role_pk",
          columns: [table.userId, table.roleId],
        }),
      },
    ];
  },
);

export type UserRoleInsert = typeof userRoles.$inferInsert;
export type UserRoleSelect = typeof userRoles.$inferSelect;
