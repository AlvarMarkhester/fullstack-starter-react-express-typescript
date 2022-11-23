import express from "express";
import authController from "./auth.controller";

const authRouter = express.Router();

authRouter.route("/login").post(authController.login);

authRouter.route("/logout").post(authController.logout)

authRouter.route("/session").get(authController.checkSession);

export default authRouter
