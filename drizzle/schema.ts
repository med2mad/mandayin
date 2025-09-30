import { pgTable, integer, varchar, numeric } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const users = pgTable("users", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "users_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	nameEn: varchar({ length: 255 }).notNull(),
	type: varchar({ length: 255 }).notNull(),
	descriptionEn: varchar({ length: 255 }),
	price: numeric(),
	promo: integer(),
	photo: varchar({ length: 255 }),
	nameFr: varchar({ length: 255 }),
	nameCh: varchar({ length: 255 }),
	descriptionFr: varchar({ length: 255 }),
	descriptionCh: varchar({ length: 255 }),
	order: integer(),
});
