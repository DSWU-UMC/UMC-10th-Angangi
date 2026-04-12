import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <section className="mx-auto max-w-2xl rounded-2xl bg-white p-10 text-center shadow">
      <h1 className="mb-4 text-4xl font-bold text-gray-800">404</h1>
      <p className="mb-6 text-gray-500">페이지를 찾을 수 없습니다.</p>
      <Link
        to="/"
        className="rounded-xl bg-purple-300 px-6 py-3 font-semibold text-white transition hover:opacity-80"
      >
        홈으로 돌아가기
      </Link>
    </section>
  );
};
