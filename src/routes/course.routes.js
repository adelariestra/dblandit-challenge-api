import { Router } from "express";
import * as courseController from '../controllers/courses.controller'

const router = Router();

router.get("/",courseController.get);
router.get("/:id",courseController.getById);
router.post("/",courseController.create);
router.delete("/:id",courseController.deleteById);

export default router;