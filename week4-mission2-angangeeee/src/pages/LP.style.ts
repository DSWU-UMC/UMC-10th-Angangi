import styled, { keyframes } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 24px 0 80px;
`;

export const Card = styled.article`
  width: 100%;
  max-width: 860px;
  padding: 28px 104px 30px;

  background: #2a2d34;
  border-radius: 12px;
  color: white;

  @media (max-width: 900px) {
    padding: 28px 32px 30px;
  }
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
`;

export const AuthorArea = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Avatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #dff7eb;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 17px;
`;

export const AuthorName = styled.span`
  font-size: 15px;
  font-weight: 700;
`;

export const DateText = styled.span`
  color: #f1f1f1;
  font-size: 14px;
`;

export const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  margin-bottom: 36px;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: 500;
`;

export const IconArea = styled.div`
  display: flex;
  gap: 14px;
`;

export const IconButton = styled.button`
  border: none;
  background: transparent;
  color: white;
  font-size: 19px;
  cursor: pointer;
`;

export const ImageBox = styled.div`
  position: relative;

  width: 430px;
  height: 430px;
  margin: 0 auto 28px;

  background: #292c33;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.45);

  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 600px) {
    width: 300px;
    height: 300px;
  }
`;

export const Thumbnail = styled.img`
  width: 360px;
  height: 360px;

  border-radius: 50%;
  border: 3px solid #111;

  object-fit: cover;

  @media (max-width: 600px) {
    width: 250px;
    height: 250px;
  }
`;

export const CenterHole = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;

  width: 74px;
  height: 74px;

  border-radius: 50%;
  border: 2px solid #ddd;
  background: #f5f5f5;

  transform: translate(-50%, -50%);

  @media (max-width: 600px) {
    width: 52px;
    height: 52px;
  }
`;

export const Content = styled.p`
  max-width: 580px;
  margin: 0 auto 32px;

  color: white;
  font-size: 14px;
  line-height: 1.6;
`;

export const TagArea = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;

  margin-bottom: 26px;
`;

export const Tag = styled.span`
  padding: 7px 12px;
  border-radius: 999px;

  background: #4a5568;
  color: white;

  font-size: 13px;
`;

export const LikeArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  font-size: 24px;
`;

export const Heart = styled.span`
  color: #ff6b9a;
  font-size: 30px;
`;

export const LikeCount = styled.span`
  color: white;
  font-size: 22px;
`;

export const LoadingText = styled.p`
  color: white;
`;

export const Srapper = styled.div`
  position: relative;
  min-height: calc(100vh - 128px);
`;

export const SortArea = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 18px;
`;

export const SortButton = styled.button<{ $isActive: boolean }>`
  padding: 9px 16px;
  border: 1px solid white;
  background-color: ${({ $isActive }) => ($isActive ? "white" : "black")};
  color: ${({ $isActive }) => ($isActive ? "black" : "white")};
  font-size: 14px;
  cursor: pointer;

  &:first-child {
    border-radius: 6px 0 0 6px;
  }

  &:last-child {
    border-radius: 0 6px 6px 0;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(120px, 1fr));
  gap: 8px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(4, minmax(120px, 1fr));
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(3, minmax(100px, 1fr));
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, minmax(100px, 1fr));
  }
`;

export const FloatingButton = styled.button`
  position: fixed;
  right: 28px;
  bottom: 28px;
  z-index: 80;

  width: 58px;
  height: 58px;
  border: none;
  border-radius: 50%;

  background-color: #ff2ea6;
  color: white;
  font-size: 36px;
  line-height: 1;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CommentSection = styled.section`
  margin-top: 60px;
  padding-top: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
`;

export const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
  }
`;

export const CommentTitle = styled.h2`
  margin: 0;
  font-size: 22px;
  font-weight: 700;
`;

export const CommentSortArea = styled.div`
  display: flex;
`;

export const CommentSortButton = styled.button<{ $isActive: boolean }>`
  padding: 8px 14px;
  border: 1px solid white;

  background-color: ${({ $isActive }) => ($isActive ? "white" : "transparent")};

  color: ${({ $isActive }) => ($isActive ? "black" : "white")};

  font-size: 13px;
  cursor: pointer;

  transition: 0.2s ease;

  &:first-child {
    border-radius: 6px 0 0 6px;
  }

  &:last-child {
    border-radius: 0 6px 6px 0;
  }
`;

export const CommentForm = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 10px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const CommentInput = styled.input`
  height: 48px;
  width: 100%;
  padding: 0 16px;

  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;

  background-color: #1f2228;
  color: white;

  font-size: 14px;

  outline: none;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    border-color: #ff2ea6;
  }
`;

export const CommentSubmitButton = styled.button`
  min-width: 90px;
  height: 48px;

  border: none;
  border-radius: 8px;

  background-color: #ff2ea6;
  color: white;

  font-size: 14px;
  font-weight: 600;

  cursor: pointer;

  transition: 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

export const CommentHelpText = styled.p`
  margin: 0 0 24px;

  color: #b8b8b8;
  font-size: 13px;
`;

export const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CommentItem = styled.article`
  padding: 18px;

  border-radius: 10px;
  background-color: #1f2228;

  border: 1px solid rgba(255, 255, 255, 0.06);
`;

export const CommentMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 10px;
`;

export const CommentAuthor = styled.span`
  font-size: 14px;
  font-weight: 700;
`;

export const CommentDate = styled.span`
  color: #9ca3af;
  font-size: 12px;
