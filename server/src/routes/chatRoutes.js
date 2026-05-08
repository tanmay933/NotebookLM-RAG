import express from "express";

import { chatWithPdf } from "../controllers/chatController.js";

const router = express.Router();

router.post("/", chatWithPdf);

export default router;