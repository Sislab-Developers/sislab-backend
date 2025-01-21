import { integer, pgTable, primaryKey, timestamp } from "drizzle-orm/pg-core";
import { wastes } from "./waste";
import { experiments } from "./experiment";

export const experimentWastes = pgTable(
  "experiment_wastes",
  {
    wasteId: integer("waste_id")
      .notNull()
      .references(() => wastes.id),
    experimentId: integer("experiment_id")
      .notNull()
      .references(() => experiments.id),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => {
    return [
      {
        pk: primaryKey({ columns: [table.wasteId, table.experimentId] }),
        pkWithCustomName: primaryKey({
          name: "experiment_wastes_pk",
          columns: [table.wasteId, table.experimentId],
        }),
      },
    ];
  },
);

export type ExperimentWasteInsert = typeof experimentWastes.$inferInsert;
export type ExperimentWasteSelect = typeof experimentWastes.$inferSelect;
