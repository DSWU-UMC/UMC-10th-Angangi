import styled from "styled-components";

export const Layout = styled.div`
  display: flex;
  min-height: calc(100vh - 72px);
`;

export const Container = styled.main`
  flex: 1;

  padding: 48px 32px 80px;

  display: flex;
  flex-direction: column;
  align-items: center;

  background: #181a1f;
`;

export const Title = styled.h1`
  margin: 0 0 32px;

  color: white;
  font-size: 32px;
  font-weight: 800;
`;

export const ProfileCard = styled.section`
  width: 100%;
  max-width: 520px;

  padding: 40px 32px;

  border-radius: 18px;
  background: #2a2d34;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

export const ProfileImage = styled.img`
  width: 140px;
  height: 140px;

  border-radius: 50%;
  object-fit: cover;

  border: 4px solid #ff2ea6;
`;

export const InputGroup = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  color: white;
  font-size: 15px;
  font-weight: 600;
`;

export const Input = styled.input`
  width: 100%;
  height: 52px;

  padding: 0 16px;

  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;

  background: #1f2228;
  color: white;

  font-size: 15px;

  outline: none;

  &:focus {
    border-color: #ff2ea6;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;

  padding: 14px 16px;

  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;

  background: #1f2228;
  color: white;

  font-size: 15px;
  line-height: 1.5;

  resize: vertical;
  outline: none;

  &:focus {
    border-color: #ff2ea6;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const SaveButton = styled.button`
  width: 100%;
  height: 52px;

  margin-top: 6px;

  border: none;
  border-radius: 10px;

  background: #ff2ea6;
  color: white;

  font-size: 16px;
  font-weight: 700;

  cursor: pointer;

  transition: 0.2s ease;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    opacity: 0.9;
  }
`;

export const LoadingText = styled.p`
  padding: 80px 0;

  color: white;
  font-size: 18px;
  text-align: center;
`;

export const ErrorText = styled.p`
  padding: 80px 0;

  color: #ff6b6b;
  font-size: 18px;
  text-align: center;
`;
