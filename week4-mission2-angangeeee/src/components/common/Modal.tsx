import * as S from "./Common.style";

interface ModalProps {
  title: string;
  description: string;
  confirmText?: string;
  onConfirm: () => void;
}

export default function Modal({
  title,
  description,
  confirmText = "확인",
  onConfirm,
}: ModalProps) {
  return (
    <S.Overlay>
      <S.ModalBox>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
        <S.ConfirmButton type="button" onClick={onConfirm}>
          {confirmText}
        </S.ConfirmButton>
      </S.ModalBox>
    </S.Overlay>
  );
}
