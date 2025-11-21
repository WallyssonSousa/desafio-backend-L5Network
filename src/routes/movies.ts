import { Router } from "express";
import { movieController } from "../controllers/movieController";
import { authController  } from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/seach", movieController.search);
router.get("/", movieController.list);
router.get("/:id", movieController.details);

router.post("/favorite", authMiddleware, movieController.addFavorite);
router.get("/favorites", authMiddleware, movieController.listFavorites);
router.delete("/favorites/:tmdbId", authMiddleware, movieController.removeFavorite);

router.get("/views/recent", movieController.recentViews);

export default router;