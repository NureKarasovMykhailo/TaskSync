import {NextFunction, Response} from "express";
import ApiError from "../error/ApiError";

function hasUserCompanyMiddleware(req: Request, res: Response, next: NextFunction) {
    // @ts-ignore
    if (req.user.companyId) {
        return next(ApiError.forbidden(`You already have worked in company`));
    } else {
        next();
    }
}