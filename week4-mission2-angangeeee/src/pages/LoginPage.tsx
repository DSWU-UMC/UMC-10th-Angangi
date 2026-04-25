import { useState } from "react";
import * as S from "./Login.style";

import backButton from "../assets/arrow_back.svg";
import googleLogo from "../assets/image.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length >= 6;

  const showEmailError = email.length > 0 && !isEmailValid;
  const showPasswordError = password.length > 0 && !isPasswordValid;

  const isFormValid = isEmailValid && isPasswordValid;

  return (
    <S.Page>
      <S.Header>
        <S.Logo>돌려돌려LP판</S.Logo>

        <S.Nav>
          <S.NavButton variant="login">로그인</S.NavButton>
          <S.NavButton variant="signup">회원가입</S.NavButton>
        </S.Nav>
      </S.Header>

      <S.Main>
        <S.LoginBox>
          <S.TitleRow>
            <S.BackButton>
              <img src={backButton} alt="뒤로가기" />
            </S.BackButton>
            <S.Title>로그인</S.Title>
          </S.TitleRow>

          <S.GoogleButton>
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

          <S.SubmitButton disabled={!isFormValid}>로그인</S.SubmitButton>
        </S.LoginBox>
      </S.Main>
    </S.Page>
  );
}
