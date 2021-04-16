import { Router } from "express";
const router = Router();

import * as authController from "../controllers/auth.controller";

router.post("/login", authController.login);
router.post("/logout", authController.logout);

export default router;
