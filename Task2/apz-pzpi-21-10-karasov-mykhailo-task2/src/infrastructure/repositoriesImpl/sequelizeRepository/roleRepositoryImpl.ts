import IRoleRepository from "../../../core/repositories/RoleRepository/IRoleRepository";
import CreateRoleDto from "../../../core/repositories/RoleRepository/dto/createRole.dto";
import RoleDomainModel from "../../../core/domain/models/Role/Role";
import ApiError from "../../../core/common/error/ApiError";
import RoleMapper from "../../mappers/RoleMapper/roleMapper";
import Role from "../../database/etities/Role";

export default class RoleRepositoryImpl implements  IRoleRepository {

    private roleMapper: RoleMapper = new RoleMapper();

    async create(dto: CreateRoleDto): Promise<RoleDomainModel> {
        const role = await Role.create({...dto});
        return this.roleMapper.toDomainModel(role);
    }

    async getAll(): Promise<RoleDomainModel[]> {
        const roles: Role[] = await Role.findAll();
        return roles.map(role => {
            return this.roleMapper.toDomainModel(role);
        });
    }

    getById(id: number): Promise<RoleDomainModel | null> {
        throw ApiError
    }

    async getByTitle(title: string): Promise<RoleDomainModel | null> {
        const role = await Role.findOne({where: {roleTitle: title}});
        if (role) {
            return this.roleMapper.toDomainModel(role);
        } else {
            return null;
        }
    }

    update(dto: CreateRoleDto, id: number): Promise<RoleDomainModel> {
        throw ApiError
    }
}