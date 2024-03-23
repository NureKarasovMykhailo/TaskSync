import express, {Router} from "express";
const router: Router = express.Router();
import authRouter from './authRouter';
import roleRouter from "./roleRouter";


router.use('/auth', authRouter);
router.use('/role', roleRouter);

export default router;