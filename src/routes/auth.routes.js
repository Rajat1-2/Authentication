import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";

const authRouter =Router();


// api /api/auth/register
authRouter.post("/register",authController.register);
// localhost:3000//api/auth/login
authRouter.post("/login",authController.login);
//  get /api/auth/get-me
authRouter.get("/get-me",authController.getMe);
// reffresh token se new access token bnao
authRouter.get("/refreshtoken",authController.refreshtheToken);

//localhost:3000/api/auth/logout
authRouter.get("/logout", authController.logout);
//localhost:3000/api/auth/logoutAll
authRouter.get("/logoutAll",authController.logoutAll);
 export default authRouter;