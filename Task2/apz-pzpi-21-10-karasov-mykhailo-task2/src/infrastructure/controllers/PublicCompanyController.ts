import {NextFunction, Response, Request} from "express";
import {DEFAULT_COMPANY_IMAGE_NAME} from "../../config";
import CreateOrUpdateCompanyDto from "../../core/repositories/CompanyRepository/dto/CreateOrUpdateCompanyDto";
import CompanyService from "../../core/services/CompanyService/CompanyService";
import CompanyMapper from "../mappers/CompanyMapper/CompanyMapper";
import ApiError from "../../core/common/error/ApiError";
import {validationResult} from "express-validator";
import formatValidationErrors from "../../core/common/uttils/ValidationErrorsUttils";

export default class PublicCompanyController {
    constructor(
       private readonly companyService: CompanyService,
       private readonly companyMapper: CompanyMapper
    ) {}

    public async createCompany(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                companyName,
                description
            } = req.body;

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorMessages = formatValidationErrors(errors.array());
                return next(ApiError.badRequest(errorMessages.join(', ')));
            }

            let companyImage = DEFAULT_COMPANY_IMAGE_NAME;
            if (req.files) {
                // @ts-ignore
                companyImage = req.files.companyImage;
            }

            const dto: CreateOrUpdateCompanyDto = new CreateOrUpdateCompanyDto(
                companyName,
                description,
                companyImage
            );

            // @ts-ignore
            const token = await this.companyService.createCompany(dto, req.user.id);
            return res.status(201).json({ token: token });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    public async getCompany(req: Request, res: Response, next: NextFunction) {
        try {
            // @ts-ignore
            if (req.user.companyId) {
                // @ts-ignore
                const companyDomainModel = await this.companyService.getCompanyById(Number(req.user.companyId));
                const company = this.companyMapper.toPersistenceModel(companyDomainModel);
                return res.status(200).json({ company: company });
            } else {
                return next(ApiError.notFound(`You have not any company`));
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    public async updateCompany(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                companyName,
                description,
            } = req.body;
            let companyImage = null;
            // @ts-ignore
            if (req.files) {
                companyImage = req.files.companyImage;
            }

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorMessages = formatValidationErrors(errors.array());
                return next(ApiError.badRequest(errorMessages.join(', ')));
            }

            const dto: CreateOrUpdateCompanyDto = new CreateOrUpdateCompanyDto(companyName, description, companyImage);
            // @ts-ignore
            if (req.user.companyId) {
                // @ts-ignore
                const updatedCompanyDomain = await this.companyService.updateCompany(req.user.companyId, dto);
                const updatedCompany = this.companyMapper.toPersistenceModel(updatedCompanyDomain);
                return res.status(200).json({ company: updatedCompany } );
            } else {
                return next(ApiError.notFound(`You have not any company`));
            }

        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    public async deleteCompany(req: Request, res: Response, next: NextFunction) {
        try {
            // @ts-ignore
            if (req.user.companyId) {
                // @ts-ignore
                await this.companyService.deleteCompanyByToken(req.user.companyId, req.user.id);
                return res.status(200).json({});
            } else {
                return next(ApiError.notFound(`You have not any company`));
            }

        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}