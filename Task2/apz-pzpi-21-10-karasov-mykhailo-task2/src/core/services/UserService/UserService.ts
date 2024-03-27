import IUserRepository from "../../repositories/UserRepository/IUserRepository";
import CreateUserDto from "../../repositories/UserRepository/dto/CreateUserDto";
import UserDomainModel from "../../domain/models/User/User";
import ApiError from "../../common/error/ApiError";
import {DEFAULT_USER_IMAGE_NAME} from "../../../config";
import FileManager from "../../common/uttils/FileManager";
import bcrypt from "bcrypt";

export default class UserService {
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

    private async isUserWithEmailExits(email: string): Promise<boolean> {
        const candidate: UserDomainModel | null = await this.userRepository.getUserByEmail(email);
        return candidate !== null;
    }
}