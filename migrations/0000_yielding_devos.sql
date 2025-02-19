CREATE TABLE "favorites_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"movie_id" integer NOT NULL,
	"movie_name" text NOT NULL,
	"poster_url" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"age" integer NOT NULL,
	"email" text NOT NULL,
	CONSTRAINT "users_table_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "favorites_table" ADD CONSTRAINT "favorites_table_user_id_users_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "favorites_user_id_idx" ON "favorites_table" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "favorites_movie_id_idx" ON "favorites_table" USING btree ("movie_id");