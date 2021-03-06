import { Router } from "express";
import * as courseController from '../controllers/courses.controller'

const router = Router();

router.get("/",courseController.get);
router.get("/:id",courseController.getById);
router.post("/",courseController.create);
router.delete("/:id",courseController.deleteById);

router.post("/:id/students",courseController.addStudent);
router.delete("/:id/students/:studentId",courseController.removeStudent);

router.get("/:id/students",courseController.getStudents);
router.get("/:id/students/best",courseController.getBestStudent);

export default router;