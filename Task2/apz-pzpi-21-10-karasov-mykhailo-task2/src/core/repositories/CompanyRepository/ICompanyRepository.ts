import CreateOrUpdateCompanyDto from "./dto/CreateOrUpdateCompanyDto";
import CompanyDomainModel from "../../domain/models/Company/Company";

export default interface ICompanyRepository {
    createCompany(dto: CreateOrUpdateCompanyDto, creatingUserId: number, companyImage: string): Promise<CompanyDomainModel>;
    getCompanyByName(companyName: string): Promise<CompanyDomainModel | null>;
    getCompanyByUserId(userId: number): Promise<CompanyDomainModel | null>;
    getCompanyById(companyId: number): Promise<CompanyDomainModel | null>;
    updateCompany(companyId: number, dto: CreateOrUpdateCompanyDto, companyImage: any): Promise<CompanyDomainModel | null>;
    deleteCompany(companyId: number): Promise<void>;
}