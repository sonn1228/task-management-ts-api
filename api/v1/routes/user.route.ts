import { Router } from "express";
const router: Router = Router();
import * as controller from "../controllers/user.controller";
import { requireAuth } from "../middlewares/auth.middleware";

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/detail", requireAuth, controller.detail);

export const userRoutes: Router = router;
