import bcrypt from "bcrypt";
import connectDB from "/utils/db";
import User from "/models/User";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    try {
      await connectDB();

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid credentials." });
      }

      if (user.role !== "client" && user.role !== "bidder") {
        return res.status(400).json({ error: "Invalid user role." });
      }

      const token = Buffer.from(
        JSON.stringify({
          email: user.email,
          role: user.role,
          exp: Date.now() + 3600 * 1000, // Token expires in 1 hour
        })
      ).toString("base64");

      res.status(200).json({
        token,
        role: user.role,
        redirect: user.role === "client" ? "/client" : "/bidder",
      });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
