import IScannerHistoryRepository from "../../../core/repositories/ScannerHistoryRepository/IScannerHistoryRepository";
import CreateOrUpdateScannerHistoryDto
    from "../../../core/repositories/ScannerHistoryRepository/dto/CreateOrUpdateScannerHistoryDto";
import ScannerHistoryDomainModel from "../../../core/domain/models/ScannerHistory/ScannerHistory";
import ScannerHistory from "../../database/etities/ScannerHistory";
import ScannerHistoryMapper from "../../mappers/ScannerHistoryMapper/ScannerHistoryMapper";
import Scanner from "../../database/etities/Scanner";
import ApiError from "../../../core/common/error/ApiError";
import User from "../../database/etities/User";

export default class ScannerHistoryRepositoryImpl implements IScannerHistoryRepository {

    private readonly scannerHistoryMapper: ScannerHistoryMapper = new ScannerHistoryMapper();

    async createScannerHistory(dto: CreateOrUpdateScannerHistoryDto): Promise<ScannerHistoryDomainModel> {
        const scannerHistory = await ScannerHistory.create({
            temperature: dto.temperature,
            pulse: dto.pulse,
            activeWorkedTime: dto.activeWorkedTime,
            userId: dto.userId,
            scannerId: dto.scannerId
        });

        return this.scannerHistoryMapper.toDomainModel(scannerHistory);
    }

    async getScannerHistoryByScannerId(scannerId: number): Promise<ScannerHistoryDomainModel[]> {
        const scannerHistories = await ScannerHistory.findAll({ where: { scannerId }});
        return scannerHistories.map(scannerHistory => {
            return this.scannerHistoryMapper.toDomainModel(scannerHistory);
        });
    }

    async deleteScannerHistoryById(id: number): Promise<void> {
        const scannerHistory = await ScannerHistory.findOne({ where: { id }});
        scannerHistory?.destroy();
        return;
    }

    async getScannerHistoryById(id: number): Promise<ScannerHistoryDomainModel | null> {
        const scannerHistory = await ScannerHistory.findOne({where: { id }});
        if (!scannerHistory) {
            return null;
        }
        return this.scannerHistoryMapper.toDomainModel(scannerHistory);
    }

    async deleteScannerHistoryByScannerId(scannerId: number): Promise<void> {
        await ScannerHistory.destroy({ where: { scannerId }});
        return;
    }

    async getAllScannerHistory(): Promise<ScannerHistoryDomainModel[]> {
        const scannerHistories = await ScannerHistory.findAll();

        return scannerHistories.map(scannerHistory => {
            return this.scannerHistoryMapper.toDomainModel(scannerHistory)
        });
    }

    async updateScannerHistory(id: number, dto: CreateOrUpdateScannerHistoryDto): Promise<ScannerHistoryDomainModel> {
        const scanner = await Scanner.findOne({ where: { id :dto.scannerId }} );
        if (!scanner) {
            throw ApiError.notFound(`There no scanner with ID: ${dto.scannerId}`);
        }

        const user = await User.findOne({where: { id: dto.userId }});
        if (!user) {
            throw ApiError.notFound(`There no user with ID: ${dto.userId}`);
        }

        if (user.companyId !== scanner.companyId) {
            throw ApiError.forbidden(`You have not access to this information`);
        }

        const scannerHistory = await ScannerHistory.findOne({ where: { id }});
        if (!scannerHistory) {
            throw ApiError.notFound(`There no scanner history with ID: ${id}`);
        }

        scannerHistory.temperature = dto.temperature;
        scannerHistory.pulse = dto.pulse;
        scannerHistory.activeWorkedTime = dto.activeWorkedTime;
        scannerHistory.userId = dto.userId;
        scannerHistory.scannerId = dto.scannerId;

        await scannerHistory.save();

        return this.scannerHistoryMapper.toDomainModel(scannerHistory);
    }


}