import {NextFunction, Request, Response} from "express";
import RoleService from "../../core/services/RoleService/RoleService";
import CreateRoleDto from "../../core/repositories/RoleRepository/dto/CreateRoleDto";
import RoleDomainModel from "../../core/domain/models/Role/Role";
import RoleRepositoryImpl from "../repositoriesImpl/sequelizeRepository/RoleRepositoryImpl";
import RoleMapper from "../mappers/RoleMapper/RoleMapper";
import ApiError from "../../core/common/error/ApiError";
import {validationResult} from "express-validator";
import formatValidationErrors from "../../core/common/uttils/ValidationErrorsUttils";

class RoleController {

    private roleMapper: RoleMapper = new RoleMapper();
    private roleService: RoleService = new RoleService(new RoleRepositoryImpl());


    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorMessages = formatValidationErrors(errors.array());
                return next(ApiError.badRequest(errorMessages.join(', ')));
            }
            const { roleTitle, description } = req.body;
            const dto: CreateRoleDto = new CreateRoleDto(roleTitle, description);
            const createdDomainRole = await this.roleService.createRole(dto);
            return res.status(201).json({role: this.roleMapper.toPersistenceModel(createdDomainRole)});
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    async getAll (req: Request, res: Response, next: NextFunction) {
        try {
            const rolesDomain = await this.roleService.getAll();
            const roles = rolesDomain.map(roleDomain => {
                return this.roleMapper.toPersistenceModel(roleDomain);
            });
            return res.status(200).json({roles: roles})
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const roleDomain = await this.roleService.getOne(Number(id));
            return res.status(200).json({role: this.roleMapper.toPersistenceModel(roleDomain)});
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { roleTitle, description } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorMessages = formatValidationErrors(errors.array());
                return next(ApiError.badRequest(errorMessages.join(', ')));
            }
            const { id } = req.params;
            const dto: CreateRoleDto = new CreateRoleDto(roleTitle, description);
            const role = this.roleMapper.toPersistenceModel(await this.roleService.updateRole(dto, Number(id)));
            return res.status(200).json({role: role});
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await this.roleService.deleteRole(Number(id));
            return res.status(200).json({})
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

}


export default RoleController
