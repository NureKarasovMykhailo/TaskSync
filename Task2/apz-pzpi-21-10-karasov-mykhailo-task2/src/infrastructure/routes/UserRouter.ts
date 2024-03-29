import express from "express";
import userController from "../controllers/UserController";
import createUserValidator from "../../core/common/validators/CreateUserValidator";
import updateUserValidator from "../../core/common/validators/UpdateUserValidator";

const router = express.Router();

router.post(
    '/',
    createUserValidator(),
    userController.createUser.bind(userController)
);

router.get(
    '/',
    userController.getAllUsers.bind(userController)
);

router.get(
    '/:id',
    userController.getUserById.bind(userController)
)

router.put(
    '/:id',
    updateUserValidator(),
    userController.updateUser.bind(userController)
);

router.delete(
    '/:id',
    userController.deleteUser.bind(userController)
);

router.put(
    '/add-role/:id',
)

export default router;