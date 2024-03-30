import express, {Router} from "express";
const router: Router = express.Router();
import authRouter from './AuthRouter';
import roleRouter from "./RoleRouter";
import educationRouter from "./EducationRouter";
import adminUserRouter from "./AdminUserRouter";
import publicUserRouter from "./PublicUserRouter";

router.use('/education', educationRouter);
router.use('/auth', authRouter);
router.use('/role', roleRouter);
router.use('/admin-user', adminUserRouter);
router.use('/public-user', publicUserRouter)
export default router;