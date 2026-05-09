import * as S from "./LPComponent.style";

interface LPSkeletonProps {
  count?: number;
}

export default function LPSkeleton({ count = 20 }: LPSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <S.SkeletonBox key={index} />
      ))}
    </>
  );
}
