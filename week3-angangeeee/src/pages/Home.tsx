import { useMovies } from "../hooks/useMovies";
import { MovieCard } from "../components/MovieCard";
import type { Movie } from "../types/movie";

export const Home = () => {
  const { movies, loading, error } = useMovies();

  if (loading) {
    return <p className="text-center mt-10 text-lg">로딩 중...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">인기 영화</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {movies.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};
