import IMapper from "../IMapper";
import Role from "../../database/etities/Role";
import RoleDomainModel from "../../../core/domain/models/Role/Role";

export default class RoleMapper implements IMapper<Role, RoleDomainModel> {
    toDomainModel(data: Role): RoleDomainModel {
        return new RoleDomainModel(
            data.id,
            data.roleTitle,
            data.description,
            //TODO поменять на доменую модель
            data.users
        );
    }

    toPersistenceModel(data: RoleDomainModel): Role {
        const role = new Role();
        role.id = data.id;
        role.roleTitle = data.roleTitle;
        role.description = data.description;
        return role;
    }

}