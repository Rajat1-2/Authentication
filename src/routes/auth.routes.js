import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";

const authRouter =Router();


// api /api/auth/register
authRouter.post("/register",authController.register);
//  get /api/auth/get-me
authRouter.get("/get-me",authController.getMe);
// reffresh token se new access token bnao
authRouter.get("/refreshtoken",authController.refreshtheToken);

//localhost:3000/api/auth/logout
authRouter.get("/logout", authController.logout);
//localhost:3000/api/auth/logoutAll
authRouter.get("/logoutAll",authController.logoutAll);
http: export default authRouter;