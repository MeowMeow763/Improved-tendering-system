import mongoose from "mongoose";
import jwt from "jsonwebtoken"; // Use import consistently

// MongoDB connection function
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log("MongoDB already connected.");
    return;
  }

  try {
    // Hardcoded MongoDB URI
    const mongoURI = "mongodb+srv://mujtabahaider:Hb5A6BYFtHg4BJcO@cluster0.bbogj.mongodb.net/Cluster-2?retryWrites=true&w=majority&appName=Cluster0";
    console.log("Mongo URI:", mongoURI); // Debugging
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    throw error; // Re-throw the error for further debugging if needed
  }
};

// Login handler function
const loginHandler = async (req, res) => {
  if (req.method === "POST") {
    try {
      // Replace this with actual user fetching logic
      const user = { email: "user@example.com" }; // Example user object

      // Hardcoded JWT secret
      const JWT_SECRET = "a$tr0ngS3cureK3yWith$pecialCharact3rs&Numbers#2024!";
      console.log("JWT_SECRET:", JWT_SECRET); // Debugging

      // Generate the token
      const token = jwt.sign(
        { email: user.email }, // Payload
        JWT_SECRET, // Secret key
        { expiresIn: "1h" } // Token expiration time
      );

      // Send the token in the response
      res.status(200).json({ token });
    } catch (error) {
      console.error("JWT Signing Error:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    // Handle unsupported HTTP methods
    res.status(405).json({ error: "Method not allowed" });
  }
};

// Default export connectDB and named export loginHandler
export default connectDB;
export { loginHandler };
