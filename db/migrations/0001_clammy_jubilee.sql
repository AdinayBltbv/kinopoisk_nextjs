CREATE TABLE "favorites_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"movie_id" integer NOT NULL,
	"movie_name" text NOT NULL,
	"poster_url" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "favorites_table" ADD CONSTRAINT "favorites_table_user_id_users_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("id") ON DELETE no action ON UPDATE no action;