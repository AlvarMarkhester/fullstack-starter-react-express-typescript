import { NextFunction, Request, Response } from "express"
import { ROLES } from "../auth/roles"
import { IUserDocument } from "../models/user.model"

export const checkAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) { return next() }
    res.status(401).send("Not allowed!")
  }

export const checkAccessLevel = (authLevel: ROLES) => (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as IUserDocument
  if(user?.roles.find((role) => role === authLevel) || user?.admin) return next()
  res.status(401).send("Not allowed!")
}