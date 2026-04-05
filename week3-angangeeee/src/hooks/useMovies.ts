import { useEffect, useState } from "react";
import type { Movie, MoviesResponse } from "../types/movie";

export type MovieCategory =
  | "popular"
  | "now_playing"
  | "top_rated"
  | "upcoming";

interface UseMoviesResult {
  movies: Movie[];
  isLoading: boolean;
  error: string | null;
  totalPages: number;
}

export const useMovies = (
  category: MovieCategory,
  page: number,
): UseMoviesResult => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${category}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=ko-KR&page=${page}`,
        );

        if (!response.ok) {
          throw new Error("API 요청 실패");
        }

        const data: MoviesResponse = await response.json();

        console.log("영화 데이터:", data);

        setMovies(data.results);
        setTotalPages(Math.min(data.total_pages, 500));
      } catch {
        setError("영화 데이터를 불러오지 못했습니다.");
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [category, page]);

  return { movies, isLoading, error, totalPages };
};
