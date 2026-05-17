export interface WatchProvider {
  id: number;
  name: string;
  logoPath: string;
}

export interface WatchProviderGroups {
  link?: string;

  stream: WatchProvider[];

  rent: WatchProvider[];

  buy: WatchProvider[];

  free: WatchProvider[];
}

export interface TMDBWatchProvider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
  display_priority: number;
}

export interface TMDBRegionProviders {
  link?: string;

  flatrate?: TMDBWatchProvider[];

  rent?: TMDBWatchProvider[];

  buy?: TMDBWatchProvider[];

  free?: TMDBWatchProvider[];
}

export interface TMDBWatchProviderResponse {
  id: number;

  results: Record<string, TMDBRegionProviders>;
}
