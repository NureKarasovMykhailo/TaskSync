import express, {Router} from "express";
const router: Router = express.Router();
import authRouter from './AuthRouter';
import roleRouter from "./RoleRouter";
import educationRouter from "./EducationRouter";
import adminUserRouter from "./AdminUserRouter";
import publicUserRouter from "./PublicUserRouter";
import publicCompanyRouter from './CompanyPublicRouter';
import scannerRouter from "./ScannerRouter";
import scannerHistoryRouter from "./ScannerHistoryRouter";
import complexityRouter from "./ComplexityRouter";
import activityRouter from "./ActivityRouter";

router.use('/education', educationRouter);
router.use('/auth', authRouter);
router.use('/role', roleRouter);
router.use('/admin-user', adminUserRouter);
router.use('/public-user', publicUserRouter)
router.use('/public-company', publicCompanyRouter);
router.use('/scanner', scannerRouter);
router.use('/scanner-history', scannerHistoryRouter);
router.use('/complexity', complexityRouter);
router.use('/activity', activityRouter);

export default router;