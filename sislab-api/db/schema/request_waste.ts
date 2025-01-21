import {
  boolean,
  integer,
  pgTable,
  primaryKey,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { labRequests } from "./lab_request";
import { wastes } from "./waste";

export const requestWastes = pgTable(
  "request_wastes",
  {
    wasteId: integer("waste_id")
      .notNull()
      .references(() => wastes.id),
    requestId: integer("request_id")
      .notNull()
      .references(() => labRequests.id),
    quantity: integer("quantity"),
    unit: varchar("unit", { length: 5 }),
    omitted: boolean("omitted").default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => {
    return [
      {
        pk: primaryKey({ columns: [table.wasteId, table.requestId] }),
        pkWithCustomName: primaryKey({
          name: "request_wastes_pk",
          columns: [table.wasteId, table.requestId],
        }),
      },
    ];
  },
);

export type RequestWasteInsert = typeof requestWastes.$inferInsert;
export type RequestWasteSelect = typeof requestWastes.$inferSelect;
