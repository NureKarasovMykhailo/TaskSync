import ApiError from "../error/ApiError";
import {NextFunction, Request, Response} from "express";

function errorHandlingMiddleware(err: object, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message});
    }
    return res.status(500).json({message: 'Unknown error'});
}

export default errorHandlingMiddleware;