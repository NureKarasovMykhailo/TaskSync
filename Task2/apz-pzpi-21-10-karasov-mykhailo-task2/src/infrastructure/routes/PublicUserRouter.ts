import express from "express";
import publicUserController from "../controllers/PublicUserController";
import updateUserPublicValidator from "../../core/common/validators/UpdateUserPublicValidator";
import authMiddleware from "../../core/common/middlewares/AuthMiddleware";

const router = express.Router();

router.patch(
    '/',
    authMiddleware,
    updateUserPublicValidator(),
    publicUserController.updateUser.bind(publicUserController)
);

router.put(
    '/add-education',
    authMiddleware,
    publicUserController.addEducation.bind(publicUserController)
);

router.put(
    '/delete-education',
    authMiddleware,
    publicUserController.deleteEducation.bind(publicUserController)
);

router.post(
    '/subscribe',
    authMiddleware,
    publicUserController.subscribe.bind(publicUserController)
);

export default router;