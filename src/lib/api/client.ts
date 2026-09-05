// import axios from "axios";
// import { env } from "../config/env";

// // 🔥 Ensure this file is NEVER bundled in client
// if (typeof window !== "undefined") {
//   throw new Error("apiClient should not be used in the browser");
// }

// export const apiClient = axios.create({
//   baseURL: env.TMDB_BASE_URL,
//   timeout: 15000,
//   headers: {
//     Authorization: `Bearer ${env.TMDB_API_KEY}`,
//     "Content-Type": "application/json",
//   },
// });

// // 🔥 Response interceptor
// apiClient.interceptors.request.use((config) => {
//   config.params = {
//     ...config.params,
//     api_key: env.TMDB_API_KEY,
//   };
//   return config;
// });
// if (!env.TMDB_API_KEY) {
//   throw new Error("TMDB_API_KEY is missing");
// }

// if (!env.TMDB_BASE_URL) {
//   throw new Error("TMDB_BASE_URL is missing");
// }

/////////// Fetch
import { env } from "../config/env";

if (typeof window !== "undefined") {
  throw new Error("apiClient should not be used in the browser");
}

interface RequestConfig {
  params?: Record<string, string | number | boolean | undefined>;
  revalidate?: number;
}

function buildUrl(path: string, params?: RequestConfig["params"]): string {
  const url = new URL(path, env.TMDB_BASE_URL);

  url.searchParams.set("api_key", env.TMDB_API_KEY);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    });
  }

  return url.toString();
}

export const apiClient = {
  async get<T>(path: string, config: RequestConfig = {}) {
    const response = await fetch(buildUrl(path, config.params), {
      headers: {
        Authorization: `Bearer ${env.TMDB_API_KEY}`,
        "Content-Type": "application/json",
      },
      next: {
        revalidate: config.revalidate ?? 3600,
      },
    });

    if (!response.ok) {
      throw new Error(
        `TMDB request failed: ${response.status} ${response.statusText}`,
      );
    }

    return {
      data: (await response.json()) as T,
    };
  },
};

if (!env.TMDB_API_KEY) {
  throw new Error("TMDB_API_KEY is missing");
}

if (!env.TMDB_BASE_URL) {
  throw new Error("TMDB_BASE_URL is missing");
}
