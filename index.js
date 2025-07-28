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
connectDB();

// Routes
const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/users");
const commentRoutes = require("./routes/comments");

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

// Server Start
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
