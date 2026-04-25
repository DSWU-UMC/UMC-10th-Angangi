import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

export const login = (email: string, password: string) => {
  return api.post("/v1/auth/signin", { email, password });
};

export const signup = (email: string, password: string) => {
  return api.post("/v1/auth/signup", { email, password });
};
