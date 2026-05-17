import {
  TMDBWatchProvider,
  TMDBWatchProviderResponse,
  WatchProvider,
  WatchProviderGroups,
} from "@/@types/watch-provider.types";
import { apiClient } from "@/lib/api/client";

export type MediaType = "movie" | "tv";

interface GetWatchProvidersParams {
  mediaType: MediaType;
  mediaId: number;
  region?: string;
}

function normalizeProviders(providers?: TMDBWatchProvider[]): WatchProvider[] {
  if (!providers) return [];

  return providers.map((provider) => ({
    id: provider.provider_id,
    name: provider.provider_name,
    logoPath: provider.logo_path,
  }));
}

export async function getWatchProviders({
  mediaType,
  mediaId,
  region = "IN",
}: GetWatchProvidersParams): Promise<WatchProviderGroups | null> {
  try {
    const response = await apiClient.get<TMDBWatchProviderResponse>(
      `/${mediaType}/${mediaId}/watch/providers`,
    );

    const regionData = response.data.results?.[region];

    if (!regionData) {
      return null;
    }

    return {
      link: regionData.link,

      stream: normalizeProviders(regionData.flatrate),

      rent: normalizeProviders(regionData.rent),

      buy: normalizeProviders(regionData.buy),

      free: normalizeProviders(regionData.free),
    };
  } catch (error) {
    console.error("Failed to fetch watch providers:", error);

    return null;
  }
}
