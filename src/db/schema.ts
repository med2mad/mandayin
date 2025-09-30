import { integer, pgTable, varchar, decimal } from "drizzle-orm/pg-core";
export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    nameEN: varchar({ length: 255 }).notNull(),
    type: varchar({ length: 255 }).notNull(),
    descriptionEN: varchar({ length: 255 }),
    price: decimal(),
    promo: integer(),
    photo: varchar({ length: 255 }),
    nameFR: varchar({ length: 255 }),
    nameCH: varchar({ length: 255 }),
    descriptionFR: varchar({ length: 255 }),
    descriptionCH: varchar({ length: 255 }),
    order: integer()
});