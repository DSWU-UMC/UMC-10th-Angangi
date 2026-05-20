import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import * as S from "./Common.style";
import { deleteUser } from "../../apis/auth";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  const withdrawMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      localStorage.removeItem("user");
      setIsWithdrawModalOpen(false);
      onClose();
      navigate("/login");
    },
  });

  const handleMove = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleOpenWithdrawModal = () => {
    setIsWithdrawModalOpen(true);
  };

  const handleCloseWithdrawModal = () => {
    setIsWithdrawModalOpen(false);
  };

  const handleConfirmWithdraw = () => {
    withdrawMutation.mutate();
  };

  return (
    <>
      <S.SidebarOverlay $isOpen={isOpen} onClick={onClose} />

      <S.Sidebar $isOpen={isOpen}>
        <S.SidebarMenu>
          <S.SidebarItem type="button" onClick={() => handleMove("/home")}>
            찾기
          </S.SidebarItem>

          <S.SidebarItem type="button" onClick={() => handleMove("/mypage")}>
            마이페이지
          </S.SidebarItem>
        </S.SidebarMenu>

        <S.WithdrawButton type="button" onClick={handleOpenWithdrawModal}>
          탈퇴하기
        </S.WithdrawButton>
      </S.Sidebar>

      {isWithdrawModalOpen && (
        <S.Overlay onClick={handleCloseWithdrawModal}>
          <S.WithdrawModalBox onClick={(event) => event.stopPropagation()}>
            <S.WithdrawTitle>정말 탈퇴하시겠습니까?</S.WithdrawTitle>

            <S.WithdrawDescription>
              탈퇴하면 계정 정보가 삭제되며 다시 복구할 수 없습니다.
            </S.WithdrawDescription>

            <S.WithdrawButtonRow>
              <S.WithdrawCancelButton
                type="button"
                onClick={handleCloseWithdrawModal}
              >
                아니요
              </S.WithdrawCancelButton>

              <S.WithdrawConfirmButton
                type="button"
                disabled={withdrawMutation.isPending}
                onClick={handleConfirmWithdraw}
              >
                {withdrawMutation.isPending ? "탈퇴 중" : "예"}
              </S.WithdrawConfirmButton>
            </S.WithdrawButtonRow>
          </S.WithdrawModalBox>
        </S.Overlay>
      )}
    </>
  );
}
