import {NextFunction, Request, Response} from "express";
import ApiError from "../../core/common/error/ApiError";

class AuthController {

    async login(req: Request, res: Response) {

    }

    async registration(req: Request, res: Response) {

    }

    async checkAuth(req: Request, res: Response, next: NextFunction) {

    }

}

export default new AuthController();