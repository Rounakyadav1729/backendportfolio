import { pick } from "../utils/sanitize.js";

export function createCrudController(Model, allowedFields) {
  return {
    list: async (_req, res) => {
      const items = await Model.find().sort({ order: 1, createdAt: -1 });
      res.json(items);
    },
    create: async (req, res) => {
      const data = pick(req.body, allowedFields);
      const item = await Model.create(data);
      res.status(201).json(item);
    },
    update: async (req, res) => {
      const data = pick(req.body, allowedFields);
      const item = await Model.findByIdAndUpdate(req.params.id, data, {
        new: true,
        runValidators: true,
      });
      if (!item) return res.status(404).json({ message: "Not found" });
      res.json(item);
    },
    remove: async (req, res) => {
      const item = await Model.findByIdAndDelete(req.params.id);
      if (!item) return res.status(404).json({ message: "Not found" });
      res.json({ message: "Deleted" });
    },
  };
}
