import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <section className="mx-auto max-w-4xl rounded-2xl bg-white p-10 text-center shadow">
      <h1 className="mb-4 text-4xl font-bold text-gray-800">영화 둘러보기</h1>
      <p className="mb-8 text-lg text-gray-500">
        인기 영화, 상영 중인 영화, 평점 높은 영화, 개봉 예정 영화를
        확인해보세요.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <Link
          to="/popular"
          className="rounded-xl bg-purple-300 px-6 py-3 font-semibold text-white transition hover:opacity-80"
        >
          인기 영화 보기
        </Link>

        <Link
          to="/now-playing"
          className="rounded-xl bg-gray-800 px-6 py-3 font-semibold text-white transition hover:opacity-80"
        >
          상영 중 보기
        </Link>
      </div>
    </section>
  );
};
