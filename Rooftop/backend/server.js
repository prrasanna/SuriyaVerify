import express from "express";
import cors from "cors";
import verifyRoute from "./routes/verifyRoute.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/verify", verifyRoute);

app.listen(5000, () => console.log("Server running on port 5000"));
