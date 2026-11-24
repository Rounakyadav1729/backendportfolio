import { Skill } from "../models/Skill.js";
import { Project } from "../models/Project.js";
import { ContactMessage } from "../models/ContactMessage.js";
import { Education } from "../models/Education.js";
import { Experience } from "../models/Experience.js";
import { Certification } from "../models/Certification.js";

export async function getStats(_req, res) {
  const [projects, skills, messages, unread, education, experience, certifications] =
    await Promise.all([
      Project.countDocuments(),
      Skill.countDocuments(),
      ContactMessage.countDocuments(),
      ContactMessage.countDocuments({ read: false }),
      Education.countDocuments(),
      Experience.countDocuments(),
      Certification.countDocuments(),
    ]);
  res.json({ projects, skills, messages, unread, education, experience, certifications });
}
