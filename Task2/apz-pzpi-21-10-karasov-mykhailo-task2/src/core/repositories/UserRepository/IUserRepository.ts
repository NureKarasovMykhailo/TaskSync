import UserDomainModel from "../../domain/models/User/User";
import CreateUserDto from "./dto/CreateUserDto";

export default interface IUserRepository {
    getUserByEmail(email: string): Promise<UserDomainModel | null>;
    createUser(dto: CreateUserDto, userImage: string, hashPassword: string): Promise<UserDomainModel>;
}