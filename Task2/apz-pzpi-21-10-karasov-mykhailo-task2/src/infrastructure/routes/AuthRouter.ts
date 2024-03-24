import express, {Router} from "express";
import authController from '../controllers/AuthController';
import registrationValidator from "../../core/common/validators/RegistrationValidator";
const router: Router = express.Router();
import authMiddleware from '../../core/common/middlewares/AuthMiddleware';

router.post('/registration', registrationValidator(), authController.registration.bind(authController));
router.post('/login', authController.login.bind(authController));
router.get('/check-auth', authMiddleware, authController.checkAuth.bind(authController));

export default router;