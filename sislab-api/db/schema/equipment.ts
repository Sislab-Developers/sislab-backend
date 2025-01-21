import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const equipment = pgTable("equipment", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  }).defaultNow(),
});

export type EquipmentInsert = typeof equipment.$inferInsert;
export type EquipmentSelect = typeof equipment.$inferSelect;
