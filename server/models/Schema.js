import mongoose from "mongoose";

const localizedString = { hy: String, ru: String, en: String };

const seatSchema = new mongoose.Schema({
  id: String,
  x: Number,
  y: Number,
  capacity: Number,
  name: String,
  status: {
    type: String,
    enum: ["available", "reserved"],
    default: "available",
  },
});

const menuItemSchema = new mongoose.Schema({
  name: localizedString,
  description: localizedString,
  Image: String,
  artists: localizedString,
  price: Number,
});

const schemaModel = new mongoose.Schema({
  startDate: Date,
  endDate: Date,
  schema: [seatSchema],
  menu: [menuItemSchema],
  totalGuestQny: Number,
});

export default mongoose.model("Schema", schemaModel);
