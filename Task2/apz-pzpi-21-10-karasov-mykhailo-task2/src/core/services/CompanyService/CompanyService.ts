import ICompanyRepository from "../../repositories/CompanyRepository/ICompanyRepository";
import CreateOrUpdateCompanyDto from "../../repositories/CompanyRepository/dto/CreateOrUpdateCompanyDto";
import ApiError from "../../common/error/ApiError";
import IUserRepository from "../../repositories/UserRepository/IUserRepository";
import JWT from "../../common/uttils/JWT";
import FileManager from "../../common/uttils/FileManager";
import {DEFAULT_COMPANY_IMAGE_NAME} from "../../../config";
import RolesEnum from "../../common/enums/RolesEnum";
import CompanyDomainModel from "../../domain/models/Company/Company";
import PaginationClass from "../../common/uttils/PaginationClass";

export default class CompanyService {
    private readonly fileManager: FileManager = new FileManager();
    constructor(
        private readonly companyRepository: ICompanyRepository,
        private readonly userRepository: IUserRepository,
    ) {}

    async createCompany(dto: CreateOrUpdateCompanyDto) {
        if (await this.userRepository.getUserById(dto.creatingUserId) === null) {
            throw ApiError.badRequest(`There no user with ID: ${dto.creatingUserId}`)
        }

        if (!await this.isCompanyNameUnique(dto.companyName)) {
            throw ApiError.conflict(`There already existed company with name: ${dto.companyName}`);
        }
        if (await this.isUserHasCompany(dto.creatingUserId)) {
            throw ApiError.forbidden(`This user has already created company`);
        }

        let fileName = DEFAULT_COMPANY_IMAGE_NAME;
        if (dto.companyImage !== DEFAULT_COMPANY_IMAGE_NAME) {
            fileName = await this.fileManager.createFile(dto.companyImage);
        }

        const company = await this.companyRepository.createCompany(dto, fileName);
        const creatingUser = await this.userRepository.getUserById(dto.creatingUserId);
        if (creatingUser) {
            const user = await this.userRepository.setCompanyId(dto.creatingUserId, company.id);
            if (!user) {
                throw ApiError.notFound(`There no user with ID: ${dto.creatingUserId}`);
            }
            const roles = await this.userRepository.getUserRoles(user.id);
            const jwt = new JWT(user, roles);
            const token = jwt.generateJwt();
            return {token: token, company: company};
        }
        return "";
    }

    async getCompanyById(companyId: number) {
        const company = await this.companyRepository.getCompanyById(companyId);
        if (!company) {
            throw ApiError.notFound(`There no company with ID: ${companyId}`);
        }
        return company;
    }

    async updateCompany(companyId: number, dto: CreateOrUpdateCompanyDto) {
        if (await this.userRepository.getUserById(dto.creatingUserId) === null) {
            throw ApiError.badRequest(`There no user with ID: ${dto.creatingUserId}`)
        }

        const company = await this.getCompanyById(companyId);
        if (!await this.isCompanyNameUnique(dto.companyName) && dto.companyName !== company.companyName) {
            throw ApiError.conflict(`There are already exist company with name: ${dto.companyName}`);
        }

        let fileName = null;
        if (dto.companyImage) {
            if (company.companyImage !== DEFAULT_COMPANY_IMAGE_NAME) {
                await this.fileManager.deleteFile(company.companyImage);
            }
            fileName = await this.fileManager.createFile(dto.companyImage);
        }

        const updatedCompany = await this.companyRepository.updateCompany(companyId, dto, fileName);
        if (!updatedCompany) {
            throw ApiError.notFound(`There no company with id: ${companyId}`);
        }
        return updatedCompany;
    }

