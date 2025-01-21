import { integer, pgTable, primaryKey, timestamp } from "drizzle-orm/pg-core";
import { equipment } from "./equipment";
import { experiments } from "./experiment";

export const experimentEquipment = pgTable(
  "experiment_equipment",
  {
    equipmentId: integer("equipment_id")
      .notNull()
      .references(() => equipment.id),
    experimentId: integer("experiment_id")
      .notNull()
      .references(() => experiments.id),
    createdAt: timestamp("created_at", {
      withTimezone: true,
    }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => {
    return [
      {
        pk: primaryKey({ columns: [table.equipmentId, table.experimentId] }),
        pkWithCustomName: primaryKey({
          name: "experiment_equipment_pk",
          columns: [table.equipmentId, table.experimentId],
        }),
      },
    ];
  },
);
