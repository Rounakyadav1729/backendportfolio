import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, default: "" },
    startDate: { type: String, default: "" },
    endDate: { type: String, default: "Present" },
    description: { type: String, default: "" },
    type: { type: String, enum: ["Internship", "Full-time", "Freelance", "Other"], default: "Internship" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Experience = mongoose.model("Experience", experienceSchema);
