import mongoose from "mongoose";

const websiteSettingsSchema = new mongoose.Schema(
  {
    siteTitle: { type: String, default: "Rounak | Developer Portfolio" },
    logoText: { type: String, default: "ROUNAK" },
    logoUrl: { type: String, default: "" },
    footerText: { type: String, default: "Crafted with precision. Built for impact." },
    navigation: {
      type: [
        {
          label: String,
          href: String,
          enabled: { type: Boolean, default: true },
        },
      ],
      default: [],
    },
    sections: {
      hero: { type: Boolean, default: true },
      about: { type: Boolean, default: true },
      skills: { type: Boolean, default: true },
      projects: { type: Boolean, default: true },
      experience: { type: Boolean, default: true },
      services: { type: Boolean, default: true },
      contact: { type: Boolean, default: true },
    },
    services: {
      type: [
        {
          title: String,
          description: String,
          icon: String,
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export const WebsiteSettings = mongoose.model("WebsiteSettings", websiteSettingsSchema);
