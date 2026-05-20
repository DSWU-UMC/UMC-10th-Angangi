import { axiosInstance } from "./axiosInstance";

interface ApiResponse<T> {
  status: boolean;
  message: string;
  statusCode: number;
  data: T;
}

interface AuthData {
  id: number;
  name: string;
  accessToken: string;
  refreshToken: string;
}

export const login = async (email: string, password: string) => {
  const response = await axiosInstance.post<ApiResponse<AuthData>>(
    "/v1/auth/signin",
    {
      email,
      password,
    },
  );

  const user = response.data.data;

  localStorage.setItem("accessToken", user.accessToken);
  localStorage.setItem("refreshToken", user.refreshToken);
  localStorage.setItem("user", JSON.stringify(user));

  return user;
};

export const signup = async (name: string, email: string, password: string) => {
  const response = await axiosInstance.post<ApiResponse<AuthData>>(
    "/v1/auth/signup",
    {
      name,
      email,
      password,
    },
  );

  const user = response.data.data;

  localStorage.setItem("accessToken", user.accessToken);
  localStorage.setItem("refreshToken", user.refreshToken);
  localStorage.setItem("user", JSON.stringify(user));

  return user;
};

export const deleteUser = async (): Promise<null> => {
  const response =
    await axiosInstance.delete<ApiResponse<null>>("/v1/users/me");

  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");

  return response.data.data;
};

export interface MyProfile {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
}

export interface UpdateProfileRequest {
  name: string;
  bio?: string;
  avatar?: string;
}

export const getMyProfile = async (): Promise<MyProfile> => {
  const response =
    await axiosInstance.get<ApiResponse<MyProfile>>("/v1/users/me");

  return response.data.data;
};

export const updateMyProfile = async ({
  name,
  bio,
  avatar,
}: UpdateProfileRequest): Promise<MyProfile> => {
  const response = await axiosInstance.patch<ApiResponse<MyProfile>>(
    "/v1/users",
    {
      name,
      bio,
      avatar,
    },
  );

  const updatedUser = response.data.data;

  const savedUser = localStorage.getItem("user");

  if (savedUser) {
    const parsedUser = JSON.parse(savedUser);

    localStorage.setItem(
      "user",
      JSON.stringify({
        ...parsedUser,
        name: updatedUser.name,
      }),
    );
  }

  return updatedUser;
};
