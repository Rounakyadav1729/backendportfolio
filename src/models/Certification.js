import mongoose from "mongoose";

const certificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    issuer: { type: String, default: "" },
    year: { type: String, default: "" },
    credentialUrl: { type: String, default: "" },
    type: { type: String, enum: ["Certification", "Achievement"], default: "Certification" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Certification = mongoose.model("Certification", certificationSchema);
