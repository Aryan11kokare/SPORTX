import { Router } from "express";
import { authMiddelware } from "../middelware.js";
import { deleteReview, ItemReview } from "../controllers/review.js";

const router = Router();

router.post("/review", authMiddelware, ItemReview);
router.delete("/review", authMiddelware, deleteReview);

export default router;
