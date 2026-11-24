import { body, validationResult } from "express-validator";
import { ContactMessage } from "../models/ContactMessage.js";
import { stripHtml } from "../utils/sanitize.js";

export const messageValidators = [
  body("name").trim().isLength({ min: 2, max: 120 }).withMessage("Name is required"),
  body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
  body("subject").optional().isLength({ max: 200 }),
  body("message").trim().isLength({ min: 10, max: 4000 }).withMessage("Message must be at least 10 characters"),
];

export async function createMessage(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }
  const payload = {
    name: stripHtml(req.body.name),
    email: req.body.email,
    subject: stripHtml(req.body.subject || ""),
    message: stripHtml(req.body.message),
  };
  const item = await ContactMessage.create(payload);
  res.status(201).json({ message: "Message sent", id: item._id });
}

export async function listMessages(_req, res) {
  const items = await ContactMessage.find().sort({ createdAt: -1 });
  res.json(items);
}

export async function toggleRead(req, res) {
  const item = await ContactMessage.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Not found" });
  item.read = typeof req.body.read === "boolean" ? req.body.read : !item.read;
  await item.save();
  res.json(item);
}

export async function deleteMessage(req, res) {
  const item = await ContactMessage.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted" });
}
