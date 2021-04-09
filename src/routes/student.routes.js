import { Router } from "express";
import * as studentController from '../controllers/students.controller'

const router = Router();

router.get("/",studentController.get);
router.post("/",studentController.create);
router.delete("/:id",studentController.deleteById);

export default router;