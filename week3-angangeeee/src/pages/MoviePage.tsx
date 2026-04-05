import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { Pagination } from "../components/common/Pagination";
import { MovieCard } from "../components/MovieCard";
import { useMovies, type MovieCategory } from "../hooks/useMovies";

const pageInfoMap: Record<string, { title: string; category: MovieCategory }> =
  {
    "/popular": { title: "인기 영화", category: "popular" },
    "/now-playing": { title: "상영 중", category: "now_playing" },
    "/top-rated": { title: "평점 높은 영화", category: "top_rated" },
    "/upcoming": { title: "개봉 예정 영화", category: "upcoming" },
  };

export const MoviePage = () => {
  const location = useLocation();
  const [page, setPage] = useState<number>(1);

  const currentPageInfo = useMemo(() => {
    return (
      pageInfoMap[location.pathname] ?? {
        title: "인기 영화",
        category: "popular" as MovieCategory,
      }
    );
  }, [location.pathname]);

  const { movies, isLoading, error, totalPages } = useMovies(
    currentPageInfo.category,
    page,
  );

  const handlePrev = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <section className="mx-auto max-w-7xl">
      <Pagination
        page={page}
        totalPages={totalPages}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      {isLoading && <LoadingSpinner />}

      {!isLoading && error && (
        <div className="flex min-h-[300px] items-center justify-center">
          <p className="rounded-xl bg-red-100 px-6 py-4 text-red-500 shadow">
            {error}
          </p>
        </div>
      )}

      {!isLoading && !error && (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  );
};
