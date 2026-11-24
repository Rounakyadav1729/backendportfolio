import "dotenv/config";
import { connectDB } from "../config/db.js";
import { Admin } from "../models/Admin.js";
import { Profile } from "../models/Profile.js";
import { Skill } from "../models/Skill.js";
import { Project } from "../models/Project.js";
import { Education } from "../models/Education.js";
import { Experience } from "../models/Experience.js";
import { Certification } from "../models/Certification.js";
import { SocialLinks } from "../models/SocialLinks.js";
import { WebsiteSettings } from "../models/WebsiteSettings.js";

async function seed() {
  await connectDB();

  const email = (process.env.ADMIN_EMAIL || "admin@example.com").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "ChangeMe123!";
  const existingAdmin = await Admin.findOne({ email });
  if (!existingAdmin) {
    await Admin.create({ email, password, name: "Site Admin" });
    console.log(`Admin created: ${email}`);
  } else {
    console.log(`Admin already exists: ${email}`);
  }

  if (!(await Profile.findOne())) {
    await Profile.create({
      name: "Rounak",
      headline: "Full-Stack MERN Developer",
      tagline: "I design and engineer premium digital experiences with a cinematic black-and-yellow identity.",
      introduction:
        "Developer focused on building fast, maintainable web products — from polished interfaces to secure backend systems.",
      about:
        "I am a developer who enjoys turning complex problems into elegant, production-ready software. My work sits at the intersection of UI craft, backend architecture, and systems thinking. I care about clean code, measurable performance, and interfaces that feel intentional.",
      image: "",
      resumeUrl: "",
      email: "hello@rounak.dev",
      phone: "",
      location: "India",
      availability: "Open to internships, freelance, and collaborative builds",
      roles: ["Full-Stack Developer", "MERN Engineer", "UI Engineer", "Systems Builder"],
      careerInterests: ["Product engineering", "Platform backends", "Developer tools"],
      technicalInterests: ["React architecture", "API design", "Linux & networking", "Embedded systems"],
    });
  }

  if ((await Skill.countDocuments()) === 0) {
    await Skill.insertMany([
      { name: "JavaScript", category: "Programming Languages", proficiency: 90, icon: "FileJson", order: 1 },
      { name: "Python", category: "Programming Languages", proficiency: 80, icon: "Code2", order: 2 },
      { name: "C", category: "Programming Languages", proficiency: 75, icon: "Binary", order: 3 },
      { name: "C++", category: "Programming Languages", proficiency: 72, icon: "Braces", order: 4 },
      { name: "React", category: "Web Development", proficiency: 88, icon: "Atom", order: 1 },
      { name: "Tailwind CSS", category: "Web Development", proficiency: 86, icon: "Palette", order: 2 },
      { name: "HTML / CSS", category: "Web Development", proficiency: 92, icon: "Layout", order: 3 },
      { name: "Node.js", category: "Backend Development", proficiency: 84, icon: "Server", order: 1 },
      { name: "Express.js", category: "Backend Development", proficiency: 82, icon: "Network", order: 2 },
      { name: "REST APIs", category: "Backend Development", proficiency: 85, icon: "Webhook", order: 3 },
      { name: "MongoDB", category: "Database", proficiency: 80, icon: "Database", order: 1 },
      { name: "Mongoose", category: "Database", proficiency: 78, icon: "Boxes", order: 2 },
      { name: "Git", category: "Tools & Technologies", proficiency: 88, icon: "GitBranch", order: 1 },
      { name: "Vite", category: "Tools & Technologies", proficiency: 82, icon: "Zap", order: 2 },
      { name: "Postman", category: "Tools & Technologies", proficiency: 80, icon: "Send", order: 3 },
      { name: "Linux", category: "Networking & Linux", proficiency: 74, icon: "Terminal", order: 1 },
      { name: "Networking Basics", category: "Networking & Linux", proficiency: 70, icon: "Share2", order: 2 },
      { name: "Arduino", category: "Embedded Systems", proficiency: 68, icon: "Cpu", order: 1 },
      { name: "IoT Concepts", category: "Embedded Systems", proficiency: 65, icon: "Radio", order: 2 },
    ]);
  }

  if ((await Project.countDocuments()) === 0) {
    await Project.insertMany([
      {
        title: "Campus Connect Platform",
        description: "A student collaboration hub with real-time updates, project boards, and role-based access.",
        details:
          "Built with the MERN stack. Includes authentication, CRUD boards, file uploads, and an admin moderation layer.",
        image: "",
        technologies: ["React", "Express", "MongoDB", "JWT"],
        githubUrl: "https://github.com",
        liveUrl: "",
        featured: true,
        order: 1,
      },
      {
        title: "Smart Portfolio CMS",
        description: "This portfolio itself — a content-managed developer site with a secure dashboard.",
        details: "Every public section is driven by MongoDB. Admins can update profile, skills, projects, and messages.",
        image: "",
        technologies: ["Vite", "Tailwind", "Node.js", "Cloudinary"],
        githubUrl: "https://github.com",
        liveUrl: "",
        featured: true,
        order: 2,
      },
      {
        title: "Network Lab Dashboard",
        description: "Visual diagnostics for Linux networking labs: ping stats, interface health, and logs.",
        details: "Designed for students learning TCP/IP, routing, and Linux administration.",
        image: "",
        technologies: ["React", "Node.js", "Linux"],
        githubUrl: "https://github.com",
        liveUrl: "",
        featured: false,
        order: 3,
      },
    ]);
  }

  if ((await Education.countDocuments()) === 0) {
    await Education.insertMany([
      {
        institution: "Your University",
        degree: "B.Tech",
        field: "Computer Science / Electronics",
        startYear: "2023",
        endYear: "2027",
        description: "Focused on software engineering, networks, and embedded systems.",
        order: 1,
      },
    ]);
  }

  if ((await Experience.countDocuments()) === 0) {
    await Experience.insertMany([
      {
        role: "Software Engineering Intern",
        company: "Tech Studio",
        location: "Remote",
        startDate: "Jun 2025",
        endDate: "Aug 2025",
        description: "Shipped UI features, REST APIs, and improved dashboard performance for an internal product.",
        type: "Internship",
        order: 1,
      },
    ]);
  }

  if ((await Certification.countDocuments()) === 0) {
    await Certification.insertMany([
      {
        title: "Full-Stack Web Development",
        issuer: "Online Academy",
        year: "2025",
        credentialUrl: "",
        type: "Certification",
        order: 1,
      },
      {
        title: "Smart India Hackathon Participant",
        issuer: "SIH",
        year: "2025",
        credentialUrl: "",
        type: "Achievement",
        order: 2,
      },
    ]);
  }

  if (!(await SocialLinks.findOne())) {
    await SocialLinks.create({
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      instagram: "",
      twitter: "",
      email: "hello@rounak.dev",
      website: "",
    });
  }

  if (!(await WebsiteSettings.findOne())) {
    await WebsiteSettings.create({
      siteTitle: "Rounak | Developer Portfolio",
      logoText: "ROUNAK.",
      logoUrl: "",
      footerText: "Built for craft, not clutter.",
      navigation: [
        { label: "Home", href: "#home", enabled: true },
        { label: "About", href: "#about", enabled: true },
        { label: "Skills", href: "#skills", enabled: true },
        { label: "Projects", href: "#projects", enabled: true },
        { label: "Experience", href: "#experience", enabled: true },
        { label: "Services", href: "#services", enabled: true },
        { label: "Contact", href: "#contact", enabled: true },
      ],
      sections: {
        hero: true,
        about: true,
        skills: true,
        projects: true,
        experience: true,
        services: true,
        contact: true,
      },
      services: [
        {
          title: "Full-Stack Development",
          description: "End-to-end MERN applications with authentication, APIs, and polished UI.",
          icon: "Layers",
        },
        {
          title: "UI Engineering",
          description: "Responsive, accessible interfaces with motion that supports the product, not distracts from it.",
          icon: "Sparkles",
        },
        {
          title: "Backend & APIs",
          description: "Secure REST services, data modeling, and content systems you can actually manage.",
          icon: "ServerCog",
        },
        {
          title: "Systems & Linux",
          description: "Networking fundamentals, Linux workflows, and embedded-adjacent experimentation.",
          icon: "TerminalSquare",
        },
      ],
    });
  }

  console.log("Seed complete");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
