import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Login.style";

import { login } from "../apis/auth";

import backButton from "../assets/arrow_back.svg";
import googleLogo from "../assets/image.png";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length >= 6;

  const showEmailError = email.length > 0 && !isEmailValid;
  const showPasswordError = password.length > 0 && !isPasswordValid;

  const isFormValid = isEmailValid && isPasswordValid;

  const handleLogin = async () => {
    if (!isFormValid) return;

    try {
      const res = await login(email, password);

      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);

      navigate("/home");
    } catch (error) {
      console.error(error);
      alert("로그인에 실패했습니다.");
    }
  };

  return (
    <S.Page>
      <S.Header>
        <S.Logo>돌려돌려LP판</S.Logo>

        <S.Nav>
          <S.NavButton type="button" variant="login">
            로그인
          </S.NavButton>

          <S.NavButton
            type="button"
            variant="signup"
            onClick={() => navigate("/signup")}
          >
            회원가입
          </S.NavButton>
        </S.Nav>
      </S.Header>

      <S.Main>
        <S.LoginBox>
          <S.TitleRow>
            <S.BackButton type="button">
              <img src={backButton} alt="뒤로가기" />
            </S.BackButton>
            <S.Title>로그인</S.Title>
          </S.TitleRow>

          <S.GoogleButton type="button">
            <S.GoogleIcon src={googleLogo} alt="Google Logo" />
            <p>구글 로그인</p>
          </S.GoogleButton>

          <S.Divider>
            <S.Line />
            <S.DividerText>OR</S.DividerText>
            <S.Line />
          </S.Divider>

          <S.FieldGroup>
            <S.Input
              type="email"
              placeholder="이메일을 입력해주세요!"
              value={email}
              $hasError={showEmailError}
              onChange={(e) => setEmail(e.target.value)}
            />
            {showEmailError && (
              <S.ErrorMessage>유효하지 않은 이메일 형식입니다.</S.ErrorMessage>
            )}
          </S.FieldGroup>

          <S.FieldGroup>
            <S.Input
              type="password"
              placeholder="비밀번호를 입력해주세요!"
              value={password}
              $hasError={showPasswordError}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPasswordError && (
              <S.ErrorMessage>
                비밀번호는 최소 6자 이상이어야 합니다.
              </S.ErrorMessage>
            )}
          </S.FieldGroup>

          <S.SubmitButton
            type="button"
            disabled={!isFormValid}
            onClick={handleLogin}
          >
            로그인
          </S.SubmitButton>
        </S.LoginBox>
      </S.Main>
    </S.Page>
  );
}
