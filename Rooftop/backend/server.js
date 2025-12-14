import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import verifyRoute from "./routes/verifyRoute.js";

dotenv.config(); // 🔑 IMPORTANT

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/verify", verifyRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
