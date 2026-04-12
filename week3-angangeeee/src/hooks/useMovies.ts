import { useMemo } from "react";
import { useCustomFetch } from "./useCustomFetch";
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
  const url = useMemo(() => {
    return `https://api.themoviedb.org/3/movie/${category}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=ko-KR&page=${page}`;
  }, [category, page]);

  const { data, isLoading, error } = useCustomFetch<MoviesResponse>(url);

  return {
    movies: data?.results ?? [],
    isLoading,
    error,
    totalPages: data ? Math.min(data.total_pages, 500) : 1,
  };
};
