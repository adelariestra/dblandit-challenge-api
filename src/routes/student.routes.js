import { Router } from "express";
import * as studentsController from '../controllers/students.controller'

const router = Router();

router.get("/",studentsController.get);

export default router;