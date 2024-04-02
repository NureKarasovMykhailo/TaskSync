import IScannerRepository from "../../../core/repositories/ScannerRepository/IScannerRepository";
import CreateOrUpdateScannerDto from "../../../core/repositories/ScannerRepository/dto/CreateOrUpdateScannerDto";
import ScannerDomainModel from "../../../core/domain/models/Scanner/Scanner";
import Scanner from "../../database/etities/Scanner";
import ScannerMapper from "../../mappers/ScannerMapper/ScannerMapper";
import User from "../../database/etities/User";
import ApiError from "../../../core/common/error/ApiError";
import Company from "../../database/etities/Company";

export default class ScannerRepositoryImpl implements IScannerRepository {
    private readonly scannerMapper: ScannerMapper = new ScannerMapper();

    async createScanner(dto: CreateOrUpdateScannerDto): Promise<ScannerDomainModel> {
        const user = await User.findOne({ where: {id: dto.userId}});

        const company = await Company.findOne({ where: { id: dto.companyId }});
        if (!company) {
            throw ApiError.notFound(`There no company with ID: ${dto.companyId}`);
        }

        const scanner = await Scanner.create({
            description:  dto.description,
            userId: user?.id,
            companyId: dto.companyId
        });

        return this.scannerMapper.toDomainModel(scanner);
    }

    async getScannerById(id: number): Promise<ScannerDomainModel | null> {
        const scanner = await Scanner.findOne({ where: { id } });
        if (!scanner) {
            return null;
        }
        return this.scannerMapper.toDomainModel(scanner);
    }

    async updateScanner(dto: CreateOrUpdateScannerDto, id: number): Promise<ScannerDomainModel> {
        const user = await User.findOne({ where: {id: dto.userId}});

        const company = await Company.findOne({ where: { id: dto.companyId }});
        if (!company) {
            throw ApiError.notFound(`There no company with ID: ${dto.companyId}`);
        }

        const scanner = await Scanner.findOne({where: { id }});
        if (!scanner) {
            throw ApiError.notFound(`There no scanner with ID: ${id}`);
        }
        scanner.userId = user?.id || null;
        scanner.companyId = company.id;
        scanner.description = dto.description;
        await scanner.save();
        return this.scannerMapper.toDomainModel(scanner);
    }

    async deleteScanner(id: number): Promise<void> {
        const scanner = await Scanner.findOne({where: { id }});
        if (!scanner) {
            throw ApiError.notFound(`There no scanner with ID: ${id}`);
        }
        await scanner.destroy();
        return;
    }

    async getScanners(): Promise<ScannerDomainModel[]> {
        let scannersDomainModel: ScannerDomainModel[] = [];
        const scanners = await Scanner.findAll();
        scannersDomainModel = scanners.map(scanner => {
            return this.scannerMapper.toDomainModel(scanner)
        });
        return scannersDomainModel;
    }

    async getScannersByCompany(companyId: number): Promise<ScannerDomainModel[]> {
        let scannersDomainModel: ScannerDomainModel[] = [];
        const scanners = await Scanner.findAll({where: { companyId }});
        scannersDomainModel = scanners.map(scanner => {
            return this.scannerMapper.toDomainModel(scanner)
        });
        return scannersDomainModel;
    }


}