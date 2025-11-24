import { Router } from "express";
import authRoutes from "./auth";
import movieRoutes from "./movies";

const router = Router();

router.use("/auth", authRoutes);
router.use("/movies", movieRoutes);

export default router;
