import AdminUserService from "../../core/services/AdminUserService/AdminUserService";
import User from "../database/etities/User";
import UserRepositoryImpl from "../repositoriesImpl/sequelizeRepository/UserRepositoryImpl";
import {NextFunction, Request, Response} from "express";
import CreateUserDto from "../../core/repositories/UserRepository/dto/CreateUserDto";
import {DEFAULT_USER_IMAGE_NAME} from "../../config";
import UserMapper from "../mappers/UserMapper/UserMapper";
import UserDomainModel from "../../core/domain/models/User/User";
import FileManager from "../../core/common/uttils/FileManager";
import UpdateUserAdminDto from "../../core/repositories/UserRepository/dto/UpdateUserAdminDto";
import AddOrDeleteRoleDto from "../../core/repositories/UserRepository/dto/AddOrDeleteRoleDto";
import PublicUserService from "../../core/services/PublicUserService/PublicUserService";
import AddOrDeleteEducationDto from "../../core/repositories/UserRepository/dto/AddOrDeleteEducationDto";

class AdminUserController {
    private readonly userMapper: UserMapper = new UserMapper();

    constructor(
        private readonly userService: AdminUserService,
        private readonly publicUserService: PublicUserService
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
        try {
            const { id } = req.params;
            await this.userService.deleteUserById(Number(id));
            return res.status(200).json({});
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async addRole(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { roleTitle } = req.body;
            const dto: AddOrDeleteRoleDto = new AddOrDeleteRoleDto(roleTitle);
            const userDomainModel = await this.userService.addUserRole(Number(id), dto);
            const user = this.userMapper.toPersistenceModel(userDomainModel);
            return res.status(200).json({ user: user, roles: user.roles});
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async deleteRole(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { roleTitle } = req.body;

            const dto: AddOrDeleteRoleDto = new AddOrDeleteRoleDto(roleTitle);

            const userDomainModel = await this.userService.deleteUserRole(dto, Number(id));
            const user = this.userMapper.toPersistenceModel(userDomainModel);
            return res.status(200).json({ user: user, roles: user.roles});
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    public async addEducation(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { educationTitle } = req.body;
            const dto: AddOrDeleteEducationDto = new AddOrDeleteEducationDto(educationTitle);

            await this.publicUserService.addEducation(Number(id), dto);
            const userDomainModel = await this.userService.getUserById(Number(id));
            const user = this.userMapper.toPersistenceModel(userDomainModel);
            return res.status(200).json({ user: user, role: user.roles, educations: user.educations});
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    public async deleteEducation(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { educationTitle } = req.body;
            const dto: AddOrDeleteEducationDto = new AddOrDeleteEducationDto(educationTitle);

            await this.publicUserService.deleteEducation(Number(id), dto);
            const userDomainModel = await this.userService.getUserById(Number(id));
            const user = this.userMapper.toPersistenceModel(userDomainModel);
            return res.status(200).json({ user: user, role: user.roles, educations: user.educations});
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

}

const fileManager: FileManager = new FileManager();
const publicUserService = new PublicUserService(new UserRepositoryImpl())
const userService: AdminUserService = new AdminUserService(new UserRepositoryImpl(), fileManager);

export default new AdminUserController(userService, publicUserService);