import mongoose from "mongoose";

export const SKILL_CATEGORIES = [
  "Programming Languages",
  "Web Development",
  "Backend Development",
  "Database",
  "Tools & Technologies",
  "Networking & Linux",
  "Embedded Systems",
];

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, enum: SKILL_CATEGORIES },
    proficiency: { type: Number, min: 0, max: 100, default: 70 },
    icon: { type: String, default: "Code2" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Skill = mongoose.model("Skill", skillSchema);
