ALTER TABLE "users" RENAME COLUMN "name" TO "nameEN";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "email" TO "type";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "age" TO "promo";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "descriptionEN" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "price" numeric;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "nameFR" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "nameCH" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "descriptionFR" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "descriptionCH" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "order" integer;