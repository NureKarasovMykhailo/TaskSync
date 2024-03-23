import express, {Router} from "express";
import authController from '../controllers/authController';
const router: Router = express.Router();

router.post('/registration', authController.registration);
router.post('login', authController.login);
router.get('/check-auth', authController.checkAuth);

export default router;