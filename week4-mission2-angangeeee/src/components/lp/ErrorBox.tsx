import * as S from "./LPComponent.style";

interface ErrorBoxProps {
  message?: string;
  onRetry: () => void;
}

export default function ErrorBox({
  message = "데이터를 불러오지 못했습니다.",
  onRetry,
}: ErrorBoxProps) {
  return (
    <S.Wrapper>
      <S.Message>{message}</S.Message>
      <S.RetryButton type="button" onClick={onRetry}>
        다시 시도
      </S.RetryButton>
    </S.Wrapper>
  );
}
