import CreateRoleDto from "./dto/createRole.dto";
import Role from "../../domain/models/Role/Role";
import RoleDomainModel from "../../domain/models/Role/Role";

export default interface IRoleRepository {
    create(dto: CreateRoleDto): Promise<RoleDomainModel>;
    update(dto: CreateRoleDto, id: number): Promise<RoleDomainModel>;
    getAll(): Promise<RoleDomainModel[]>;
    getById(id: number): Promise<RoleDomainModel | null>;
    getByTitle(title: string): Promise<RoleDomainModel | null>;
}