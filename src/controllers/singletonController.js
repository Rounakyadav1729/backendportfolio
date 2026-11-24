import { pick } from "../utils/sanitize.js";

export function createSingletonController(Model, allowedFields) {
  return {
    get: async (_req, res) => {
      let doc = await Model.findOne();
      if (!doc) doc = await Model.create({});
      res.json(doc);
    },
    update: async (req, res) => {
      const data = pick(req.body, allowedFields);
      let doc = await Model.findOne();
      if (!doc) doc = await Model.create(data);
      else {
        Object.assign(doc, data);
        await doc.save();
      }
      res.json(doc);
    },
  };
}
