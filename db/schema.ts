import { index } from "drizzle-orm/pg-core";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users_table", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  age: integer("age").notNull(),
  email: text("email").notNull().unique(),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export const favoritesTable = pgTable(
  "favorites_table",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => usersTable.id),
    movieId: integer("movie_id").notNull(),
    movieName: text("movie_name").notNull(),
    posterUrl: text("poster_url").notNull(),
  },
  (table) => {
    return {
      userIdIdx: index("favorites_user_id_idx").on(table.userId),
      movieIdIdx: index("favorites_movie_id_idx").on(table.movieId),
    };
  }
);

export type InsertFavorite = typeof favoritesTable.$inferInsert;
export type SelectFavorite = typeof favoritesTable.$inferSelect;
