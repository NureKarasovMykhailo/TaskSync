import ICompanyRepository from "../../repositories/CompanyRepository/ICompanyRepository";
import CreateOrUpdateCompanyDto from "../../repositories/CompanyRepository/dto/CreateOrUpdateCompanyDto";
import CompanyDomainModel from "../../domain/models/Company/Company";
import ApiError from "../../common/error/ApiError";
import IUserRepository from "../../repositories/UserRepository/IUserRepository";
import JWT from "../../common/uttils/JWT";
import FileManager from "../../common/uttils/FileManager";
import {DEFAULT_COMPANY_IMAGE_NAME} from "../../../config";
import fileManager from "../../common/uttils/FileManager";

export default class CompanyService {
    private readonly fileManager: FileManager = new FileManager();
    constructor(
        private readonly companyRepository: ICompanyRepository,
        private readonly userRepository: IUserRepository,
    ) {}

    async createCompany(dto: CreateOrUpdateCompanyDto, creatingUserId: number): Promise<string> {
        if (!await this.isCompanyNameUnique(dto.companyName)) {
            throw ApiError.conflict(`There already existed company with name: ${dto.companyName}`);
        }
        if (await this.isUserHasCompany(creatingUserId)) {
            throw ApiError.forbidden(`This user has already created company`);
        }
        let fileName = DEFAULT_COMPANY_IMAGE_NAME;
        if (dto.companyImage !== DEFAULT_COMPANY_IMAGE_NAME) {
            fileName = await this.fileManager.createFile(dto.companyImage);
        }
        console.log(dto)
        const company = await this.companyRepository.createCompany(dto, creatingUserId, fileName);
        const creatingUser = await this.userRepository.getUserById(creatingUserId);
        if (creatingUser) {
            const user = await this.userRepository.setCompanyId(creatingUserId, company.id);
            if (!user) {
                throw ApiError.notFound(`There no user with ID: ${creatingUserId}`);
            }
            console.log(user.companyId)
            const jwt = new JWT(user);
            return jwt.generateJwt();
        }
        return "";
    }

    private async isUserHasCompany(userId: number): Promise<boolean> {
        const candidateCompany = await this.companyRepository.getCompanyByUserId(userId);
        return candidateCompany !== null;
    }

    private async isCompanyNameUnique(companyName: string): Promise<boolean> {
        const candidateCompany = await this.companyRepository.getCompanyByName(companyName);
        return candidateCompany === null;
    }
}