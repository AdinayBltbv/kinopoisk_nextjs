"use client";

import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

interface Movie {
  filmId: number;
  nameRu: string;
  posterUrl: string;
}

export default function Profile() {
  const { data: session } = useSession();
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(savedFavorites);
  }, []);

  const removeFromFavorites = (filmId: number) => {
    const updatedFavorites = favorites.filter((m) => m.filmId !== filmId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="container mx-auto p-4">
      {session ? (
        <>
          <h1 className="text-2xl font-bold">Личный кабинет</h1>
          <p>Вы вошли как {session.user?.name}</p>
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white p-2 rounded mt-4"
          >
            Выйти
          </button>
          <h2 className="text-xl font-bold mt-4">Избранное</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
            {favorites.map((movie) => (
              <div key={movie.filmId} className="border p-2">
                {/* <img
                  src={movie.posterUrl}
                  alt={movie.nameRu}
                  className="w-full h-60 object-cover"
                /> */}
                <p className="text-center mt-2">{movie.nameRu}</p>
                <button
                  onClick={() => removeFromFavorites(movie.filmId)}
                  className="bg-red-500 text-white p-2 rounded mt-2"
                >
                  Удалить из избранного
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <button
          onClick={() => signIn("google")}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Войти через Google
        </button>
      )}
    </div>
  );
}
