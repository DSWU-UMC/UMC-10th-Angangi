import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

const BASE_URL = "http://localhost:8000";

interface RetryRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

interface ApiResponse<T> {
  status: boolean;
  message: string;
  statusCode: number;
  data: T;
}

interface TokenRefreshData {
  accessToken: string;
  refreshToken?: string;
}

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as RetryRequestConfig;

    const requestUrl = originalRequest?.url ?? "";

    const isAuthRequest =
      requestUrl.includes("/v1/auth/signin") ||
      requestUrl.includes("/v1/auth/signup") ||
      requestUrl.includes("/v1/auth/refresh");

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isAuthRequest
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          throw new Error("refreshToken이 없습니다.");
        }

        const refreshResponse = await axios.post<ApiResponse<TokenRefreshData>>(
          `${BASE_URL}/v1/auth/refresh`,
          {
            refreshToken,
          },
        );

        const newAccessToken = refreshResponse.data.data.accessToken;

        localStorage.setItem("accessToken", newAccessToken);

        if (refreshResponse.data.data.refreshToken) {
          localStorage.setItem(
            "refreshToken",
            refreshResponse.data.data.refreshToken,
          );
        }

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");

        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
