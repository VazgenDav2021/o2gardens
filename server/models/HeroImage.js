import mongoose from "mongoose";

const heroImageSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  isActive: { type: Boolean, default: true },
});

export default mongoose.model("HeroImage", heroImageSchema);
