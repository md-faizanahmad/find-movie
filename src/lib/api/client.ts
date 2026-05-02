import axios from "axios";
import { env } from "../config/env";

export const apiClient = axios.create({
  baseURL: env.TMDB_BASE_URL,
  headers: {
    Authorization: `Bearer ${env.TMDB_API_KEY}`,
    "Content-Type": "application/json",
  },
});
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.status_message ||
      error.message ||
      "Something went wrong";

    return Promise.reject(new Error(message));
  },
);
