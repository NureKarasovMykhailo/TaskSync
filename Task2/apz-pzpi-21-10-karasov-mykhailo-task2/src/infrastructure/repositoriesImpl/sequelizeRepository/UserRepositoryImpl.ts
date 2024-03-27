import IUserRepository from "../../../core/repositories/UserRepository/IUserRepository";
import CreateUserDto from "../../../core/repositories/UserRepository/dto/CreateUserDto";
import UserDomainModel from "../../../core/domain/models/User/User";
import User from "../../database/etities/User";
import UserMapper from "../../mappers/UserMapper/UserMapper";
import RolesEnum from "../../../core/common/enums/RolesEnum";
import Role from "../../database/etities/Role";
import UserRoles from "../../database/etities/UserRoles";

export default class UserRepositoryImpl implements IUserRepository {
    private readonly userMapper: UserMapper = new UserMapper();

    async createUser(dto: CreateUserDto, userImage: string, hashPassword: string): Promise<UserDomainModel> {
        const user: User = await User.create({
            ...dto,
            userImage,
            password: hashPassword
        });

        const generalUserRole: Role | null = await Role.findOne({ where: { roleTitle: RolesEnum.USER }});
        if (generalUserRole) {
            await UserRoles.create({
                userId: user.id,
                roleId: generalUserRole.id
            });
        }

        return this.userMapper.toDomainModel(user);
    }

    async getUserByEmail(email: string): Promise<UserDomainModel | null> {
        const user: User | null = await User.findOne({where: { email }});
        if (!user) {
            return null;
        }
        return this.userMapper.toDomainModel(user);
    }

}