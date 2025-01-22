// pages/api/register.js
import bcrypt from "bcrypt";
import connectDB from "/utils/db"; // Replace with your database connection utility
import User from "/models/User"; // Replace with your User model

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password, role } = req.body; // Accept role in the request body

    if (!email || !password || !role) {
      return res.status(400).json({ error: "Email, password, and role are required." });
    }

    if (role !== "client" && role !== "bidder") {
      return res.status(400).json({ error: "Invalid role. Role must be either 'client' or 'bidder'." });
    }

    try {
      // Connect to the database
      await connectDB();

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists." });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user with role
      const newUser = new User({ email, password: hashedPassword, role });
      await newUser.save();

      res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
