import UserService from "../../core/services/UserService/UserService";
import User from "../database/etities/User";
import UserRepositoryImpl from "../repositoriesImpl/sequelizeRepository/UserRepositoryImpl";
import {NextFunction, Request, Response} from "express";
import CreateUserDto from "../../core/repositories/UserRepository/dto/CreateUserDto";
import {DEFAULT_USER_IMAGE_NAME} from "../../config";
import formidable from "formidable";

class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    public async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                email,
                firstName,
                secondName,
                password,
                birthday,
                phoneNumber,
            } = req.body;

            let userImage

            const dto: CreateUserDto = new CreateUserDto(
                email,
                firstName,
                secondName,
                password,
                birthday,
                phoneNumber,
                userImage || DEFAULT_USER_IMAGE_NAME
            );

            console.log(dto);

            return res.status(200)
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

}

const userService: UserService = new UserService(new UserRepositoryImpl());
export default new UserController(userService);