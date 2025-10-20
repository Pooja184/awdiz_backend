import { Router } from "express";

const authRouter=Router();

authRouter.post('/register',(req,res)=>{
    res.send("From Auth");
})

export default authRouter;