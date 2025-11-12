import { Router } from "express";
import { getCurrentUser, login, register } from "../controllers/user.controller.js";

const authRouter=Router();

authRouter.post('/register',register)

authRouter.post('/login',login)


authRouter.get("/get-current-user", getCurrentUser );
export default authRouter;