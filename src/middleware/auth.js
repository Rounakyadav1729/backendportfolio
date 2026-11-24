import jwt from "jsonwebtoken";
import { Admin } from "../models/Admin.js";

export async function protect(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const tokenFromHeader = header.startsWith("Bearer ") ? header.slice(7) : null;
    const token = tokenFromHeader || req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select("-password");
    if (!admin) {
      return res.status(401).json({ message: "Admin not found" });
    }
    req.admin = admin;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
