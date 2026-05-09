import { useNavigate } from "react-router-dom";

import * as S from "./Common.style";

interface HeaderProps {
  isLoggedIn: boolean;
  name: string;
  onToggleSidebar: () => void;
  onLogout: () => void;
}

export default function Header({
  isLoggedIn,
  name,
  onToggleSidebar,
  onLogout,
}: HeaderProps) {
  const navigate = useNavigate();

  return (
    <S.Header>
      <S.LeftArea>
        <S.MenuButton type="button" onClick={onToggleSidebar}>
          <svg
            width="28"
            height="28"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
              d="M7.95 11.95h32m-32 12h32m-32 12h32"
            />
          </svg>
        </S.MenuButton>

        <S.Logo onClick={() => navigate("/")}>돌려돌려LP판</S.Logo>
      </S.LeftArea>

      <S.Nav>
        {isLoggedIn ? (
          <>
            <S.WelcomeText>
              {name ? `${name}님 반갑습니다.` : "반갑습니다."}
            </S.WelcomeText>

            <S.NavButton type="button" $variant="login" onClick={onLogout}>
              로그아웃
            </S.NavButton>
          </>
        ) : (
          <>
            <S.NavButton
              type="button"
              $variant="login"
              onClick={() => navigate("/login")}
            >
              로그인
            </S.NavButton>

            <S.NavButton
              type="button"
              $variant="signup"
              onClick={() => navigate("/signup")}
            >
              회원가입
            </S.NavButton>
          </>
        )}
      </S.Nav>
    </S.Header>
  );
}
