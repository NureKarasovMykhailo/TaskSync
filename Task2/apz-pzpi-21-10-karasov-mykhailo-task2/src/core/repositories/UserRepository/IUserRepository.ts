import UserDomainModel from "../../domain/models/User/User";
import CreateUserDto from "./dto/CreateUserDto";
import UpdateUserAdminDto from "./dto/UpdateUserAdminDto";

export default interface IUserRepository {
    getUserByEmail(email: string): Promise<UserDomainModel | null>;
    createUser(dto: CreateUserDto, userImage: string, hashPassword: string): Promise<UserDomainModel>;
    getUsersByRole(roleTitle: string): Promise<UserDomainModel[]>;
    getAllUsers(): Promise<UserDomainModel[]>;
    getUserById(id: number): Promise<UserDomainModel | null>;
    updateUser(id: number, dto: UpdateUserAdminDto, userImage: string): Promise<UserDomainModel | null>;
}