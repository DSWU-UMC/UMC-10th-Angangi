import styled from "styled-components";

export const Page = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #000;
  color: #fff;
`;

export const Header = styled.header`
  width: 100%;
  height: 100px;
  padding: 0 32px;
  background-color: #151515;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.h1`
  margin: 0;
  color: #ff1493;
  font-size: 26px;
  font-weight: 800;
`;

export const Nav = styled.div`
  display: flex;
  gap: 12px;
`;

export const NavButton = styled.button<{ variant?: "login" | "signup" }>`
  border: none;
  border-radius: 4px;
  padding: 10px 18px;
  color: white;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;

  background-color: ${({ variant }) =>
    variant === "signup" ? "#ff1493" : "#000"};
`;

export const Main = styled.main`
  min-height: calc(100vh - 100px);
  display: flex;
  justify-content: center;
  padding-top: 140px;
`;

export const SignupBox = styled.section`
  width: 290px;
`;

export const TitleRow = styled.div`
  position: relative;
  margin-bottom: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BackButton = styled.button`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  color: white;
  font-size: 42px;
  cursor: pointer;
  padding: 0;

  img {
    width: 24px;
    height: 24px;
  }
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 22px;
  font-weight: 700;
`;

export const Form = styled.form`
  width: 100%;
`;

export const GoogleButton = styled.button`
  width: 100%;
  height: 46px;
  border: 1px solid #fff;
  border-radius: 8px;
  background-color: #000;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 42px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;

  p {
    margin: 0;
  }
`;

export const GoogleIcon = styled.img`
  width: 24px;
  height: 24px;
`;

export const Divider = styled.div`
  margin: 24px 0;
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const Line = styled.span`
  flex: 1;
  height: 1px;
  background-color: #fff;
`;

export const DividerText = styled.p`
  margin: 0;
  font-size: 15px;
  font-weight: 700;
`;

export const FieldGroup = styled.div`
  width: 100%;
  margin-bottom: 18px;
`;

export const Input = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  height: 42px;
  margin-bottom: 5px;
  padding: 0 10px;
  border: 1px solid #fff;
  border-radius: 6px;
  background-color: #151515;
  color: white;
  font-size: 15px;
  outline: none;

  ${({ $hasError }) => $hasError && `border-color: #ff4d4f;`}

  &::placeholder {
    color: #9b9b9b;
    font-weight: 500;
  }
`;

export const ErrorMessage = styled.p`
  margin: 0;
  color: #ff4d4f;
  font-size: 13px;
  font-weight: 500;
`;

export const SubmitButton = styled.button`
  width: 100%;
  height: 42px;
  border: none;
  border-radius: 8px;
  background-color: ${({ disabled }) => (disabled ? "#151515" : "#ff1493")};
  color: ${({ disabled }) => (disabled ? "#8f8f8f" : "#fff")};
  font-size: 18px;
  font-weight: 700;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

export const EmailInfo = styled.div`
  width: 100%;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  font-size: 14px;
  font-weight: 600;

  p {
    margin: 0;
  }
`;

export const PasswordInputBox = styled.div<{ $hasError?: boolean }>`
  width: 100%;
  height: 42px;
  margin-bottom: 5px;
  padding: 0 10px;
  border: 1px solid #fff;
  border-radius: 6px;
  background-color: #151515;
  display: flex;
  align-items: center;

  ${({ $hasError }) => $hasError && `border-color: #ff4d4f;`}

  input {
    flex: 1;
    min-width: 0;
    border: none;
    outline: none;
    background: transparent;
    color: white;
    font-size: 15px;

    &::placeholder {
      color: #9b9b9b;
      font-weight: 500;
    }
  }

  button {
    border: none;
    background: transparent;
    color: white;
    cursor: pointer;
    font-size: 14px;
  }
`;

export const ProfileImage = styled.div`
  position: relative;
  width: 160px;
  height: 160px;
  margin: 0 auto 26px;
  border-radius: 50%;
  background-color: #d9d9d9;
  overflow: hidden;
`;

export const ProfileHead = styled.div`
  position: absolute;
  top: 28px;
  left: 50%;
  width: 56px;
  height: 56px;
  transform: translateX(-50%);
  border-radius: 50%;
  background-color: #f7f7f7;
`;

export const ProfileBody = styled.div`
  position: absolute;
  bottom: -18px;
  left: 50%;
  width: 128px;
  height: 90px;
  transform: translateX(-50%);
  border-radius: 65px 65px 0 0;
  background-color: #f7f7f7;
`;
