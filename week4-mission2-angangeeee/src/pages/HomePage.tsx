import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";

import * as S from "./LP.style";

import { getLPList, type SortType } from "../apis/lp";
import LPCard from "../components/lp/LPCard";
import LPSkeleton from "../components/lp/LPSkeleton";
import ErrorBox from "../components/lp/ErrorBox";

export default function LPListPage() {
  const navigate = useNavigate();
  const [sort, setSort] = useState<SortType>("asc");
  const observerRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["lps", sort],
    queryFn: ({ pageParam }) =>
      getLPList({
        cursor: pageParam,
        sort,
        limit: 10,
      }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
  });

  const lps = data?.pages.flatMap((page) => page.data) ?? [];

  useEffect(() => {
    const target = observerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 0.5,
      },
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <S.Srapper>
      <S.SortArea>
        <S.SortButton
          type="button"
          $isActive={sort === "asc"}
          onClick={() => setSort("asc")}
        >
          오래된순
        </S.SortButton>

        <S.SortButton
          type="button"
          $isActive={sort === "desc"}
          onClick={() => setSort("desc")}
        >
          최신순
        </S.SortButton>
      </S.SortArea>

      {isError ? (
        <ErrorBox onRetry={refetch} />
      ) : (
        <S.Grid>
          {isLoading && <LPSkeleton count={10} />}

          {!isLoading && lps.map((lp) => <LPCard key={lp.id} lp={lp} />)}

          {isFetchingNextPage && <LPSkeleton count={4} />}
        </S.Grid>
      )}

      <div ref={observerRef} />

      <S.FloatingButton type="button" onClick={() => navigate("/lp/create")}>
        +
      </S.FloatingButton>
    </S.Srapper>
  );
}
