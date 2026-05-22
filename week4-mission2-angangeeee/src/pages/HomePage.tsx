import { type MouseEvent, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import * as S from "./LP.style";

import { createLP, getLPList, type SortType } from "../apis/lp";
import LPCard from "../components/lp/LPCard";
import LPSkeleton from "../components/lp/LPSkeleton";
import ErrorBox from "../components/lp/ErrorBox";
import defaultThumbnail from "../assets/앙.jpg";
import useDebounce from "../hooks/useDebounce";
import useThrottle from "../hooks/useThrottle";

export default function LPListPage() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const [sort, setSort] = useState<SortType>("asc");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [shouldFetchNextPage, setShouldFetchNextPage] = useState(false);

  const [lpName, setLpName] = useState("");
  const [lpContent, setLpContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const debouncedSearch = useDebounce(search, 300);
  const trimmedSearch = debouncedSearch.trim();

  const throttledShouldFetchNextPage = useThrottle(shouldFetchNextPage, 1000);

  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["lps", sort, trimmedSearch],
    queryFn: ({ pageParam }) =>
      getLPList({
        cursor: pageParam,
        sort,
        limit: 10,
        search: trimmedSearch || undefined,
      }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
  });

  const createLPMutation = useMutation({
    mutationFn: createLP,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lps"],
      });

      closeModal();
    },
  });

  const lps = data?.pages.flatMap((page) => page.data) ?? [];

  const resetForm = () => {
    setLpName("");
    setLpContent("");
    setTagInput("");
    setTags([]);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleOverlayClick = () => {
    closeModal();
  };

  const handleModalClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleAddTag = () => {
    const nextTag = tagInput.trim();

    if (!nextTag) return;

    if (tags.includes(nextTag)) {
      setTagInput("");
      return;
    }

    setTags((prev) => [...prev, nextTag]);
    setTagInput("");
  };

  const handleRemoveTag = (targetTag: string) => {
    setTags((prev) => prev.filter((tag) => tag !== targetTag));
  };

  const handleSubmitLP = () => {
    if (!lpName.trim() || !lpContent.trim()) return;

    createLPMutation.mutate({
      title: lpName,
      content: lpContent,
      thumbnail: defaultThumbnail,
      tags,
      published: true,
    });
  };

  useEffect(() => {
    const focus = searchParams.get("focus");

    if (focus === "search") {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [searchParams]);

  useEffect(() => {
    const target = observerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShouldFetchNextPage(entry.isIntersecting);
      },
      {
        threshold: 0.1,
      },
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, []);

  useEffect(() => {
    if (
      throttledShouldFetchNextPage &&
      hasNextPage &&
      !isFetching &&
      !isFetchingNextPage
    ) {
      console.log("throttle 적용: 다음 LP 목록 요청");
      fetchNextPage();
    }
  }, [
    throttledShouldFetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
  ]);

  return (
    <S.Srapper>
      <div
        style={{
          width: "100%",
          marginBottom: "20px",
        }}
      >
        <input
          ref={searchInputRef}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="찾고 싶은 LP를 검색해보세요"
          style={{
            width: "100%",
            height: "44px",
            padding: "0 14px",
            borderRadius: "8px",
            border: "1px solid #555",
            backgroundColor: "#111",
            color: "#fff",
            fontSize: "14px",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>

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

      <div ref={observerRef} style={{ height: "20px" }} />

      <S.FloatingButton type="button" onClick={openModal}>
        +
      </S.FloatingButton>

      {isModalOpen && (
        <S.LPModalOverlay onClick={handleOverlayClick}>
          <S.LPModalBox onClick={handleModalClick}>
            <S.CloseButton type="button" onClick={closeModal}>
              ×
            </S.CloseButton>

            <S.ModalThumbnailLabel>
              <S.ModalThumbnail src={defaultThumbnail} alt="LP 기본 이미지" />
            </S.ModalThumbnailLabel>

            <S.ModalInput
              value={lpName}
              onChange={(event) => setLpName(event.target.value)}
              placeholder="LP Name"
            />

            <S.ModalInput
              value={lpContent}
              onChange={(event) => setLpContent(event.target.value)}
              placeholder="LP Content"
            />

            <S.TagInputRow>
              <S.ModalInput
                value={tagInput}
                onChange={(event) => setTagInput(event.target.value)}
                placeholder="LP Tag"
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    handleAddTag();
                  }
                }}
              />

              <S.TagAddButton type="button" onClick={handleAddTag}>
                Add
              </S.TagAddButton>
            </S.TagInputRow>

            {tags.length > 0 && (
              <S.TagPreviewArea>
                {tags.map((tag) => (
                  <S.TagPreview key={tag}>
                    #{tag}
                    <S.TagRemoveButton
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      ×
                    </S.TagRemoveButton>
                  </S.TagPreview>
                ))}
              </S.TagPreviewArea>
            )}

            <S.AddLPButton
              type="button"
              disabled={
                !lpName.trim() ||
                !lpContent.trim() ||
                createLPMutation.isPending
              }
              onClick={handleSubmitLP}
            >
              {createLPMutation.isPending ? "Adding..." : "Add LP"}
            </S.AddLPButton>
          </S.LPModalBox>
        </S.LPModalOverlay>
      )}
    </S.Srapper>
  );
}
