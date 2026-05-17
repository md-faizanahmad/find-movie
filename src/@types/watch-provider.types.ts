export interface WatchProvider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
  display_priority: number;
}

export interface WatchProviderRegion {
  link?: string;
  flatrate?: WatchProvider[];
  rent?: WatchProvider[];
  buy?: WatchProvider[];
  free?: WatchProvider[];
}

export interface WatchProviderResponse {
  id: number;
  results: Record<string, WatchProviderRegion>;
}
