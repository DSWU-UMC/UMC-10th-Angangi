import { useEffect, useState } from "react";
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
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [crew, setCrew] = useState<CrewMember[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!movieId) {
      setError("올바르지 않은 영화 ID입니다.");
      setIsLoading(false);
      return;
    }

    const fetchMovieDetail = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [movieResponse, creditsResponse] = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=ko-KR`,
          ),
          fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=ko-KR`,
          ),
        ]);

        if (!movieResponse.ok || !creditsResponse.ok) {
          throw new Error("상세 정보 요청 실패");
        }

        const movieData: MovieDetail = await movieResponse.json();
        const creditsData: CreditsResponse = await creditsResponse.json();

        console.log("영화 상세 데이터:", movieData);
        console.log("크레딧 데이터:", creditsData);

        setMovie(movieData);
        setCast(creditsData.cast.slice(0, 20));
        setCrew(creditsData.crew);
      } catch {
        setError("영화 상세 정보를 불러오지 못했습니다.");
        setMovie(null);
        setCast([]);
        setCrew([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetail();
  }, [movieId]);

  return { movie, cast, crew, isLoading, error };
};