    async deleteCompanyByToken(companyId: number, userId: number) {
        const company = await this.getCompanyById(companyId);
        if (company.companyImage !== DEFAULT_COMPANY_IMAGE_NAME) {
            await this.fileManager.deleteFile(company.companyImage);
        }
        if (company.ownerId !== userId) {
            throw ApiError.forbidden(`You cannot delete other user\'s company`);
        }
        await this.companyRepository.deleteCompany(companyId);
        const user = await this.userRepository.getUserById(userId);
        if (!user) {
            throw ApiError.notFound(`There no user with ID: ${userId}`);
        }
        const roles = await this.userRepository.getUserRoles(user.id);
        const jwt = new JWT(user, roles);
        return jwt.generateJwt();

    }

    public async addEmployee(addedEmployeeId: number, companyId: number) {
        let addedEmployee = await this.userRepository.getUserById(addedEmployeeId);
        if (!addedEmployee) {
            throw ApiError.notFound(`There no user with ID: ${addedEmployeeId}`);
        }
        if (addedEmployee.companyId) {
            throw ApiError.conflict(`User with id: ${addedEmployeeId} has already worked in company`);
        }

        addedEmployee = await this.userRepository.setCompanyId(addedEmployeeId, companyId);
        if (!addedEmployee) {
            throw ApiError.internalServerError(`Error with adding employee`);
        }

        return addedEmployee;
    }

    public async deleteEmployee(deletingUserId: number, companyId: number) {
        const deletingUser = await this.userRepository.getUserById(deletingUserId);

        if (!deletingUser) {
            throw ApiError.notFound(`There no user with ID: ${deletingUserId}`);
        }

        if (deletingUser.companyId !== companyId) {
            throw ApiError.forbidden(`You cannot delete user of other company`);
        }

        const deletingUserRoles = await this.userRepository.getUserRoles(deletingUserId);
        deletingUserRoles.map(role => {
            if (role.roleTitle === RolesEnum.SUBSCRIBER) {
                throw ApiError.forbidden(`You cannot delete user with role: ${RolesEnum.SUBSCRIBER}`);
            }
        });
        const unpinUser = await this.userRepository.unpinUserFromCompany(deletingUserId);
        if (!unpinUser) {
            throw ApiError.internalServerError(`Unexpected error`);
        }
        const roles = await this.userRepository.getUserRoles(unpinUser.id);
        const jwt = new JWT(unpinUser, roles);
        return jwt.generateJwt();
    }

    public async getCompanies(companyName: string, sortBy: string, offset: number, limit: number) {
        let companies: CompanyDomainModel[] = [];

        if (companyName) {
            const company = await this.companyRepository.getCompanyByTitle(companyName);
            if (company) {
                companies.push(company);
            }
        } else {
            companies = await this.companyRepository.getAllCompanies();

            if (sortBy) {
                companies = this.sortCompany(sortBy, companies);
            }
        }
        console.log(companies)

        const pagination: PaginationClass<CompanyDomainModel> = new PaginationClass();

        return pagination.paginateItems(companies, offset, limit);

    }

    public async deleteCompany(companyId: number) {
        const company = await this.getCompanyById(companyId);
        if (company.companyImage !== DEFAULT_COMPANY_IMAGE_NAME) {
            await this.fileManager.deleteFile(company.companyImage);
        }

        await this.companyRepository.deleteCompany(companyId);
        return;
    }

    private async isUserHasCompany(userId: number): Promise<boolean> {
        const candidateCompany = await this.companyRepository.getCompanyByUserId(userId);
        return candidateCompany !== null;
    }

    private async isCompanyNameUnique(companyName: string): Promise<boolean> {
        const candidateCompany = await this.companyRepository.getCompanyByName(companyName);
        return candidateCompany === null;
    }

    private sortCompany(sortBy: string, companies: CompanyDomainModel[]) {
        if (sortBy ===  'asc') {
            companies.sort((a, b) => a.companyName.localeCompare(b.companyName));
        } else if (sortBy === 'desc') {
            companies.sort((a, b) => b.companyName.localeCompare(a.companyName));
        }
        return companies;
    }
}