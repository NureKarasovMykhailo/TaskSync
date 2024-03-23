import CreateRoleDto from "../../repositories/RoleRepository/dto/createRole.dto";
import IRoleRepository from "../../repositories/RoleRepository/IRoleRepository";
import RoleDomainModel from "../../domain/models/Role/Role";
import ApiError from "../../common/error/ApiError";

export default class RoleService {

    constructor(readonly roleRepository: IRoleRepository) {}

    async createRole(dto: CreateRoleDto): Promise<RoleDomainModel> {
        if (await this.isRoleExist(dto.roleTitle)) {
            throw ApiError.conflict('Така роль вже існує');
        }
        return await this.roleRepository.create(dto);
    }

    async getAllRoles(): Promise<RoleDomainModel[]> {
        return await this.roleRepository.getAll();
    }

    private async isRoleExist(roleTitle: string): Promise<boolean> {
        const role: RoleDomainModel = await this.roleRepository.getByTitle(roleTitle);
        return role !== null;
    }

}