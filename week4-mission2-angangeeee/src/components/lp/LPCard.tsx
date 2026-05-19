import { useNavigate } from "react-router-dom";

import * as S from "./LPComponent.style";

import type { LP } from "../../apis/lp";

interface LPCardProps {
  lp: LP;
}

export default function LPCard({ lp }: LPCardProps) {
  const navigate = useNavigate();
  const defaultThumbnail = "/src/assets/앙.jpg";

  const formattedDate = new Date(lp.createdAt).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const handleClick = () => {
    navigate(`/lp/${lp.id}`);
  };

  return (
    <S.CardButton type="button" onClick={handleClick}>
      <S.Thumbnail src={defaultThumbnail} alt={lp.title} />
      <S.Overlay>
        <S.Title>{lp.title}</S.Title>
        <S.DateText>{formattedDate}</S.DateText>
        <S.LikeText>♥ {lp.likes.length}</S.LikeText>
      </S.Overlay>
    </S.CardButton>
  );
}
