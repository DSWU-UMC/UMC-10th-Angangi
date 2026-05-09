import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import * as S from "./Signup.style";

import backButton from "../assets/arrow_back.svg";
import googleLogo from "../assets/image.png";

const emailSchema = z.object({
  email: z.string().email("올바른 이메일 형식을 입력해주세요."),
});

const passwordSchema = z
  .object({
    password: z.string().min(6, "비밀번호는 6자 이상이어야 합니다."),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "비밀번호가 일치하지 않습니다.",
  });

const nameSchema = z.object({
  name: z.string().min(1, "닉네임을 입력해주세요."),
});

type EmailForm = z.infer<typeof emailSchema>;
type PasswordForm = z.infer<typeof passwordSchema>;
type nameForm = z.infer<typeof nameSchema>;

type Step = "email" | "password" | "name";

export default function SignupPage() {
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>("email");
  const [savedEmail, setSavedEmail] = useState("");
  const [savedPassword, setSavedPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const emailForm = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const passwordForm = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });

  const nameForm = useForm<nameForm>({
    resolver: zodResolver(nameSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  const handleEmailNext = (data: EmailForm) => {
    setSavedEmail(data.email);
    setStep("password");
  };

  const handlePasswordNext = (data: PasswordForm) => {
    setSavedPassword(data.password);
    setStep("name");
  };

  const handleSignupComplete = (data: nameForm) => {
    console.log("회원가입 데이터", {
      email: savedEmail,
      password: savedPassword,
      name: data.name,
    });

    alert("회원가입 완료!");
    navigate("/");
  };

  const handleBack = () => {
    if (step === "name") {
      setStep("password");
      return;
    }

    if (step === "password") {
      setStep("email");
      return;
    }

    window.history.back();
  };

  return (
    <S.Page>
      <S.Header>
        <S.Logo>돌려돌려LP판</S.Logo>

        <S.Nav>
          <S.NavButton type="button" variant="login">
            로그인
          </S.NavButton>
          <S.NavButton type="button" variant="signup">
            회원가입
          </S.NavButton>
        </S.Nav>
      </S.Header>

      <S.Main>
        <S.SignupBox>
          <S.TitleRow>
            <S.BackButton type="button" onClick={handleBack}>
              <img src={backButton} alt="뒤로가기" />
            </S.BackButton>
            <S.Title>회원가입</S.Title>
          </S.TitleRow>

          {step === "email" && (
            <S.Form onSubmit={emailForm.handleSubmit(handleEmailNext)}>
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
                  placeholder="이메일을 입력해주세요!"
                  $hasError={!!emailForm.formState.errors.email}
                  {...emailForm.register("email")}
                />
                {emailForm.formState.errors.email && (
                  <S.ErrorMessage>
                    {emailForm.formState.errors.email.message}
                  </S.ErrorMessage>
                )}
              </S.FieldGroup>

              <S.SubmitButton
                type="submit"
                disabled={!emailForm.formState.isValid}
              >
                다음
              </S.SubmitButton>
            </S.Form>
          )}

          {step === "password" && (
            <S.Form onSubmit={passwordForm.handleSubmit(handlePasswordNext)}>
              <S.EmailInfo>
                <span>✉</span>
                <p>{savedEmail}</p>
              </S.EmailInfo>

              <S.FieldGroup>
                <S.PasswordInputBox
                  $hasError={!!passwordForm.formState.errors.password}
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="비밀번호를 입력해주세요!"
                    {...passwordForm.register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? "👁" : "⌁"}
                  </button>
                </S.PasswordInputBox>

                {passwordForm.formState.errors.password && (
                  <S.ErrorMessage>
                    {passwordForm.formState.errors.password.message}
                  </S.ErrorMessage>
                )}
              </S.FieldGroup>

              <S.FieldGroup>
                <S.PasswordInputBox
                  $hasError={!!passwordForm.formState.errors.passwordConfirm}
                >
                  <input
                    type={showPasswordConfirm ? "text" : "password"}
                    placeholder="비밀번호를 다시 한 번 입력해주세요!"
                    {...passwordForm.register("passwordConfirm")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswordConfirm((prev) => !prev)}
                  >
                    {showPasswordConfirm ? "👁" : "⌁"}
                  </button>
                </S.PasswordInputBox>

                {passwordForm.formState.errors.passwordConfirm && (
                  <S.ErrorMessage>
                    {passwordForm.formState.errors.passwordConfirm.message}
                  </S.ErrorMessage>
                )}
              </S.FieldGroup>

              <S.SubmitButton
                type="submit"
                disabled={!passwordForm.formState.isValid}
              >
                다음
              </S.SubmitButton>
            </S.Form>
          )}

          {step === "name" && (
            <S.Form onSubmit={nameForm.handleSubmit(handleSignupComplete)}>
              <S.ProfileImage>
                <S.ProfileHead />
                <S.ProfileBody />
              </S.ProfileImage>

              <S.FieldGroup>
                <S.Input
                  placeholder="닉네임을 입력해주세요!"
                  $hasError={!!nameForm.formState.errors.name}
                  {...nameForm.register("name")}
                />
                {nameForm.formState.errors.name && (
                  <S.ErrorMessage>
                    {nameForm.formState.errors.name.message}
                  </S.ErrorMessage>
                )}
              </S.FieldGroup>

              <S.SubmitButton
                type="submit"
                disabled={!nameForm.formState.isValid}
              >
                회원가입 완료
              </S.SubmitButton>
            </S.Form>
          )}
        </S.SignupBox>
      </S.Main>
    </S.Page>
  );
}
