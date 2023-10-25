import express from "express";
import {
  getFingerprintByRoomNo,
  postFingerprint,
  getFingerprint,
  deleteFingerprintByDays,
} from "../controllers/fingerprintController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();
router.route("/post").post(postFingerprint);
router.route("/:id").get(getFingerprint);
router.route("/delete/:days").delete(deleteFingerprintByDays);
router.route("/:roomId").get(getFingerprintByRoomNo);
export default router;