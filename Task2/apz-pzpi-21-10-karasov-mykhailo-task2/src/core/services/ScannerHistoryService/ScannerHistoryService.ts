import IScannerHistoryRepository from "../../repositories/ScannerHistoryRepository/IScannerHistoryRepository";
import CreateOrUpdateScannerHistoryDto
    from "../../repositories/ScannerHistoryRepository/dto/CreateOrUpdateScannerHistoryDto";
import IScannerRepository from "../../repositories/ScannerRepository/IScannerRepository";
import ApiError from "../../common/error/ApiError";

export default class ScannerHistoryService {
    constructor(
       private readonly scannerHistoryRepository: IScannerHistoryRepository,
       private readonly scannerRepository: IScannerRepository,
    ) {}

    public async createScannerHistory(dto: CreateOrUpdateScannerHistoryDto) {
        return await this.scannerHistoryRepository.createScannerHistory(dto);
    }

    public async getHistoryOfScanner(scannerId: number, companyId: number) {
        await this.checkScanner(scannerId, companyId);

        return await this.scannerHistoryRepository.getScannerHistoryByScannerId(scannerId);
    }

    public async deleteScannerHistory(scannerHistoryId: number) {
        await this.scannerHistoryRepository.deleteScannerHistoryById(scannerHistoryId);
    }

    public async getOneScannerHistory(scannerHistoryId: number) {
        const scannerHistory = await this.scannerHistoryRepository.getScannerHistoryById(scannerHistoryId);
        if (!scannerHistory) {
            throw ApiError.notFound(`There no scanner history with ID: ${scannerHistoryId}`);
        }
        return scannerHistory;
    }

    public async clearScannerHistory(scannerId: number, companyId: number) {
        await this.checkScanner(scannerId, companyId);
        await this.scannerHistoryRepository.deleteScannerHistoryByScannerId(scannerId);
        return;
    }

    private async checkScanner(scannerId: number, companyId: number): Promise<void> {
        const scanner = await this.scannerRepository.getScannerById(scannerId);
        if (!scanner) {
            throw ApiError.notFound(`There no scanner with id: ${scannerId}`);
        }
        if (scanner.companyId !== companyId) {
            throw ApiError.forbidden(`You have not access to this information`);
        }
        return;
    }
}