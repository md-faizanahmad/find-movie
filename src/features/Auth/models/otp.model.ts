import { Model, Schema, model, models } from "mongoose";
import { OtpCodeDocument } from "../types/auth.types";

const otpCodeSchema = new Schema<OtpCodeDocument>(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    otpHash: {
      type: String,
      required: true,
    },

    expiresAt: {
      type: Date,
      required: true,
      index: {
        expires: 0,
      },
    },

    attempts: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export const OtpCodeModel: Model<OtpCodeDocument> =
  models.OtpCode || model<OtpCodeDocument>("OtpCode", otpCodeSchema);
