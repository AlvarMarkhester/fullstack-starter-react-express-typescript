import { NextFunction, Request, Response } from "express";
import UserService from "../services/user.service";

class UserController {
    async getProfile(req: Request, res: Response, next: NextFunction) {
      UserService.getById(req.user?._id)
      .then(user => {
        return res.status(200).json(user)
      })
      .catch(err => next(err))
    }
    async getProfileById(req: Request, res: Response, next: NextFunction) {
      UserService.getById(req.params.userId)
      .then(user => {
        return res.status(200).json(user)
      })
      .catch(err => next(err))
    }
  }
  
  export default new UserController();
  