`;

export const CommentContent = styled.p`
  margin: 0;

  color: #f3f4f6;
  font-size: 14px;
  line-height: 1.6;

  word-break: break-word;
`;

export const shimmer = keyframes`
  0% {
    background-position: -400px 0;
  }

  100% {
    background-position: 400px 0;
  }
`;

export const CommentSkeleton = styled.div`
  width: 100%;
  height: 96px;

  border-radius: 10px;

  background: linear-gradient(90deg, #2f3238 25%, #3a3f46 50%, #2f3238 75%);

  background-size: 800px 100%;

  animation: ${shimmer} 1.4s infinite linear;
`;

export const LPModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 300;

  background: rgba(0, 0, 0, 0.65);

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LPModalBox = styled.div`
  position: relative;

  width: 480px;
  padding: 72px 28px 34px;
  border-radius: 16px;

  background: #2a2d34;
  color: white;

  display: flex;
  flex-direction: column;
  gap: 14px;

  @media (max-width: 600px) {
    width: calc(100vw - 40px);
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 24px;
  right: 28px;

  border: none;
  background: transparent;

  color: white;
  font-size: 34px;
  line-height: 1;

  cursor: pointer;
`;

export const ModalThumbnailLabel = styled.label`
  width: 230px;
  height: 230px;
  margin: -28px auto 24px;

  border-radius: 50%;
  overflow: hidden;

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalThumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const FileInput = styled.input`
  display: none;
`;

export const ModalInput = styled.input`
  width: 100%;
  height: 50px;
  padding: 0 14px;

  border: 1px solid #5b6270;
  border-radius: 8px;

  background: transparent;
  color: white;

  font-size: 16px;
  outline: none;

  &::placeholder {
    color: #a3a8b3;
    font-weight: 600;
  }

  &:focus {
    border-color: #ff2ea6;
  }
`;

export const TagInputRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 88px;
  gap: 10px;
`;

export const TagAddButton = styled.button`
  height: 50px;

  border: none;
  border-radius: 8px;

  background: #aab4c2;
  color: white;

  font-size: 16px;
  font-weight: 700;

  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export const TagPreviewArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  margin-top: 2px;
`;

export const TagPreview = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;

  padding: 7px 10px;
  border-radius: 999px;

  background: #4a5568;
  color: white;

  font-size: 13px;
`;

export const TagRemoveButton = styled.button`
  border: none;
  background: transparent;

  color: white;
  font-size: 16px;
  line-height: 1;

  cursor: pointer;
`;

export const AddLPButton = styled.button`
  width: 100%;
  height: 50px;
  margin-top: 22px;

  border: none;
  border-radius: 8px;

  background: #aab4c2;
  color: white;

  font-size: 16px;
  font-weight: 700;

  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    opacity: 0.9;
  }
`;

export const CommentRightArea = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const CommentMenuWrapper = styled.div`
  position: relative;
`;

export const CommentMenuButton = styled.button`
  width: 28px;
  height: 28px;

  border: none;
  border-radius: 50%;

  background: transparent;
  color: white;

  font-size: 20px;
  line-height: 1;

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`;

export const CommentMenuBox = styled.div`
  position: absolute;
  top: 34px;
  right: 0;
  z-index: 10;

  width: 110px;
  padding: 6px;

  border-radius: 10px;
  background: #2f3238;

  border: 1px solid rgba(255, 255, 255, 0.08);

  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const CommentMenuItem = styled.button`
  width: 100%;
  height: 38px;

  border: none;
  border-radius: 8px;

  background: transparent;
  color: white;

  font-size: 14px;
  text-align: left;

  padding: 0 12px;

  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`;

export const CommentEditArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const CommentEditInput = styled.textarea`
  width: 100%;
  min-height: 90px;

  padding: 14px;

  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;

  background: #191b20;
  color: white;

  font-size: 14px;
  line-height: 1.5;

  resize: vertical;
  outline: none;

  &:focus {
    border-color: #ff2ea6;
  }
`;

export const CommentEditButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

export const CommentCancelButton = styled.button`
  min-width: 72px;
  height: 40px;

  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 8px;

  background: transparent;
  color: white;

  font-size: 14px;

  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
  }
`;

export const CommentSaveButton = styled.button`
  min-width: 72px;
  height: 40px;

  border: none;
  border-radius: 8px;

  background: #ff2ea6;
  color: white;

  font-size: 14px;
  font-weight: 600;

  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    opacity: 0.9;
  }
`;

export const DeleteModalBox = styled.div`
  width: 360px;
  padding: 32px 28px;

  border-radius: 16px;
  background: #2a2d34;

  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 600px) {
    width: calc(100vw - 40px);
  }
`;

export const DeleteModalTitle = styled.h2`
  margin: 0 0 12px;

  color: white;
  font-size: 22px;
  font-weight: 700;
`;

export const DeleteModalDescription = styled.p`
  margin: 0 0 28px;

  color: #b8bcc6;
  font-size: 14px;
  line-height: 1.5;
  text-align: center;
`;

export const DeleteModalButtonRow = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

export const DeleteCancelButton = styled.button`
  height: 48px;

  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 10px;

  background: transparent;
  color: white;

  font-size: 15px;
  font-weight: 600;

  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
  }
`;

export const DeleteConfirmButton = styled.button`
  height: 48px;

  border: none;
  border-radius: 10px;

  background: #ff2ea6;
  color: white;

  font-size: 15px;
  font-weight: 700;

  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    opacity: 0.9;
  }
`;
