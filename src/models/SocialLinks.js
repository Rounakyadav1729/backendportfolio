import mongoose from "mongoose";

const socialLinksSchema = new mongoose.Schema(
  {
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    instagram: { type: String, default: "" },
    twitter: { type: String, default: "" },
    email: { type: String, default: "" },
    website: { type: String, default: "" },
  },
  { timestamps: true }
);

export const SocialLinks = mongoose.model("SocialLinks", socialLinksSchema);
