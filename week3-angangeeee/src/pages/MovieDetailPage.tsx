import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { useMovieDetail } from "../hooks/useMovieDetail";

interface DisplayPerson {
  id: number;
  name: string;
  role: string;
  profile_path: string | null;
}

export const MovieDetailPage = () => {
  const { movieId } = useParams();
  const { movie, cast, crew, isLoading, error } = useMovieDetail(movieId);

  const director = useMemo(() => {
    return crew.find((member) => member.job === "Director");
  }, [crew]);

  const displayPeople = useMemo<DisplayPerson[]>(() => {
    const directorItem: DisplayPerson[] = director
      ? [
          {
            id: director.id,
            name: director.name,
            role: "감독",
            profile_path: director.profile_path,
          },
        ]
      : [];

    const castItems: DisplayPerson[] = cast.map((member) => ({
      id: member.id,
      name: member.name,
      role: member.character || "출연",
      profile_path: member.profile_path,
    }));

    return [...directorItem, ...castItems].slice(0, 20);
  }, [cast, director]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !movie) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="rounded-xl bg-red-100 px-6 py-4 text-red-500 shadow">
          {error || "영화 정보를 찾을 수 없습니다."}
        </p>
      </div>
    );
  }

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "";
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://placehold.co/500x750?text=No+Image";

  const year = movie.release_date ? movie.release_date.slice(0, 4) : "미정";
  const runtimeText = movie.runtime
    ? `${movie.runtime}분`
    : "상영시간 정보 없음";

  return (
    <section className="min-h-screen bg-black text-white">
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{
          backgroundImage: backdropUrl
            ? `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.85)), url(${backdropUrl})`
            : "linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.9))",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 md:flex-row md:items-start">
          <img
            src={posterUrl}
            alt={movie.title}
            className="w-full max-w-[280px] rounded-2xl object-cover shadow-2xl"
          />

          <div className="max-w-3xl">
            <h1 className="mb-3 text-4xl font-bold">{movie.title}</h1>

            <div className="mb-4 space-y-1 text-lg text-gray-200">
              <p>평점 {movie.vote_average.toFixed(1)}</p>
              <p>{year}</p>
              <p>{runtimeText}</p>
            </div>

            {movie.tagline && (
              <p className="mb-6 text-3xl font-semibold italic text-white">
                {movie.tagline}
              </p>
            )}

            <p className="mb-4 text-base leading-7 text-gray-200">
              {movie.overview || "줄거리 정보가 없습니다."}
            </p>

            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="rounded-full bg-white/15 px-4 py-2 text-sm text-white"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <h2 className="mb-8 text-4xl font-bold">감독/출연</h2>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
          {displayPeople.map((person) => {
            const profileUrl = person.profile_path
              ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
              : "https://placehold.co/185x185?text=No+Image";

            return (
              <div key={`${person.role}-${person.id}`} className="text-center">
                <img
                  src={profileUrl}
                  alt={person.name}
                  className="mx-auto mb-3 h-28 w-28 rounded-full border-2 border-gray-300 object-cover"
                />
                <p className="font-semibold">{person.name}</p>
                <p className="text-sm text-gray-300">{person.role}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
