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
    <div className="container mx-auto p-6 max-w-4xl bg-blue-50 shadow-xl rounded-2xl border border-blue-100">
      {session ? (
        <>
          <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">
            Личный кабинет
          </h1>
          <div className="text-center">
            <p className="text-lg text-blue-700">
              Вы вошли как{" "}
              <span className="font-semibold">{session.user?.name}</span>
            </p>
            <button
              onClick={() => signOut()}
              className="bg-blue-500 text-white px-6 py-2 rounded-xl mt-4 hover:bg-blue-600 transition-all shadow-md"
            >
              Выйти
            </button>
          </div>

          <h2 className="text-2xl font-semibold mt-8 text-blue-700">
            Избранное
          </h2>
          {favorites.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
              {favorites.map((movie) => (
                <div
                  key={movie.filmId}
                  className="border rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all bg-white"
                >
                  {/* <img
                    src={movie.posterUrl}
                    alt={movie.nameRu}
                    className="w-full h-60 object-cover"
                  /> */}
                  <div className="p-4">
                    <p className="text-center font-medium text-lg text-blue-800">
                      {movie.nameRu}
                    </p>
                    <button
                      onClick={() => removeFromFavorites(movie.filmId)}
                      className="bg-red-500 text-white px-4 py-2 rounded-xl mt-4 w-full hover:bg-red-600 transition-all shadow-sm"
                    >
                      Удалить из избранного
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-4">
              Нет избранных фильмов.
            </p>
          )}
        </>
      ) : (
        <div className="text-center">
          <button
            onClick={() => signIn("google")}
            className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600 transition-all shadow-md"
          >
            Войти через Google
          </button>
        </div>
      )}
    </div>
  );
}
