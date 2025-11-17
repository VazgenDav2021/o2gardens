import SchemaModel from "../models/Schema.js";

// Локализация для схем (menu)
const localize = (obj, lang) => {
  if (!lang) return obj;
  const localized = {};
  for (const key in obj) {
    if (
      typeof obj[key] === "object" &&
      obj[key] !== null &&
      obj[key][lang] !== undefined
    ) {
      localized[key] = obj[key][lang];
    } else {
      localized[key] = obj[key];
    }
  }
  return localized;
};

export const getSchemas = async (req, res) => {
  try {
    const lang = req.query.lang;
    const schemas = await SchemaModel.find();
    const localizedSchemas = schemas.map((s) => ({
      ...s._doc,
      menu: s.menu.map((m) => ({
        ...m,
        name: localize(m.name, lang),
        description: localize(m.description, lang),
        artists: localize(m.artists, lang),
      })),
    }));
    res.json(localizedSchemas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createSchema = async (req, res) => {
  try {
    const newSchema = new SchemaModel(req.body);
    const savedSchema = await newSchema.save();
    res.status(201).json(savedSchema);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateSchema = async (req, res) => {
  try {
    const updatedSchema = await SchemaModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedSchema);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteSchema = async (req, res) => {
  try {
    await SchemaModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Schema deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
