import express from "express";
import verifyController from "../controllers/verifyController.js";

const router = express.Router();

router.post("/", verifyController.verifyLocation);

export default router;
