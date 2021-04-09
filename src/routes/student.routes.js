import { Router } from "express";
const router = Router();

router.get("/",(req,res)=>{
    res.json([{
        name:"manolo",
        lname:"sanchez"
    }])
})

export default router;