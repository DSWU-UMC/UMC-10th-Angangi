import { useNavigate } from "react-router-dom";

import * as S from "./Common.style";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();

  const handleMove = (path: string) => {
    navigate(path);
    onClose();
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

        <S.WithdrawButton type="button">탈퇴하기</S.WithdrawButton>
      </S.Sidebar>
    </>
  );
}
