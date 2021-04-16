import { Router } from "express";
import * as studentController from '../controllers/students.controller'
import verifyToken from "../middlewares/tokenVerification";

const router = Router();

router.get("/",studentController.get);
router.post("/",verifyToken,studentController.create);
router.delete("/:id",verifyToken,studentController.deleteById);

export default router;