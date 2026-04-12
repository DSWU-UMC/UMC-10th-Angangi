import { useMemo } from "react";
import { useCustomFetch } from "./useCustomFetch";
import type {
  CastMember,
  CreditsResponse,
  CrewMember,
  MovieDetail,
} from "../types/movie";

interface UseMovieDetailResult {
  movie: MovieDetail | null;
  cast: CastMember[];
  crew: CrewMember[];
  isLoading: boolean;
  error: string | null;
}

export const useMovieDetail = (
  movieId: string | undefined,
): UseMovieDetailResult => {
  const movieUrl = useMemo(() => {
    if (!movieId) return null;

    return `https://api.themoviedb.org/3/movie/${movieId}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=ko-KR`;
  }, [movieId]);

  const creditsUrl = useMemo(() => {
    if (!movieId) return null;

    return `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=ko-KR`;
  }, [movieId]);

  const {
    data: movieData,
    isLoading: isMovieLoading,
    error: movieError,
  } = useCustomFetch<MovieDetail>(movieUrl);

  const {
    data: creditsData,
    isLoading: isCreditsLoading,
    error: creditsError,
  } = useCustomFetch<CreditsResponse>(creditsUrl);

  return {
    movie: movieData,
    cast: creditsData?.cast.slice(0, 20) ?? [],
    crew: creditsData?.crew ?? [],
    isLoading: isMovieLoading || isCreditsLoading,
    error: movieError || creditsError,
  };
};
