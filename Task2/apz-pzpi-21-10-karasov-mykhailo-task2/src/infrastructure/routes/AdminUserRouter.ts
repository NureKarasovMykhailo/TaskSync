import express from "express";
import adminUserController from "../controllers/AdminUserController";
import createUserValidator from "../../core/common/validators/CreateUserValidator";
import updateUserValidator from "../../core/common/validators/UpdateUserValidator";
import publicUserController from "../controllers/PublicUserController";

const router = express.Router();

router.post(
    '/',
    createUserValidator(),
    adminUserController.createUser.bind(adminUserController)
);

router.get(
    '/',
    adminUserController.getAllUsers.bind(adminUserController)
);

router.get(
    '/:id',
    adminUserController.getUserById.bind(adminUserController)
)

router.put(
    '/:id',
    updateUserValidator(),
    adminUserController.updateUser.bind(adminUserController)
);

router.delete(
    '/:id',
    adminUserController.deleteUser.bind(adminUserController)
);

router.patch(
    '/add-role/:id',
    adminUserController.addRole.bind(adminUserController)
);

router.patch(
    '/delete-role/:id',
    adminUserController.deleteRole.bind(adminUserController)
);

router.put(
    '/add-education',
    adminUserController.addEducation.bind(publicUserController)
);

router.put(
    '/delete-education',
    adminUserController.deleteEducation.bind(publicUserController)
);

export default router;