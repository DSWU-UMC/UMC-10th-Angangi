import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import * as S from "./LP.style";

import {
  createLPComment,
  deleteLP,
  deleteLPComment,
  getLPComments,
  getLPDetail,
  updateLP,
  updateLPComment,
  type SortType,
} from "../apis/lp";
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
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [order, setOrder] = useState<SortType>("asc");
  const [commentContent, setCommentContent] = useState("");

  const [openedMenuId, setOpenedMenuId] = useState<number | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState("");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editTagInput, setEditTagInput] = useState("");
  const [editTags, setEditTags] = useState<string[]>([]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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
    isFetching,
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

  const invalidateComments = () => {
    queryClient.invalidateQueries({
      queryKey: ["lpComments", lpId, order],
    });
  };

  const createCommentMutation = useMutation({
    mutationFn: createLPComment,
    onSuccess: () => {
      invalidateComments();
      setCommentContent("");
    },
  });

  const updateCommentMutation = useMutation({
    mutationFn: updateLPComment,
    onSuccess: () => {
      invalidateComments();
      setEditingCommentId(null);
      setEditingContent("");
      setOpenedMenuId(null);
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: deleteLPComment,
    onSuccess: () => {
      invalidateComments();
      setOpenedMenuId(null);
    },
  });

  const updateLPMutation = useMutation({
    mutationFn: updateLP,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lp", lpId],
      });

      queryClient.invalidateQueries({
        queryKey: ["lps"],
      });

      setIsEditModalOpen(false);
    },
  });

  const deleteLPMutation = useMutation({
    mutationFn: deleteLP,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lps"],
      });

      navigate("/");
    },
  });

  const comments = commentData?.pages.flatMap((page) => page.data) ?? [];

  const openEditModal = () => {
    if (!lp) return;

    setEditTitle(lp.title);
    setEditContent(lp.content);
    setEditTags(lp.tags.map((tag) => tag.name));
    setEditTagInput("");
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditTitle("");
    setEditContent("");
    setEditTags([]);
    setEditTagInput("");
  };

  const handleAddEditTag = () => {
    const nextTag = editTagInput.trim();

    if (!nextTag) return;
    if (editTags.includes(nextTag)) {
      setEditTagInput("");
      return;
    }

    setEditTags((prev) => [...prev, nextTag]);
    setEditTagInput("");
  };

  const handleRemoveEditTag = (targetTag: string) => {
    setEditTags((prev) => prev.filter((tag) => tag !== targetTag));
  };

  const handleSubmitLPUpdate = () => {
    if (!lpId) return;
    if (!editTitle.trim() || !editContent.trim()) return;

    updateLPMutation.mutate({
      lpId,
      title: editTitle,
      content: editContent,
      thumbnail: defaultThumbnail,
      tags: editTags,
      published: true,
    });
  };

  const handleDeleteLP = () => {
    if (!lpId) return;

    deleteLPMutation.mutate({
      lpId,
    });
  };

  const handleSubmitComment = () => {
    if (!lpId) return;
    if (!commentContent.trim()) return;

    createCommentMutation.mutate({
      lpId,
      content: commentContent,
    });
  };

  const handleStartEdit = (commentId: number, content: string) => {
    setEditingCommentId(commentId);
    setEditingContent(content);
    setOpenedMenuId(null);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditingContent("");
  };

  const handleSubmitEdit = (commentId: number) => {
    if (!lpId) return;
    if (!editingContent.trim()) return;

    updateCommentMutation.mutate({
      lpId,
      commentId,
      content: editingContent,
    });
  };

  const handleDeleteComment = (commentId: number) => {
    if (!lpId) return;

    deleteCommentMutation.mutate({
      lpId,
      commentId,
    });
  };

  useEffect(() => {
    const target = commentObserverRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          hasNextPage &&
          !isFetching &&
          !isFetchingNextPage
        ) {
          fetchNextPage();
        }
      },
      {
        threshold: 0.1,
      },
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [fetchNextPage, hasNextPage, isFetching, isFetchingNextPage]);

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
            <S.IconButton type="button" onClick={openEditModal}>
              ✎
            </S.IconButton>

            <S.IconButton
              type="button"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              🗑
            </S.IconButton>
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
            <S.CommentInput
              value={commentContent}
              onChange={(event) => setCommentContent(event.target.value)}
              placeholder="댓글을 입력해주세요."
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSubmitComment();
                }
              }}
            />

            <S.CommentSubmitButton
              type="button"
              disabled={
                !commentContent.trim() || createCommentMutation.isPending
              }
              onClick={handleSubmitComment}
            >
              {createCommentMutation.isPending ? "작성 중" : "작성"}
            </S.CommentSubmitButton>
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
                comments.map((comment) => {
                  const isMine = user?.id === comment.authorId;
                  const isEditing = editingCommentId === comment.id;

                  return (
                    <S.CommentItem key={comment.id}>
                      <S.CommentMeta>
                        <S.CommentAuthor>
                          익명 {comment.authorId}
                        </S.CommentAuthor>

                        <S.CommentRightArea>
                          <S.CommentDate>
                            {new Date(comment.createdAt).toLocaleDateString(
                              "ko-KR",
                            )}
                          </S.CommentDate>

                          {isMine && (
                            <S.CommentMenuWrapper>
                              <S.CommentMenuButton
                                type="button"
                                onClick={() =>
                                  setOpenedMenuId((prev) =>
                                    prev === comment.id ? null : comment.id,
                                  )
                                }
                              >
                                …
                              </S.CommentMenuButton>

                              {openedMenuId === comment.id && (
                                <S.CommentMenuBox>
                                  <S.CommentMenuItem
                                    type="button"
                                    onClick={() =>
                                      handleStartEdit(
                                        comment.id,
                                        comment.content,
                                      )
                                    }
                                  >
                                    수정
                                  </S.CommentMenuItem>

                                  <S.CommentMenuItem
                                    type="button"
                                    onClick={() =>
                                      handleDeleteComment(comment.id)
                                    }
                                  >
                                    삭제
                                  </S.CommentMenuItem>
                                </S.CommentMenuBox>
                              )}
                            </S.CommentMenuWrapper>
                          )}
                        </S.CommentRightArea>
                      </S.CommentMeta>

                      {isEditing ? (
                        <S.CommentEditArea>
                          <S.CommentEditInput
                            value={editingContent}
                            onChange={(event) =>
                              setEditingContent(event.target.value)
                            }
                          />

                          <S.CommentEditButtonRow>
                            <S.CommentCancelButton
                              type="button"
                              onClick={handleCancelEdit}
                            >
                              취소
                            </S.CommentCancelButton>

                            <S.CommentSaveButton
                              type="button"
                              disabled={
                                !editingContent.trim() ||
                                updateCommentMutation.isPending
                              }
                              onClick={() => handleSubmitEdit(comment.id)}
                            >
                              {updateCommentMutation.isPending
                                ? "수정 중"
                                : "저장"}
                            </S.CommentSaveButton>
                          </S.CommentEditButtonRow>
                        </S.CommentEditArea>
                      ) : (
                        <S.CommentContent>{comment.content}</S.CommentContent>
                      )}
                    </S.CommentItem>
                  );
                })}

              {isFetchingNextPage &&
                Array.from({ length: 2 }).map((_, index) => (
                  <S.CommentSkeleton key={`comment-next-${index}`} />
                ))}
            </S.CommentList>
          )}

          <div ref={commentObserverRef} />
        </S.CommentSection>
      </S.Card>

      {isEditModalOpen && (
        <S.LPModalOverlay onClick={closeEditModal}>
          <S.LPModalBox onClick={(event) => event.stopPropagation()}>
            <S.CloseButton type="button" onClick={closeEditModal}>
              ×
            </S.CloseButton>

            <S.ModalThumbnailLabel>
              <S.ModalThumbnail src={defaultThumbnail} alt="LP 기본 이미지" />
            </S.ModalThumbnailLabel>

            <S.ModalInput
              value={editTitle}
              onChange={(event) => setEditTitle(event.target.value)}
              placeholder="LP Name"
            />

            <S.ModalInput
              value={editContent}
              onChange={(event) => setEditContent(event.target.value)}
              placeholder="LP Content"
            />

            <S.TagInputRow>
              <S.ModalInput
                value={editTagInput}
                onChange={(event) => setEditTagInput(event.target.value)}
                placeholder="LP Tag"
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    handleAddEditTag();
                  }
                }}
              />

              <S.TagAddButton type="button" onClick={handleAddEditTag}>
                Add
              </S.TagAddButton>
            </S.TagInputRow>

            {editTags.length > 0 && (
              <S.TagPreviewArea>
                {editTags.map((tag) => (
                  <S.TagPreview key={tag}>
                    #{tag}
                    <S.TagRemoveButton
                      type="button"
                      onClick={() => handleRemoveEditTag(tag)}
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
                !editTitle.trim() ||
                !editContent.trim() ||
                updateLPMutation.isPending
              }
              onClick={handleSubmitLPUpdate}
            >
              {updateLPMutation.isPending ? "Saving..." : "Save LP"}
            </S.AddLPButton>
          </S.LPModalBox>
        </S.LPModalOverlay>
      )}

      {isDeleteModalOpen && (
        <S.LPModalOverlay onClick={() => setIsDeleteModalOpen(false)}>
          <S.DeleteModalBox onClick={(event) => event.stopPropagation()}>
            <S.DeleteModalTitle>LP를 삭제할까요?</S.DeleteModalTitle>
            <S.DeleteModalDescription>
              삭제한 LP는 다시 복구할 수 없습니다.
            </S.DeleteModalDescription>

            <S.DeleteModalButtonRow>
              <S.DeleteCancelButton
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                취소
              </S.DeleteCancelButton>

              <S.DeleteConfirmButton
                type="button"
                disabled={deleteLPMutation.isPending}
                onClick={handleDeleteLP}
              >
                {deleteLPMutation.isPending ? "삭제 중" : "삭제"}
              </S.DeleteConfirmButton>
            </S.DeleteModalButtonRow>
          </S.DeleteModalBox>
        </S.LPModalOverlay>
      )}
    </S.Wrapper>
  );
}
