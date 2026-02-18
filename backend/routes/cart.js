import { Router } from "express";
import { authMiddelware } from "../middelware.js";
import { AddToCart, deleteCart } from "../controllers/cart.js";

const router = Router();

router.post("/cart", authMiddelware, AddToCart);
router.delete("/cart", authMiddelware, deleteCart);

export default router;
