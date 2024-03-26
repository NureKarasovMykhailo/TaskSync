import express from "express";
import userController from "../controllers/UserController";

const router = express.Router();

router.post(
    '/',
    userController.createUser.bind(userController)
);

router.put(
    '/add-role/:id',
)

export default router;