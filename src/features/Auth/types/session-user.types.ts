export interface SessionUser {
  id: string;
  email: string;
  fullName: string;
  adultVerified: boolean;
  emailVerified: boolean;
  favorites: {
    mediaId: number;
    mediaType: "movie" | "tv";
  }[];
}
