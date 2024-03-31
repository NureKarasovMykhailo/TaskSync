import express from "express";
import checkRoleMiddleware from "../../core/common/middlewares/CheckRoleMiddleware";
import RolesEnum from "../../core/common/enums/RolesEnum";
import CheckSubscribeMiddleware from "../../core/common/middlewares/CheckSubscribeMiddleware";
import SubscriptionRepositoryImpl from "../repositoriesImpl/sequelizeRepository/SubscriptionRepositoryImpl";
import createOrUpdateCompanyValidator from "../../core/common/validators/CreateOrUpdateCompanyValidator";
import PublicCompanyController from "../controllers/PublicCompanyController";
import CompanyService from "../../core/services/CompanyService/CompanyService";
import CompanyRepositoryImpl from "../repositoriesImpl/sequelizeRepository/CompanyRepositoryImpl";
import UserRepositoryImpl from "../repositoriesImpl/sequelizeRepository/UserRepositoryImpl";
import CompanyMapper from "../mappers/CompanyMapper/CompanyMapper";

const router = express.Router();

const subscriptionRepository = new SubscriptionRepositoryImpl();
const checkUserSubscription: CheckSubscribeMiddleware = new CheckSubscribeMiddleware(subscriptionRepository);

const companyService = new CompanyService(new CompanyRepositoryImpl(), new UserRepositoryImpl());
const publicCompanyController = new PublicCompanyController(companyService, new CompanyMapper());

router.post(
    '/',
    checkRoleMiddleware([RolesEnum.SUBSCRIBER]),
    checkUserSubscription.checkSubscribe.bind(checkUserSubscription),
    createOrUpdateCompanyValidator(),
    publicCompanyController.createCompany.bind(publicCompanyController)
);

router.get(
    '/'
);

router.patch(
    '/'
);

router.delete(
    '/'
)


export default router;