import IUserRepository from "../../../core/repositories/UserRepository/IUserRepository";
import CreateUserDto from "../../../core/repositories/UserRepository/dto/CreateUserDto";
import UserDomainModel from "../../../core/domain/models/User/User";
import User from "../../database/etities/User";
import UserMapper from "../../mappers/UserMapper/UserMapper";
import RolesEnum from "../../../core/common/enums/RolesEnum";
import Role from "../../database/etities/Role";
import UserRoles from "../../database/etities/UserRoles";
import UpdateUserAdminDto from "../../../core/repositories/UserRepository/dto/UpdateUserAdminDto";
import AddOrDeleteRoleDto from "../../../core/repositories/UserRepository/dto/AddOrDeleteRoleDto";
import ApiError from "../../../core/common/error/ApiError";
import UpdateUserPublicDto from "../../../core/repositories/UserRepository/dto/UpdateUserPublicDto";
import AddOrDeleteEducationDto from "../../../core/repositories/UserRepository/dto/AddOrDeleteEducationDto";
import Education from "../../database/etities/Education";
import UserEducations from "../../database/etities/UserEducations";
import Company from "../../database/etities/Company";
import RoleDomainModel from "../../../core/domain/models/Role/Role";
import RoleMapper from "../../mappers/RoleMapper/RoleMapper";
import EducationDomainModel from "../../../core/domain/models/Education/Education";
import EducationMapper from "../../mappers/EducationMapper/EducationMapper";

export default class UserRepositoryImpl implements IUserRepository {
    private readonly userMapper: UserMapper = new UserMapper();
    private readonly roleMapper: RoleMapper = new RoleMapper();
    private readonly educationMapper: EducationMapper = new EducationMapper();

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
        const user: User | null = await User.findOne({
            where: { email },
            include: [{model: Education}]
        });
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
            }, Education]
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
            include: [
                { model: Role },
                { model: Education }
            ]
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
    async updateUserPublic(id: number, dto: UpdateUserPublicDto, fileName: string): Promise<UserDomainModel | null> {
        const updatingUser = await User.findOne(
            { where: { id },
                include: [Role, Education]
            });
        if (! updatingUser) {
            return null;
        }

        updatingUser.firstName = dto.firstName;
        updatingUser.secondName = dto.secondName;
        updatingUser.birthday = dto.birthday;
        updatingUser.phoneNumber = dto.phoneNumber;
        updatingUser.userImage = fileName;

        await updatingUser.save();
        return this.userMapper.toDomainModel(updatingUser);
    }

    async deleteUserById(id: number): Promise<void> {
        const user = await User.findOne({ where: { id }});
        await user?.destroy();
    }

    async addUserRole(dto: AddOrDeleteRoleDto, userId: number): Promise<UserDomainModel | null> {
        const user = await User.findOne({
            where: {id: userId },
            include: [Role, Education]
        });
        if (!user) {
            throw ApiError.notFound(`There no user with ID: ${userId}`);
        }

        const addedRole = await Role.findOne({where: { roleTitle: dto.roleTitle}});
        if (!addedRole) {
            throw ApiError.notFound(`There no role with title: ${dto.roleTitle}`);
        }

        user.roles?.map(role => {
            if (role.roleTitle === dto.roleTitle) {
                throw ApiError.conflict(`User has already role: ${addedRole.roleTitle}`);
            }
        });

        await UserRoles.create({
            userId,
            roleId: addedRole.id
        });

        return this.getUserById(userId);
    }

    public async deleteUserRole(dto: AddOrDeleteRoleDto, userId: number): Promise<UserDomainModel | null> {
        const user = await User.findOne({where: { id: userId }});
        if (!user) {
            throw ApiError.notFound(`There no user with ID: ${userId}`);
        }
        const role = await Role.findOne({where: { roleTitle: dto.roleTitle}});
        if (!role) {
            throw ApiError.notFound(`There no role with title: ${dto.roleTitle}`);
        }

        const userRole = await UserRoles.findOne({
            where: {
                userId,
                roleId: role.id
            }
        });
        if (userRole) {
            await userRole.destroy();
        }

        return this.getUserById(userId);
    }

    async addEducation(id: number, dto: AddOrDeleteEducationDto): Promise<UserDomainModel | null> {
        const user = await User.findOne({
            where: { id },
            include: [Role, Education]
        });
        if (!user) {
            return null;
        }

        const education = await Education.findOne({
            where: { educationTitle: dto.educationTitle }
        });
        if (!education) {
            throw ApiError.notFound(`There no education with title: ${dto.educationTitle}`);
        }

        user.educations?.map(education => {
            if (education.educationTitle === dto.educationTitle) {
                throw ApiError.conflict(`User has already education: ${education.educationTitle}`);
            }
        })

        await UserEducations.create({
            userId: user.id,
            educationId: education.id
        });


        return await this.getUserById(id);
    }

    async deleteEducation(id: number, dto: AddOrDeleteEducationDto): Promise<UserDomainModel | null> {
        const user = await User.findOne({ where: { id } });
        if (!user) {
            return null;
        }

        const education = await Education.findOne({
            where: { educationTitle: dto.educationTitle }
        });
        if (!education) {
            throw ApiError.notFound(`There no education with title: ${dto.educationTitle}`);
        }

        const userEducation = await UserEducations.findOne({
            where: {
                userId: user.id,
                educationId: education.id
            }
        });
        await userEducation?.destroy();

        return await this.getUserById(id);
    }

    async setCompanyId(userId: number, companyId: number): Promise<UserDomainModel | null> {
        const user = await User.findOne({ where: { id: userId }, include: [Role] });
        if (!user) {
            return null;
        }
        const company = await Company.findOne({ where: { id: companyId }});
        if (!company) {
            return null;
        }
        user.companyId = company.id;
        await user.save();
        return this.userMapper.toDomainModel(user);
    }

    async getUserRoles(userId: number): Promise<RoleDomainModel[]> {
        let roles: RoleDomainModel[] = [];
        const user = await User.findOne({ where: { id: userId}, include: [Role] });
        if (user) {
            roles = user.roles.map(role => {
                return this.roleMapper.toDomainModel(role);
            });
        }
        return roles;
    }

    async unpinUserFromCompany(userId: number): Promise<UserDomainModel | null> {
        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            return null;
        }
        user.companyId = null;
        await user.save();
        return this.userMapper.toDomainModel(user);
    }

    async getUserEducations(userId: number): Promise<EducationDomainModel[]> {
        let educations: EducationDomainModel[] = [];
        const user = await User.findOne({ where: { id: userId}, include: [Education] });
        if (user) {
            educations = user.educations.map(education => {
                return this.educationMapper.toDomainModel(education);
            });
        }
        return educations;
    }


}