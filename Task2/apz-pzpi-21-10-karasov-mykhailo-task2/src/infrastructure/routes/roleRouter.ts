import express from "express";
//import roleController from '../controllers/roleController';
import RoleMapper from "../mappers/RoleMapper/roleMapper";
import RoleRepositoryImpl from "../repositoriesImpl/sequelizeRepository/roleRepositoryImpl";
import RoleService from "../../core/services/RoleService/RoleService";
import RoleController from "../controllers/roleController";
const router = express.Router();

const roleController  = new RoleController();

router.post('/', roleController.create.bind(roleController));
router.get('/', roleController.getAll.bind(roleController));
router.get('/:id', )
router.put('/:id', )
router.delete('/:id', )

export default router;