
import Event from "../models/Event.js";

// Локализация данных
const localize = (obj, lang) => {
  if (!lang) return obj; // если lang не указан, возвращаем весь объект
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

export const getEvents = async (req, res) => {
  try {
    const lang = req.query.lang;
    const events = await Event.find();
    const localizedEvents = events.map((e) => ({
      ...e._doc,
      name: localize(e.name, lang),
      description: localize(e.description, lang),
      artists: localize(e.artists, lang),
      menu: e.menu.map((m) => ({
        ...m,
        name: localize(m.name, lang),
        description: localize(m.description, lang),
        artists: localize(m.artists, lang),
      })),
    }));
    res.json(localizedEvents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const lang = req.query.lang;
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const localizedEvent = {
      ...event._doc,
      name: localize(event.name, lang),
      description: localize(event.description, lang),
      artists: localize(event.artists, lang),
      menu: event.menu.map((m) => ({
        ...m,
        name: localize(m.name, lang),
        description: localize(m.description, lang),
        artists: localize(m.artists, lang),
      })),
    };

    res.json(localizedEvent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CRUD для админа
export const createEvent = async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedEvent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
