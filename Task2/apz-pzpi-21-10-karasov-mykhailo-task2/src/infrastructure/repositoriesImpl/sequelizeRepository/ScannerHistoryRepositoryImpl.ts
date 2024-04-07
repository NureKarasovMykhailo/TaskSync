import IScannerHistoryRepository from "../../../core/repositories/ScannerHistoryRepository/IScannerHistoryRepository";
import CreateOrUpdateScannerHistoryDto
    from "../../../core/repositories/ScannerHistoryRepository/dto/CreateOrUpdateScannerHistoryDto";
import ScannerHistoryDomainModel from "../../../core/domain/models/ScannerHistory/ScannerHistory";
import ScannerHistory from "../../database/etities/ScannerHistory";
import ScannerHistoryMapper from "../../mappers/ScannerHistoryMapper/ScannerHistoryMapper";

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
}