import { Router } from "express";
import * as courseController from '../controllers/courses.controller'

const router = Router();

router.get("/",courseController.get);
router.post("/",courseController.create);

export default router;