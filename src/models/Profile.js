import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, default: "Rounak" },
    headline: { type: String, default: "Full-Stack Developer" },
    tagline: { type: String, default: "Building premium digital products with clean architecture." },
    introduction: { type: String, default: "" },
    about: { type: String, default: "" },
    image: { type: String, default: "" },
    resumeUrl: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    location: { type: String, default: "" },
    availability: { type: String, default: "Available for internships and freelance work" },
    roles: { type: [String], default: [] },
    careerInterests: { type: [String], default: [] },
    technicalInterests: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const Profile = mongoose.model("Profile", profileSchema);
