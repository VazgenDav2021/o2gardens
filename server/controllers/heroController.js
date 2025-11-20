import HeroImage from "../models/HeroImage.js";

export const getHeroImages = async (req, res) => {
  try {
    const images = await HeroImage.find({ isActive: true })
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createHeroImage = async (req, res) => {
  try {
    const newImage = new HeroImage(req.body);
    const savedImage = await newImage.save();
    res.status(201).json(savedImage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateHeroImage = async (req, res) => {
  try {
    const updatedImage = await HeroImage.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedImage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteHeroImage = async (req, res) => {
  try {
    await HeroImage.findByIdAndDelete(req.params.id);
    res.json({ message: "Image deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
