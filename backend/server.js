import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import articleRoutes from "./routes/articleRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());

app.use("/api/articles", articleRoutes);

app.get("/", (req, res) => {
  res.send("RSS API running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
