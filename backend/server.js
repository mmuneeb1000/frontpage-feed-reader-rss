import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import articleRoutes from "./routes/articleRoutes.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
  }),
);

app.use(express.json());

app.use("/api/articles", articleRoutes);

app.get("/", (req, res) => {
  res.send("RSS API running");
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
