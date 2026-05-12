import axios from "axios";
import { env } from "../config/env";

// 🔥 Ensure this file is NEVER bundled in client
if (typeof window !== "undefined") {
  throw new Error("apiClient should not be used in the browser");
}

export const apiClient = axios.create({
  baseURL: env.TMDB_BASE_URL,
  timeout: 15000,
  headers: {
    Authorization: `Bearer ${env.TMDB_API_KEY}`,
    "Content-Type": "application/json",
  },
});

// 🔥 Response interceptor
apiClient.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    api_key: env.TMDB_API_KEY,
  };
  return config;
});
if (!env.TMDB_API_KEY) {
  throw new Error("TMDB_API_KEY is missing");
}

if (!env.TMDB_BASE_URL) {
  throw new Error("TMDB_BASE_URL is missing");
}
