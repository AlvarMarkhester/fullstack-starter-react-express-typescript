import { Request, Response, NextFunction } from "express"

export const errorLogger = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log('\x1b[33m%s\x1b[0m', err.message)
    next(err)
}

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send(err.message)
}
