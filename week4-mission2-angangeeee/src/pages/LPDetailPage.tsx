import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import * as S from "./LP.style";

import { getLPDetail } from "../apis/lp";
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
      </S.Card>
    </S.Wrapper>
  );
}
