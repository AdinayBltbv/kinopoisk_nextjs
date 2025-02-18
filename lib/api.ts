export async function fetchMovies(query: string) {
  const res = await fetch(
    `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${query}`,
    {
      headers: {
        "X-API-KEY": process.env.NEXT_PUBLIC_KINOPOISK_API_KEY as string,
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  return res.json();
}

export async function fetchMovieDetails(id: string) {
  const res = await fetch(
    `https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`,
    {
      headers: {
        "X-API-KEY": process.env.NEXT_PUBLIC_KINOPOISK_API_KEY as string,
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch movie details");
  }

  return res.json();
}
