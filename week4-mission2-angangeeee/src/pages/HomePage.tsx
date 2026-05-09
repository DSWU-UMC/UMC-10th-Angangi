import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import * as S from "./LP.style";

import { getLPList, type SortType } from "../apis/lp";
import LPCard from "../components/lp/LPCard";
import LPSkeleton from "../components/lp/LPSkeleton";
import ErrorBox from "../components/lp/ErrorBox";

export default function LPListPage() {
  const navigate = useNavigate();
  const [sort, setSort] = useState<SortType>("asc");

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["lps", sort],
    queryFn: () => getLPList(sort),
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
  });

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
          {isLoading ? (
            <LPSkeleton />
          ) : (
            data?.data.map((lp) => <LPCard key={lp.id} lp={lp} />)
          )}
        </S.Grid>
      )}

      <S.FloatingButton type="button" onClick={() => navigate("/lp/create")}>
        +
      </S.FloatingButton>
    </S.Srapper>
  );
}
