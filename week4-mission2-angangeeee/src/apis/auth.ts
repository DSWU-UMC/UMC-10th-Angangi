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
