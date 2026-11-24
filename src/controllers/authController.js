import { body, validationResult } from "express-validator";
import { Admin } from "../models/Admin.js";
import { signToken } from "../utils/jwt.js";

export const loginValidators = [
  body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
  body("password").isLength({ min: 8 }).withMessage("Password is required"),
];

export async function login(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin || !(await admin.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = signToken(admin._id);
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.json({
    token,
    admin: { id: admin._id, email: admin.email, name: admin.name },
  });
}

export async function me(req, res) {
  res.json({ admin: req.admin });
}

export async function logout(_req, res) {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
}
