import express, {Router} from "express";
import registrationValidator from "../../core/common/validators/RegistrationValidator";
const router: Router = express.Router();
import authMiddleware from '../../core/common/middlewares/AuthMiddleware';
import AuthService from "../../core/services/AuthService/AuthService";
import AuthRepositoryImpl from "../repositoriesImpl/sequelizeRepository/AuthRepositoryImpl";
import UserMapper from "../mappers/UserMapper/UserMapper";
import AuthController from "../controllers/AuthController";
import UserRepositoryImpl from "../repositoriesImpl/sequelizeRepository/UserRepositoryImpl";

const authController =  new AuthController(new AuthService(new AuthRepositoryImpl(new UserMapper()), new UserRepositoryImpl()));

router.post('/registration', registrationValidator(), authController.registration.bind(authController));
router.post('/login', authController.login.bind(authController));
router.get('/check-auth', authMiddleware, authController.checkAuth.bind(authController));

export default router;