import UserService from "../../core/services/UserService/UserService";
import User from "../database/etities/User";
import UserRepositoryImpl from "../repositoriesImpl/sequelizeRepository/UserRepositoryImpl";
import {NextFunction, Request, Response} from "express";
import CreateUserDto from "../../core/repositories/UserRepository/dto/CreateUserDto";
import {DEFAULT_USER_IMAGE_NAME} from "../../config";
import UserMapper from "../mappers/UserMapper/UserMapper";
import UserDomainModel from "../../core/domain/models/User/User";
import FileManager from "../../core/common/uttils/FileManager";

class UserController {
    private readonly userMapper: UserMapper = new UserMapper();

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

            let userImage;
            // @ts-ignore
            if (req.files) {
                userImage = req.files.userImage;
            }

            const dto: CreateUserDto = new CreateUserDto(
                email,
                firstName,
                secondName,
                password,
                birthday,
                phoneNumber,
                userImage || DEFAULT_USER_IMAGE_NAME
            );

            const userDomainModel: UserDomainModel = await this.userService.createUser(dto);
            const user: User = this.userMapper.toPersistenceModel(userDomainModel);

            return res.status(201).json({user: user});
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

}

const fileManager: FileManager = new FileManager();
const userService: UserService = new UserService(new UserRepositoryImpl(), fileManager);
export default new UserController(userService);