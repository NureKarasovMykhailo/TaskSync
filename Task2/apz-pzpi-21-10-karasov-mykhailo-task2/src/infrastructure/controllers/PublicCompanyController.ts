import {NextFunction, Response, Request} from "express";
import {DEFAULT_COMPANY_IMAGE_NAME} from "../../config";
import CreateOrUpdateCompanyDto from "../../core/repositories/CompanyRepository/dto/CreateOrUpdateCompanyDto";
import CompanyService from "../../core/services/CompanyService/CompanyService";
import CompanyMapper from "../mappers/CompanyMapper/CompanyMapper";

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
}