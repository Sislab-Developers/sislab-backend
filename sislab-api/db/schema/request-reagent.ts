import {
  boolean,
  integer,
  pgTable,
  primaryKey,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { reagents } from "./reagent";
import { labRequests } from "./lab_request";

export const requestReagents = pgTable(
  "request_reagents",
  {
    reagentId: integer("reagent_id")
      .notNull()
      .references(() => reagents.id),
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
        pk: primaryKey({ columns: [table.reagentId, table.requestId] }),
        pkWithCustomName: primaryKey({
          name: "request_reagents_pk",
          columns: [table.reagentId, table.requestId],
        }),
      },
    ];
  },
);

export type RequestReagentInsert = typeof requestReagents.$inferInsert;
export type RequestReagentSelect = typeof requestReagents.$inferSelect;
