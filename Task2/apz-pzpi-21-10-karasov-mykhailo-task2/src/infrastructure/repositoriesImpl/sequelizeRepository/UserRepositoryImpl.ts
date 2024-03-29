import IUserRepository from "../../../core/repositories/UserRepository/IUserRepository";
import CreateUserDto from "../../../core/repositories/UserRepository/dto/CreateUserDto";
import UserDomainModel from "../../../core/domain/models/User/User";
import User from "../../database/etities/User";
import UserMapper from "../../mappers/UserMapper/UserMapper";
import RolesEnum from "../../../core/common/enums/RolesEnum";
import Role from "../../database/etities/Role";
import UserRoles from "../../database/etities/UserRoles";
import UserRole from "../../../core/common/enums/RolesEnum";
import UpdateUserAdminDto from "../../../core/repositories/UserRepository/dto/UpdateUserAdminDto";

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

    async getUsersByRole(roleTitle: string): Promise<UserDomainModel[]> {
        let users: UserDomainModel[] = [];
        const role = await Role.findOne({where: { roleTitle } });
        if (!role) {
            return users;
        }

        const usersPersistenceModel: User[] = await User.findAll({
            include: [{
                model: Role,
                where: [{ id: role.id }]
            }]
        });

        usersPersistenceModel.map(userPersistenceModel => {
            users.push(this.userMapper.toDomainModel(userPersistenceModel));
        })

        return users;
    }

    async getAllUsers(): Promise<UserDomainModel[]> {
        const users: User[] = await User.findAll();
        let usersDomain: UserDomainModel[] = [];

        users.map(user => {
            usersDomain.push(this.userMapper.toDomainModel(user));
        });

        return usersDomain;
    }

    async getUserById(id: number): Promise<UserDomainModel | null> {
        const user = await User.findOne({
            where: { id },
            include: [{
                model: Role,
            }]
        });

        if (!user) {
            return null;
        }
        return this.userMapper.toDomainModel(user);
    }

    async updateUser(id: number, dto: UpdateUserAdminDto, userImage: string): Promise<UserDomainModel | null> {
        const updatedUser = await User.findOne({ where: { id } });
        if (!updatedUser) {
            return null;
        }

        updatedUser.email = dto.email;
        updatedUser.firstName = dto.firstName;
        updatedUser.secondName = dto.secondName;
        updatedUser.phoneNumber = dto.phoneNumber;
        updatedUser.birthday = dto.birthday;
        updatedUser.userImage = userImage;

        await updatedUser.save();
        return this.userMapper.toDomainModel(updatedUser);
    }



}