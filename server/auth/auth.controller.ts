import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { IUserDocument } from "../models/user.model";
import authService from "./auth.service";

class AuthController {
    async login(req: Request, res: Response, next: NextFunction) {
        passport.authenticate("local", (err: Error, user: IUserDocument) => {
            if (err) { return next(err); }
            if (!user) {
                return res.status(401).send('Authentication failed')
            }
            req.logIn(user, (err) => {
                if (err) { return next(err); }
                res.status(202).send(user);
            });
        })(req, res, next);
    }

    async checkSession(req: Request, res: Response, next: NextFunction) {
        if(req.user) {
            res.send(req.user)
        }
        else{
            res.status(401).send({message: 'No valid session'})
         }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        req.logout((err) => {
            if(err) next(err)
            res.status(202).send("Logged out")
        })
    }
}
  
  export default new AuthController();
  