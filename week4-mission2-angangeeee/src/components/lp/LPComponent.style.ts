import styled, { keyframes } from "styled-components";

// LPCard
export const CardButton = styled.button`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border: none;
  background: #222;
  cursor: pointer;
  padding: 0;

  &:hover img {
    transform: scale(1.08);
  }

  &:hover div {
    opacity: 1;
  }
`;

export const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.25s ease;
`;

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  padding: 16px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.1));
  opacity: 0;
  transition: opacity 0.25s ease;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
`;

export const Title = styled.p`
  color: white;
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 4px;
  text-align: left;
`;

export const DateText = styled.p`
  color: #ddd;
  font-size: 13px;
  margin: 0 0 8px;
`;

export const LikeText = styled.p`
  color: white;
  font-size: 14px;
  margin: 0;
`;

// LPSkeleton
export const pulse = keyframes`
  0% {
    opacity: 0.45;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0.45;
  }
`;

export const SkeletonBox = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: #222;
  animation: ${pulse} 1.2s ease-in-out infinite;
`;

// ErrorBox
export const Wrapper = styled.div`
  width: 100%;
  min-height: 240px;
  border: 1px solid #333;
  border-radius: 12px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

export const Message = styled.p`
  color: white;
  font-size: 15px;
`;

export const RetryButton = styled.button`
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  background-color: #ff2ea6;
  color: white;
  font-weight: 700;
  cursor: pointer;
`;
