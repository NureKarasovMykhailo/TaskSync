import express from "express";
import checkRoleMiddleware from "../../core/common/middlewares/CheckRoleMiddleware";
import RolesEnum from "../../core/common/enums/RolesEnum";
import hasUserCompanyMiddleware from "../../core/common/middlewares/HasUserCompanyMiddleware";
import createOrUpdateActivityValidator from "../../core/common/validators/CreateOrUpdateActivityValidator";
import ActivityController from "../controllers/ActivityController";
import ActivityService from "../../core/services/ActivityService/ActivityService";
import ActivityRepositoryImpl from "../repositoriesImpl/sequelizeRepository/ActivityRepositoryImpl";
import ActivityMapper from "../mappers/ActivityMapper/ActivityMapper";
import EducationRepository from "../repositoriesImpl/sequelizeRepository/EducationRepository";
import ComplexityRepositoryImpl from "../repositoriesImpl/sequelizeRepository/ComplexityRepositoryImpl";
import authMiddleware from "../../core/common/middlewares/AuthMiddleware";

const router = express.Router();

const activityService = new ActivityService(new ActivityRepositoryImpl(), new EducationRepository(), new ComplexityRepositoryImpl());
const activityController = new ActivityController(activityService, new ActivityMapper());

router.post(
    '/',
    checkRoleMiddleware([RolesEnum.ADMIN, RolesEnum.COMPANY_ADMIN, RolesEnum.SUBSCRIBER]),
    hasUserCompanyMiddleware,
    createOrUpdateActivityValidator(),
    activityController.createActivity.bind(activityController)
);

router.get(
    '/',
    authMiddleware,
    hasUserCompanyMiddleware,
    activityController.getActivities.bind(activityController)
);

export default router;