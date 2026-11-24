import { Router } from "express";
import { protect } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const wrap = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
import { login, loginValidators, logout, me } from "../controllers/authController.js";
import { createCrudController } from "../controllers/crudFactory.js";
import { createSingletonController } from "../controllers/singletonController.js";
import {
  createMessage,
  deleteMessage,
  listMessages,
  messageValidators,
  toggleRead,
} from "../controllers/messageController.js";
import { uploadFile } from "../controllers/uploadController.js";
import { getStats } from "../controllers/statsController.js";
import { Profile } from "../models/Profile.js";
import { Skill } from "../models/Skill.js";
import { Project } from "../models/Project.js";
import { Education } from "../models/Education.js";
import { Experience } from "../models/Experience.js";
import { Certification } from "../models/Certification.js";
import { SocialLinks } from "../models/SocialLinks.js";
import { WebsiteSettings } from "../models/WebsiteSettings.js";

const router = Router();

const profile = createSingletonController(Profile, [
  "name",
  "headline",
  "tagline",
  "introduction",
  "about",
  "image",
  "resumeUrl",
  "email",
  "phone",
  "location",
  "availability",
  "roles",
  "careerInterests",
  "technicalInterests",
]);

const social = createSingletonController(SocialLinks, [
  "github",
  "linkedin",
  "instagram",
  "twitter",
  "email",
  "website",
]);

const settings = createSingletonController(WebsiteSettings, [
  "siteTitle",
  "logoText",
  "logoUrl",
  "footerText",
  "navigation",
  "sections",
  "services",
]);

const skills = createCrudController(Skill, ["name", "category", "proficiency", "icon", "order"]);
const projects = createCrudController(Project, [
  "title",
  "description",
  "details",
  "image",
  "technologies",
  "githubUrl",
  "liveUrl",
  "featured",
  "order",
]);
const education = createCrudController(Education, [
  "institution",
  "degree",
  "field",
  "startYear",
  "endYear",
  "description",
  "order",
]);
const experience = createCrudController(Experience, [
  "role",
  "company",
  "location",
  "startDate",
  "endDate",
  "description",
  "type",
  "order",
]);
const certifications = createCrudController(Certification, [
  "title",
  "issuer",
  "year",
  "credentialUrl",
  "type",
  "order",
]);

router.post("/auth/login", loginValidators, wrap(login));
router.post("/auth/logout", wrap(logout));
router.get("/auth/me", protect, wrap(me));

router.get("/profile", wrap(profile.get));
router.put("/profile", protect, wrap(profile.update));

router.get("/social-links", wrap(social.get));
router.put("/social-links", protect, wrap(social.update));

router.get("/settings", wrap(settings.get));
router.put("/settings", protect, wrap(settings.update));

router.get("/skills", wrap(skills.list));
router.post("/skills", protect, wrap(skills.create));
router.put("/skills/:id", protect, wrap(skills.update));
router.delete("/skills/:id", protect, wrap(skills.remove));

router.get("/projects", wrap(projects.list));
router.post("/projects", protect, wrap(projects.create));
router.put("/projects/:id", protect, wrap(projects.update));
router.delete("/projects/:id", protect, wrap(projects.remove));

router.get("/education", wrap(education.list));
router.post("/education", protect, wrap(education.create));
router.put("/education/:id", protect, wrap(education.update));
router.delete("/education/:id", protect, wrap(education.remove));

router.get("/experience", wrap(experience.list));
router.post("/experience", protect, wrap(experience.create));
router.put("/experience/:id", protect, wrap(experience.update));
router.delete("/experience/:id", protect, wrap(experience.remove));

router.get("/certifications", wrap(certifications.list));
router.post("/certifications", protect, wrap(certifications.create));
router.put("/certifications/:id", protect, wrap(certifications.update));
router.delete("/certifications/:id", protect, wrap(certifications.remove));

router.post("/messages", messageValidators, wrap(createMessage));
router.get("/messages", protect, wrap(listMessages));
router.patch("/messages/:id", protect, wrap(toggleRead));
router.delete("/messages/:id", protect, wrap(deleteMessage));

router.get("/stats", protect, wrap(getStats));
router.post("/upload", protect, upload.single("file"), wrap(uploadFile));

export default router;
