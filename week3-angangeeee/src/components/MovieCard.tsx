import type { Movie } from "../types/movie";

interface Props {
  movie: Movie;
}

export const MovieCard = ({ movie }: Props) => {
  const imgUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-md group">
      <img
        src={imgUrl}
        alt={movie.title}
        className="w-full h-[420px] object-cover transition duration-300 group-hover:blur-sm"
      />

      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-center items-center text-white p-4">
        <h2 className="text-lg font-bold mb-2 text-center">{movie.title}</h2>
        <p className="text-sm text-center line-clamp-4">
          {movie.overview || "줄거리가 없습니다."}
        </p>
      </div>
    </div>
  );
};
