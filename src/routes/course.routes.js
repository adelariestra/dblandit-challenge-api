import { Router } from "express";
import * as courseController from '../controllers/courses.controller'
import verifyToken from "../middlewares/tokenVerification";

const router = Router();

router.get("/",courseController.get);
router.get("/:id",courseController.getById);
router.post("/",verifyToken,courseController.create);
router.delete("/:id",verifyToken,courseController.deleteById);

router.post("/:id/students",verifyToken,courseController.addStudent);
router.delete("/:id/students/:studentId",verifyToken,courseController.removeStudent);

router.get("/:id/students",courseController.getStudents);
router.get("/:id/students/best",courseController.getBestStudent);

export default router;