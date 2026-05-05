// src/lib/utils/emptyResponse.ts

export function emptyResponse<T>(): {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
} {
  return {
    page: 1,
    results: [],
    total_pages: 1,
    total_results: 0,
  };
}
