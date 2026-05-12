import { Model, Schema, model, models } from "mongoose";
import { UserDocument } from "../types/auth.types";

const userSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    birthYear: {
      type: Number,
      required: true,
      min: 1900,
    },

    adultVerified: {
      type: Boolean,
      required: true,
      default: false,
    },

    favorites: {
      type: [Number],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);
// userSchema.index({ email: 1 });
export const UserModel: Model<UserDocument> =
  models.User || model<UserDocument>("User", userSchema);
