import express from "express";
//import roleController from '../controllers/roleController';
import RoleMapper from "../mappers/RoleMapper/RoleMapper";
import RoleRepositoryImpl from "../repositoriesImpl/sequelizeRepository/RoleRepositoryImpl";
import RoleService from "../../core/services/RoleService/RoleService";
import RoleController from "../controllers/RoleController";
import createRoleValidator from "../../core/common/validators/CreateRoleValidator";
const router = express.Router();

const roleController  = new RoleController();

router.post('/', createRoleValidator(), roleController.create.bind(roleController));
router.get('/', roleController.getAll.bind(roleController));
router.get('/:id', roleController.getOne.bind(roleController));
router.put('/:id', roleController.update.bind(roleController));
router.delete('/:id', roleController.delete.bind(roleController));

export default router;