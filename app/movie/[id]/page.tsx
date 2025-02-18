import Image from "next/image";
import { fetchMovieDetails } from "@/lib/api";

export default async function MoviePage({
  params,
}: {
  params: { id: string };
}) {
  const movie = await fetchMovieDetails(params.id);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{movie.nameRu}</h1>
      <Image
        src={movie.posterUrl}
        alt={movie.nameRu}
        width={240}
        height={360}
        className="w-60 h-90"
      />
      <p className="mt-4">{movie.description}</p>
      <p className="mt-2">
        <strong>Год выпуска:</strong> {movie.year}
      </p>
    </div>
  );
}
