import UserService from "../../core/services/UserService/UserService";
import User from "../database/etities/User";
import UserRepositoryImpl from "../repositoriesImpl/sequelizeRepository/UserRepositoryImpl";
import {NextFunction, Request, Response} from "express";
import CreateUserDto from "../../core/repositories/UserRepository/dto/CreateUserDto";
import {DEFAULT_USER_IMAGE_NAME} from "../../config";
import UserMapper from "../mappers/UserMapper/UserMapper";
import UserDomainModel from "../../core/domain/models/User/User";
import FileManager from "../../core/common/uttils/FileManager";
import UpdateUserAdminDto from "../../core/repositories/UserRepository/dto/UpdateUserAdminDto";

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

    public async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                roleTitle,
                email,
                limit = '10',
                page = '1' ,
                sortBy
            } = req.query;

            const offset: number = Number(page) * Number(limit) - Number(limit);

            const paginatedUserModel = await this.userService.getAllUsers(
                roleTitle as string,
                email as string,
                sortBy as string,
                offset,
                Number(limit),
            );

            const users = paginatedUserModel.items.map(userDomainModel => {
                return this.userMapper.toPersistenceModel(userDomainModel);
            });

            return res.status(200).json({
                users: users,
                pagination: {
                    totalItems: paginatedUserModel.itemsCount,
                    totalPages: paginatedUserModel.totalPages,
                    currentPage: page,
                    itemsPerPage: limit
                }
            });

        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    public async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const userDomainModel = await this.userService.getUserById(Number(id));
            const user = this.userMapper.toPersistenceModel(userDomainModel);
            console.log(user.roles)
            return res.status(200).json({ user: user, roles: user.roles });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    public async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
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

            const dto: UpdateUserAdminDto = new UpdateUserAdminDto(
                email,
                firstName,
                secondName,
                birthday,
                phoneNumber,
                userImage || DEFAULT_USER_IMAGE_NAME
            );

            const updatedUserDomain = await this.userService.updateUser(Number(id), dto);
            const user = this.userMapper.toPersistenceModel(updatedUserDomain);

            return res.status(200).json({ user: user });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async deleteUser(req: Request, res: Response, next: NextFunction) {

    }

}

const fileManager: FileManager = new FileManager();
const userService: UserService = new UserService(new UserRepositoryImpl(), fileManager);
export default new UserController(userService);