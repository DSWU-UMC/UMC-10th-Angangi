import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import * as S from "./MyPage.style";

import { getMyProfile, updateMyProfile } from "../apis/auth";

import defaultThumbnail from "../assets/앙.jpg";

export default function MyPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myProfile"],
    queryFn: getMyProfile,
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateMyProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myProfile"],
      });

      alert("프로필이 수정되었습니다.");

      navigate("/home");
    },
  });

  const handleSubmit = () => {
    const finalName = name || profile?.name || "";
    const finalBio = bio || profile?.bio || "";

    if (!finalName.trim()) return;

    updateProfileMutation.mutate({
      name: finalName,
      bio: finalBio,
      avatar: defaultThumbnail,
    });
  };

  if (isLoading) {
    return <S.LoadingText>불러오는 중...</S.LoadingText>;
  }

  if (isError || !profile) {
    return <S.ErrorText>프로필을 불러올 수 없습니다.</S.ErrorText>;
  }

  return (
    <>
      <S.Layout>
        <S.Container>
          <S.Title>마이페이지 닉네임 변경</S.Title>

          <S.ProfileCard>
            <S.ProfileImage
              src={profile.avatar ?? defaultThumbnail}
              alt="프로필 이미지"
            />

            <S.InputGroup>
              <S.Label>이름</S.Label>

              <S.Input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder={profile.name}
              />
            </S.InputGroup>

            <S.InputGroup>
              <S.Label>Bio</S.Label>

              <S.TextArea
                value={bio}
                onChange={(event) => setBio(event.target.value)}
                placeholder={profile.bio ?? "자기소개를 입력해주세요."}
              />
            </S.InputGroup>

            <S.SaveButton
              type="button"
              disabled={updateProfileMutation.isPending}
              onClick={handleSubmit}
            >
              {updateProfileMutation.isPending ? "저장 중..." : "프로필 저장"}
            </S.SaveButton>
          </S.ProfileCard>
        </S.Container>
      </S.Layout>
    </>
  );
}
