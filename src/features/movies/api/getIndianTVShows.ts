// // src/features/movies/services/getIndianTVShows.ts

// import { PaginatedResponse } from "@/@types/movie.types";
// import { TMDBTV } from "@/@types/tv.types";
// import { apiClient } from "@/lib/api/client";
// import { env } from "@/lib/config/env";
// import { emptyResponse } from "@/lib/utils/emptyResponse";

// interface Params {
//   page?: number;
// }

// export async function getIndianTVShows(
//   params: Params = {},
// ): Promise<PaginatedResponse<TMDBTV>> {
//   const { page = 1 } = params;

//   try {
//     const res = await apiClient.get<PaginatedResponse<TMDBTV>>("/discover/tv", {
//       params: {
//         api_key: env.TMDB_API_KEY,
//         page,
//         with_origin_country: "IN",
//         sort_by: "popularity.desc",
//       },
//     });

//     return res.data;
//   } catch (error) {
//     console.warn("Indian TV fallback");
//     return emptyResponse();
//   }
// }

//// Fetch Optz

// src/features/movies/services/getIndianTVShows.ts

import { PaginatedResponse } from "@/@types/movie.types";
import { TMDBTV } from "@/@types/tv.types";
import { apiClient } from "@/lib/api/client";
import { emptyResponse } from "@/lib/utils/emptyResponse";

interface Params {
  page?: number;
}

export async function getIndianTVShows(
  params: Params = {},
): Promise<PaginatedResponse<TMDBTV>> {
  const { page = 1 } = params;

  try {
    const res = await apiClient.get<PaginatedResponse<TMDBTV>>("/discover/tv", {
      params: {
        page,
        with_origin_country: "IN",
        sort_by: "popularity.desc",
      },
      revalidate: 3600,
    });

    return res.data;
  } catch (error) {
    console.warn("Indian TV fallback", error);
    return emptyResponse();
  }
}
