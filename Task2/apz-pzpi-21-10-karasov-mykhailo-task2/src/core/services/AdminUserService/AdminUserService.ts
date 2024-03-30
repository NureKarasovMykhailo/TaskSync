import IUserRepository from "../../repositories/UserRepository/IUserRepository";
import CreateUserDto from "../../repositories/UserRepository/dto/CreateUserDto";
import UserDomainModel from "../../domain/models/User/User";
import ApiError from "../../common/error/ApiError";
import {DEFAULT_USER_IMAGE_NAME} from "../../../config";
import FileManager from "../../common/uttils/FileManager";
import bcrypt from "bcrypt";
import PaginationClass from "../../common/uttils/PaginationClass";
import UpdateUserAdminDto from "../../repositories/UserRepository/dto/UpdateUserAdminDto";
import AddOrDeleteRoleDto from "../../repositories/UserRepository/dto/AddOrDeleteRoleDto";
import UserRole from "../../common/enums/RolesEnum";

export default class AdminUserService {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly fileManager: FileManager
    ) {}

    public async createUser(dto: CreateUserDto): Promise<UserDomainModel> {
        if (await this.isUserWithEmailExits(dto.email)) {
            throw ApiError.conflict('User with this email already exist');
        }
        let fileName: string = DEFAULT_USER_IMAGE_NAME;
        if (dto.userImage !== DEFAULT_USER_IMAGE_NAME) {
            fileName = await this.fileManager.createFile(dto.userImage);
        }
        const hashedPassword = bcrypt.hashSync(dto.password, 5);

        return await this.userRepository.createUser(dto, fileName, hashedPassword);
    }

    public async getAllUsers(
        roleTitle: string,
        email: string,
        sortBy: string,
        offset: number,
        limit: number) {
        let users: UserDomainModel[] = [];
        if (email) {
            const user = await this.userRepository.getUserByEmail(email);
            if (user) {
                users.push(user);
            }
        }

        if (roleTitle) {
            users = await this.userRepository.getUsersByRole(roleTitle);
        }

        if (!roleTitle && !email) {
            users = await this.userRepository.getAllUsers();
        }

        if (sortBy) {
            if (sortBy ===  'asc') {
                users.sort((a, b) => a.secondName.localeCompare(b.secondName));
            } else if (sortBy === 'desc') {
                users.sort((a, b) => b.secondName.localeCompare(a.secondName));
            }
        }

        const pagination: PaginationClass<UserDomainModel> = new PaginationClass();

        return pagination.paginateItems(users, offset, limit);
    }

    public async getUserById(id: number): Promise<UserDomainModel> {
        const user = await this.userRepository.getUserById(id);
        if (!user) {
            throw ApiError.notFound(`There no user with id: ${id}`);
        }
        return user;
    }

    public async updateUser(id: number, dto: UpdateUserAdminDto): Promise<UserDomainModel> {
        const user = await this.userRepository.getUserById(id);

        if (!user) {
            throw ApiError.notFound(`There no user with ID: ${id}`);
        }

        if (await this.isUserWithEmailExits(dto.email) && dto.email !== user.email) {
            throw ApiError.conflict(`User with this email has already existed`);
        }

        let fileName: string;
        if (dto.userImage !== DEFAULT_USER_IMAGE_NAME) {
            if (user.userImage !== DEFAULT_USER_IMAGE_NAME) {
                await this.fileManager.deleteFile(user.userImage);
            }
            fileName = await this.fileManager.createFile(dto.userImage);
        } else {
            fileName = user.userImage;
        }

        const updatedUser = await this.userRepository.updateUser(id, dto, fileName);
        if (!updatedUser) {
            throw ApiError.notFound(`There no user with ID: ${id}`);
        }
        return updatedUser;
    }

    async deleteUserById(id: number): Promise<void> {
        const deletedUser = await this.userRepository.getUserById(id);
        if (deletedUser) {
            if (deletedUser.userImage !== DEFAULT_USER_IMAGE_NAME) {
                await this.fileManager.deleteFile(deletedUser.userImage);
            }
            await this.userRepository.deleteUserById(id);
        }

        return;
    }

    async addUserRole(id: number, dto: AddOrDeleteRoleDto): Promise<UserDomainModel> {
        const user =  await this.userRepository.addUserRole(dto, id);
        if (!user) {
            throw ApiError.notFound(`There no user with ID: ${id}`);
        }
        return user;
    }

    public async deleteUserRole(dto: AddOrDeleteRoleDto, userId: number): Promise<UserDomainModel> {
        if (dto.roleTitle === UserRole.USER) {
            throw ApiError.forbidden(`You cannot delete ${UserRole.USER} role`);
        }
        const user = await this.userRepository.deleteUserRole(dto, userId);
        if (!user) {
            throw ApiError.notFound(`There no user with id: ${userId}`);
        }
        return user;
    }

    private async isUserWithEmailExits(email: string): Promise<boolean> {
        const candidate: UserDomainModel | null = await this.userRepository.getUserByEmail(email);
        return candidate !== null;
    }
}