import { db } from "@/db";
import { favoritesTable } from "@/db/schema";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { userId, movieId, movieName, posterUrl } = req.body;

    try {
      await db.insert(favoritesTable).values({
        userId,
        movieId,
        movieName,
        posterUrl,
      });
      res.status(200).json({ message: "Фильм добавлен в избранное!" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error adding to favorites:", error);
        res
          .status(500)
          .json({
            error: error.message || "Ошибка при добавлении в избранное.",
          });
      } else {
        console.error("Unexpected error:", error);
        res.status(500).json({ error: "Неизвестная ошибка." });
      }
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
