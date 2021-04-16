import { Router } from "express";
const router = Router();

import * as authController from "../controllers/auth.controller";

router.post("/login", authController.login);

export default router;
