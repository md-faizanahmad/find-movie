import { Types } from "mongoose";

export interface UserDocument {
  _id: Types.ObjectId;
  email: string;
  fullName: string;
  birthYear: number;
  adultVerified: boolean;
  favorites: number[];
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
