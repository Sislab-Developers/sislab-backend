import {
  integer,
  pgTable,
  primaryKey,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { reagents } from "./reagent";
import { experiments } from "./experiment";

export const experimentReagents = pgTable(
  "experiment_reagents",
  {
    reagentId: integer("reagent_id")
      .notNull()
      .references(() => reagents.id),
    experimentId: integer("experiment_id")
      .notNull()
      .references(() => experiments.id),
    quantity: integer("quantity").notNull(),
    unit: varchar("unit", { length: 5 }).notNull(),
    createdAt: timestamp("created_at", {
      withTimezone: true,
    }),
    updatedAt: timestamp("updated_at", {
      withTimezone: true,
    }),
  },
  (table) => {
    return [
      {
        pk: primaryKey({ columns: [table.reagentId, table.experimentId] }),
        pkWithCustomName: primaryKey({
          name: "experiment_reagent_pk",
          columns: [table.reagentId, table.experimentId],
        }),
      },
    ];
  },
);

export type ExperimentReagentInsert = typeof experimentReagents.$inferInsert;
export type ExperimentReagentSelect = typeof experimentReagents.$inferSelect;
