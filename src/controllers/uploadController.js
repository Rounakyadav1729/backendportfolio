import path from "path";
import { cloudinary, isCloudinaryEnabled } from "../config/cloudinary.js";

export async function uploadFile(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  if (isCloudinaryEnabled()) {
    const resourceType = req.file.mimetype === "application/pdf" ? "raw" : "image";
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "portfolio",
      resource_type: resourceType,
    });
    return res.json({ url: result.secure_url, publicId: result.public_id });
  }

  const url = `${req.protocol}://${req.get("host")}/uploads/${path.basename(req.file.filename)}`;
  res.json({ url });
}
