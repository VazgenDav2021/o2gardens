import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";

// Логин
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await admin.comparePassword(password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: admin._id, email: admin.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  res.json({ message: "Logged in" });
};

// Регистрация
export const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Проверяем, есть ли уже админ с таким email
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin)
      return res.status(400).json({ message: "Admin already exists" });

    const newAdmin = new Admin({ email, password });
    await newAdmin.save();

    // Автоматически логиним после регистрации
    const token = jwt.sign(
      { id: newAdmin._id, email: newAdmin.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(201).json({ message: "Admin registered and logged in" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
