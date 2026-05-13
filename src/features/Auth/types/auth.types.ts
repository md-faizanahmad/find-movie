import { Types } from "mongoose";

export interface UserDocument {
  _id: Types.ObjectId;
  email: string;
  emailVerified: boolean;
  fullName: string;
  birthYear: number;
  adultVerified: boolean;
  favorites: {
    mediaId: number;

    mediaType: "movie" | "tv" | "person";
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface OtpCodeDocument {
  _id: Types.ObjectId;
  email: string;
  otpHash: string;
  expiresAt: Date;
  attempts: number;
  createdAt: Date;
  updatedAt: Date;
}
