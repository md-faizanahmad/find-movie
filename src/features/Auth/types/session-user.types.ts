export interface SessionUser {
  id: string;
  email: string;
  fullName: string;
  adultVerified: boolean;
  emailVerified: boolean;
  favorites: number[];
}
