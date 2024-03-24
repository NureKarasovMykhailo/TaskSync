import express, {Router} from "express";
const router: Router = express.Router();
import authRouter from './AuthRouter';
import roleRouter from "./RoleRouter";
import educationRouter from "./EducationRouter";

router.use('/education', educationRouter);
router.use('/auth', authRouter);
router.use('/role', roleRouter);

export default router;