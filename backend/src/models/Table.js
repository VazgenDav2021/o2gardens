import mongoose from "mongoose";

const tableSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    guests: { type: Number, required: true },
    zone: {
      type: String,
      enum: ["left", "center", "right"],
      required: true,
    },
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    rotate: { type: Number, default: 0 },
    isBooked: { type: Boolean, default: false },
    reservation: {
      name: { type: String, trim: true },
      phone: { type: String, trim: true },
      comment: { type: String, trim: true },
      guests: { type: Number },
      date: { type: Date },
      isActive: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Table", tableSchema);
