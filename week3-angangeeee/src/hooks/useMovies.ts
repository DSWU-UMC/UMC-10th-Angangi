import { useEffect, useState } from "react";
import type { Movie } from "../types/movie";

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=ko-KR&page=1`,
        );

        if (!res.ok) {
          throw new Error("API 요청 실패");
        }

        const data = await res.json();
        console.log("영화 데이터:", data);

        setMovies(data.results);
      } catch {
        setError("영화 데이터를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { movies, loading, error };
};
