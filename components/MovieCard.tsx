"use client";

import { Movie } from "@/types/Movie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [favorites, setFavorites] = useState<Movie[]>([]); // Local state for favorites

  const handleClick = () => {
    router.push(`/details/${movie.filmId}`);
  };

  const addToFavorites = async (movie: Movie) => {
    if (!session?.user?.id) {
      alert("Войдите, чтобы добавлять фильмы в избранное!");
      return;
    }

    const isFavorite = favorites.some((fav) => fav.filmId === movie.filmId);
    if (isFavorite) {
      alert("Этот фильм уже в избранном!");
      return;
    }

    const updatedFavorites = [...favorites, movie];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    const response = await fetch("/api/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: session.user.id, // Safely access session user ID
        movieId: movie.filmId,
        movieName: movie.nameRu,
        posterUrl: movie.posterUrl,
      }),
    });

    if (response.ok) {
      console.log("Фильм добавлен в избранное!");
    } else {
      console.error("Ошибка при добавлении в избранное.");
    }
  };

  return (
    <div
      onClick={handleClick}
      className="border p-2 cursor-pointer transition hover:shadow-lg"
    >
      <div
        className="    width: 30%;
    height: 30%;
    overflow: hidden;
    object-fit: cover;"
      >
        <img
          src={movie.posterUrl}
          alt={movie.nameRu}
          className="width: 100%;
    height: 100%;"
        />
      </div>

      <p className="text-center mt-2">{movie.nameRu}</p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          addToFavorites(movie);
        }}
        className="mt-2 text-center text-white bg-blue-500 hover:bg-blue-600 p-1 rounded"
      >
        Добавить в избранное
      </button>
    </div>
  );
}
