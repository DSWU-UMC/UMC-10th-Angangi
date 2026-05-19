import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import * as S from "./LP.style";

import { getLPComments, getLPDetail, type SortType } from "../apis/lp";
import ErrorBox from "../components/lp/ErrorBox";
import defaultThumbnail from "../assets/앙.jpg";

interface LoginUser {
  id: number;
  name: string;
  accessToken: string;
  refreshToken: string;
}

export default function LPDetailPage() {
  const { lpId } = useParams<{ lpId: string }>();
  const [order, setOrder] = useState<SortType>("asc");
  const commentObserverRef = useRef<HTMLDivElement | null>(null);

  const user: LoginUser | null = JSON.parse(
    localStorage.getItem("user") ?? "null",
  );

  const {
    data: lp,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["lp", lpId],
    queryFn: () => getLPDetail(lpId as string),
    enabled: Boolean(lpId),
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
  });

  const {
    data: commentData,
    isLoading: isCommentLoading,
    isError: isCommentError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch: refetchComments,
  } = useInfiniteQuery({
    queryKey: ["lpComments", lpId, order],
    queryFn: ({ pageParam }) =>
      getLPComments({
        lpId: lpId as string,
        cursor: pageParam,
        sort: order,
        limit: 10,
      }),
    enabled: Boolean(lpId),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
  });

  const comments = commentData?.pages.flatMap((page) => page.data) ?? [];

  useEffect(() => {
    const target = commentObserverRef.current;
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

  if (isLoading) return <S.LoadingText>불러오는 중...</S.LoadingText>;
  if (isError || !lp) return <ErrorBox onRetry={refetch} />;

  return (
    <S.Wrapper>
      <S.Card>
        <S.HeaderRow>
          <S.AuthorArea>
            <S.Avatar>🌐</S.Avatar>
            <S.AuthorName>{user?.name ?? "알 수 없음"}</S.AuthorName>
          </S.AuthorArea>

          <S.DateText>
            {new Date(lp.createdAt).toLocaleDateString("ko-KR")}
          </S.DateText>
        </S.HeaderRow>

        <S.TitleRow>
          <S.Title>{lp.title}</S.Title>

          <S.IconArea>
            <S.IconButton type="button">✎</S.IconButton>
            <S.IconButton type="button">🗑</S.IconButton>
          </S.IconArea>
        </S.TitleRow>

        <S.ImageBox>
          <S.Thumbnail src={defaultThumbnail} alt={lp.title} />
          <S.CenterHole />
        </S.ImageBox>

        <S.Content>{lp.content}</S.Content>

        {lp.tags.length > 0 && (
          <S.TagArea>
            {lp.tags.map((tag) => (
              <S.Tag key={tag.id}># {tag.name}</S.Tag>
            ))}
          </S.TagArea>
        )}

        <S.LikeArea>
          <S.Heart>♥</S.Heart>
          <S.LikeCount>{lp.likes.length}</S.LikeCount>
        </S.LikeArea>

        <S.CommentSection>
          <S.CommentHeader>
            <S.CommentTitle>댓글</S.CommentTitle>

            <S.CommentSortArea>
              <S.CommentSortButton
                type="button"
                $isActive={order === "asc"}
                onClick={() => setOrder("asc")}
              >
                오래된순
              </S.CommentSortButton>

              <S.CommentSortButton
                type="button"
                $isActive={order === "desc"}
                onClick={() => setOrder("desc")}
              >
                최신순
              </S.CommentSortButton>
            </S.CommentSortArea>
          </S.CommentHeader>

          <S.CommentForm>
            <S.CommentInput placeholder="댓글을 입력해주세요." />
            <S.CommentSubmitButton type="button">작성</S.CommentSubmitButton>
          </S.CommentForm>

          {isCommentError ? (
            <ErrorBox onRetry={refetchComments} />
          ) : (
            <S.CommentList>
              {isCommentLoading &&
                Array.from({ length: 4 }).map((_, index) => (
                  <S.CommentSkeleton key={`comment-loading-${index}`} />
                ))}

              {!isCommentLoading &&
                comments.map((comment) => (
                  <S.CommentItem key={comment.id}>
                    <S.CommentMeta>
                      <S.CommentAuthor>익명 {comment.authorId}</S.CommentAuthor>
                      <S.CommentDate>
                        {new Date(comment.createdAt).toLocaleDateString(
                          "ko-KR",
                        )}
                      </S.CommentDate>
                    </S.CommentMeta>

                    <S.CommentContent>{comment.content}</S.CommentContent>
                  </S.CommentItem>
                ))}

              {isFetchingNextPage &&
                Array.from({ length: 2 }).map((_, index) => (
                  <S.CommentSkeleton key={`comment-next-${index}`} />
                ))}
            </S.CommentList>
          )}

          <div ref={commentObserverRef} />
        </S.CommentSection>
      </S.Card>
    </S.Wrapper>
  );
}
