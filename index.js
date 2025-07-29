const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config(); // Load .env variables

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to DB
connectDB().catch((err) => {
  console.error("Failed to connect to DB:", err);
  process.exit(1);
});

// Routes
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");
const commentRoutes = require("./routes/commentRoutes");

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

// Catch-all for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// Server Start
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
