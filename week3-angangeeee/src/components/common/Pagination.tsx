interface PaginationProps {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

export const Pagination = ({
  page,
  totalPages,
  onPrev,
  onNext,
}: PaginationProps) => {
  return (
    <div className="mb-10 flex items-center justify-center gap-6">
      <button
        type="button"
        onClick={onPrev}
        disabled={page === 1}
        className={`h-14 w-14 rounded-xl text-2xl font-bold shadow ${
          page === 1
            ? "cursor-not-allowed bg-gray-300 text-white"
            : "bg-gray-200 text-white transition hover:opacity-80"
        }`}
      >
        {"<"}
      </button>

      <span className="text-xl font-semibold">{page}페이지</span>

      <button
        type="button"
        onClick={onNext}
        disabled={page === totalPages}
        className={`h-14 w-14 rounded-xl text-2xl font-bold shadow ${
          page === totalPages
            ? "cursor-not-allowed bg-gray-300 text-white"
            : "bg-purple-300 text-white transition hover:opacity-80"
        }`}
      >
        {">"}
      </button>
    </div>
  );
};
