// import { MovieCategory } from "@/@types/movie-category.types";
// import { TMDBMovie, PaginatedResponse } from "@/@types/movie.types";
// import { apiClient } from "@/lib/api/client";

// interface GetMoviesParams {
//   category: MovieCategory;
//   page?: number;
// }

// function resolveEndpoint(category: MovieCategory): string {
//   switch (category) {
//     case "trending":
//       return "/trending/movie/day";
//     case "top_rated":
//       return "/movie/top_rated";
//     case "upcoming":
//       return "/movie/upcoming";
//     case "latest":
//       return "/movie/latest";
//     default:
//       return "/trending/movie/day";
//   }
// }

// export async function getMovies({
//   category,
//   page = 1,
// }: GetMoviesParams): Promise<PaginatedResponse<TMDBMovie>> {
//   const endpoint = resolveEndpoint(category);

//   try {
//     const response = await apiClient.get(endpoint, {
//       params: category !== "latest" ? { page } : undefined,
//     });

//     const data = response.data;

//     if (category === "latest") {
//       return {
//         page: 1,
//         results: data ? [data] : [],
//         total_pages: 1,
//         total_results: data ? 1 : 0,
//       };
//     }

//     return data;
//   } catch (error) {
//     console.error(`TMDb failed for ${category}`, error);

//     // ✅ fallback for SSR — but DON'T hide error completely
//     return {
//       page: 1,
//       results: [],
//       total_pages: 1,
//       total_results: 0,
//     };
//   }
// }

///////// fetch opt-
import { MovieCategory } from "@/@types/movie-category.types";
import { TMDBMovie, PaginatedResponse } from "@/@types/movie.types";
import { apiClient } from "@/lib/api/client";

interface GetMoviesParams {
  category: MovieCategory;
  page?: number;
}

function resolveEndpoint(category: MovieCategory): string {
  switch (category) {
    case "trending":
      return "/trending/movie/day";
    case "top_rated":
      return "/movie/top_rated";
    case "upcoming":
      return "/movie/upcoming";
    case "latest":
      return "/movie/latest";
    default:
      return "/trending/movie/day";
  }
}

function getCacheTime(category: MovieCategory): number {
  switch (category) {
    case "trending":
      return 1800; // 30 minutes
    case "latest":
      return 1800; // 30 minutes
    case "upcoming":
      return 3600; // 1 hour
    case "top_rated":
      return 21600; // 6 hours
    default:
      return 3600; // 1 hour
  }
}

export async function getMovies({
  category,
  page = 1,
}: GetMoviesParams): Promise<PaginatedResponse<TMDBMovie>> {
  const endpoint = resolveEndpoint(category);

  try {
    if (category === "latest") {
      const response = await apiClient.get<TMDBMovie>(endpoint, {
        revalidate: getCacheTime(category),
      });
      const data = response.data;

      return {
        page: 1,
        results: data ? [data] : [],
        total_pages: 1,
        total_results: data ? 1 : 0,
      };
    }

    const response = await apiClient.get<PaginatedResponse<TMDBMovie>>(
      endpoint,
      {
        params: { page },
        revalidate: getCacheTime(category),
      },
    );

    return response.data;
  } catch (error) {
    console.error(`TMDb failed for ${category}`, error);

    return {
      page: 1,
      results: [],
      total_pages: 1,
      total_results: 0,
    };
  }
}
