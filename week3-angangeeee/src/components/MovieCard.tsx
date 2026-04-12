import { Link } from "react-router-dom";
import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://placehold.co/500x750?text=No+Image";

  return (
    <Link to={`/movie/${movie.id}`} className="block">
      <div className="group relative overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-xl">
        <img
          src={posterUrl}
          alt={movie.title}
          className="h-[360px] w-full object-cover transition duration-300 group-hover:blur-sm"
        />

        <div className="absolute inset-0 flex flex-col justify-center bg-black/50 p-4 text-white opacity-0 transition duration-300 group-hover:opacity-100">
          <h2 className="mb-2 text-center text-lg font-bold">{movie.title}</h2>
          <p className="text-center text-sm line-clamp-4">
            {movie.overview || "줄거리가 없습니다."}
          </p>
        </div>
      </div>
    </Link>
  );
};
