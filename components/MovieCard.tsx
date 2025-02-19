import { Movie } from "@/types/Movie";
import { useRouter } from "next/navigation";
import { useState, useEffect, JSX, useCallback } from "react";
import { useSession } from "next-auth/react";

interface MovieCardProps {
  movie: Movie;
}

interface CustomUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

const FavoriteButton = ({
  isFavorite,
  onClick,
}: {
  movieId: number;
  isFavorite: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => (
  <button
    onClick={onClick}
    className={`mt-2 text-center text-white p-1 rounded ${
      isFavorite ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
    }`}
    disabled={isFavorite}
  >
    {isFavorite ? "В избранном" : "Добавить в избранное"}
  </button>
);

export default function MovieCard({ movie }: MovieCardProps): JSX.Element {
  const router = useRouter();
  const { data: session } = useSession();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const checkIfFavorite = useCallback(async (): Promise<void> => {
    try {
      const response = await fetch(
        `/api/favorites/check?movieId=${movie.filmId}`
      );
      if (response.ok) {
        const data = await response.json();
        setIsFavorite(data.isFavorite);
      }
    } catch (error) {
      console.error("Ошибка при проверке избранного:", error);
    }
  }, [movie.filmId]);

  useEffect(() => {
    if ((session?.user as CustomUser)?.id) {
      checkIfFavorite();
    }
  }, [session, checkIfFavorite]);

  const addToFavorites = async (): Promise<void> => {
    const userId = (session?.user as CustomUser)?.id;
    if (!userId) {
      alert("Войдите, чтобы добавлять фильмы в избранное!");
      return;
    }

    try {
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          movieId: movie.filmId,
          movieName: movie.nameRu,
          posterUrl: movie.posterUrl,
        }),
      });

      if (response.ok) {
        setIsFavorite(true);
        console.log("Фильм добавлен в избранное!");
      } else {
        console.error("Ошибка при добавлении в избранное.");
      }
    } catch (error) {
      console.error("Ошибка при добавлении в избранное:", error);
    }
  };

  return (
    <div
      onClick={() => router.push(`/details/${movie.filmId}`)}
      className="border p-2 cursor-pointer transition hover:shadow-lg"
    >
      <p className="text-center mt-2">{movie.nameRu}</p>
      <FavoriteButton
        movieId={movie.filmId}
        isFavorite={isFavorite}
        onClick={(e) => {
          e.stopPropagation();
          addToFavorites();
        }}
      />
    </div>
  );
}
