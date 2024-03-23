import {Request, Response} from "express";
import RoleService from "../../core/services/RoleService/RoleService";
import CreateRoleDto from "../../core/repositories/RoleRepository/dto/createRole.dto";
import RoleDomainModel from "../../core/domain/models/Role/Role";
import RoleRepositoryImpl from "../repositoriesImpl/sequelizeRepository/roleRepositoryImpl";
import RoleMapper from "../mappers/RoleMapper/roleMapper";
import ApiError from "../../core/common/error/ApiError";

class RoleController {

    private roleMapper: RoleMapper = new RoleMapper();
    private roleService: RoleService = new RoleService(new RoleRepositoryImpl());


    async create(req: Request, res: Response) {
        try {
            const { roleTitle, description }: CreateRoleDto = req.body;
            const createRoleDto = new CreateRoleDto(roleTitle, description);
            const createdRole: RoleDomainModel = await this.roleService.createRole(createRoleDto);
            res.status(201).json({ role: this.roleMapper.toPersistenceModel(createdRole) });
        } catch (error) {
            if (error instanceof ApiError) {
                return res.status(error.status).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    }

    async getAll (req: Request, res: Response) {
        try {
            const rolesDomain: RoleDomainModel[] = await this.roleService.getAllRoles();
            const roles = rolesDomain.map(roleDomain => {
                return this.roleMapper.toPersistenceModel(roleDomain);
            });
            res.status(200).json({ roles });
        } catch (error) {
            if (error instanceof ApiError) {
                return res.status(error.status).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    }

    async getOne(req: Request, res: Response) {

    }

    async Update(req: Request, res: Response) {

    }

    async delete(req: Request, res: Response) {

    }

}


export default RoleController
