import { Router } from "express";
import { authenticateToken } from "../middleware/auth";
import {
	getFavorites,
	createFavorites,
	deleteFavorite,
} from "../controllers/favorites";

const router = Router();

router.get("/", authenticateToken, getFavorites);

router.post("/", authenticateToken, createFavorites);

router.delete("/:id", authenticateToken, deleteFavorite);

export default router;
