import {
  boolean,
  integer,
  pgTable,
  primaryKey,
  timestamp,
} from "drizzle-orm/pg-core";
import { labRequests } from "./lab_request";
import { equipment } from "./equipment";

export const requestEquipment = pgTable(
  "request_equipment",
  {
    equipmentId: integer("equipment_id")
      .notNull()
      .references(() => equipment.id),
    requestId: integer("request_id")
      .notNull()
      .references(() => labRequests.id),
    omitted: boolean("omitted").default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => {
    return [
      {
        pk: primaryKey({ columns: [table.equipmentId, table.requestId] }),
        pkWithCustomName: primaryKey({
          name: "request_equipment_pk",
          columns: [table.equipmentId, table.requestId],
        }),
      },
    ];
  },
);

export type RequestEquipmentInsert = typeof requestEquipment.$inferInsert;
export type RequestEquipmentSelect = typeof requestEquipment.$inferSelect;
