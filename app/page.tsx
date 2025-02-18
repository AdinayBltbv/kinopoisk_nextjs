"use client";

import { useState } from "react";
import { fetchMovies } from "@/lib/api";
import { signIn, signOut, useSession } from "next-auth/react";
import MovieCard from "@/components/MovieCard";
import { useRouter } from "next/router";

interface Movie {
  filmId: number;
  nameRu: string;
  posterUrl: string;
}

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const { data: session } = useSession();
  const router = useRouter();

  const handleSearch = async () => {
    const data = await fetchMovies(query);
    setMovies(data.films || []);
  };

  const goToProfile = () => {
    router.push("/profile");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Поиск фильмов</h1>
        {session ? (
          <div>
            <button
              onClick={goToProfile}
              className="bg-green-500 text-white p-2 rounded"
            >
              Личный кабинет
            </button>
            <button
              onClick={() => signOut()}
              className="bg-red-500 text-white p-2 rounded ml-2"
            >
              Выйти ({session.user?.name})
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Войти через Google
          </button>
        )}
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border p-2 w-full"
          placeholder="Введите название фильма..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Искать
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.filmId} movie={movie} />
        ))}
      </div>
    </div>
  );
}
