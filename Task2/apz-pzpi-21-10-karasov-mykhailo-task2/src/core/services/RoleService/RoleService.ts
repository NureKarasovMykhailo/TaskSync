import CreateRoleDto from "../../repositories/RoleRepository/dto/CreateRoleDto";
import IRoleRepository from "../../repositories/RoleRepository/IRoleRepository";
import RoleDomainModel from "../../domain/models/Role/Role";
import ApiError from "../../common/error/ApiError";
import {validationResult} from "express-validator";
import PaginationClass from "../../common/uttils/PaginationClass";

export default class RoleService {

    constructor(readonly roleRepository: IRoleRepository) {}

    public async createRole(dto: CreateRoleDto) {
        if (await this.isRoleExist(dto.roleTitle)) {
            throw ApiError.conflict('Роль з такою назвою вже існує.');
        }

        return await this.roleRepository.createRole(dto);
    }

    public async getAll(offset: number, limit: number) {
        const roles = await this.roleRepository.getAllRoles();
        const pagination: PaginationClass<RoleDomainModel> = new PaginationClass();
        return pagination.paginateItems(roles, offset, limit);
    }

    public async getOne(id: number) {
        const role = await this.roleRepository.getRoleById(id);
        if (!role) {
            throw ApiError.notFound(`Роль з ID: ${id} не була знайдена`);
        }
        return role;
    }

    public async updateRole(dto: CreateRoleDto, id: number) {
        const role: RoleDomainModel | null = await this.roleRepository.getRoleById(id);
        if (!role) {
            throw ApiError.notFound(`Роль з ID: ${id} не була знайдена`);
        }
        if (await this.isRoleExist(dto.roleTitle) && dto.roleTitle !== role.roleTitle) {
            throw ApiError.conflict(`Роль з назвою ${dto.roleTitle} вже існує`)
        }
        const updatedRole =  await this.roleRepository.updateRole(dto, id);
        if (!updatedRole) {
            throw ApiError.notFound(`Роль з ID: ${id} не була знайдена`);
        }
        return updatedRole;
    }

    public async deleteRole(id: number) {
        await this.roleRepository.deleteRole(id);
    }

    private async isRoleExist(roleTitle: string): Promise<boolean> {
        const role: RoleDomainModel | null = await this.roleRepository.getRoleByTitle(roleTitle);
        return role !== null;
    }

}