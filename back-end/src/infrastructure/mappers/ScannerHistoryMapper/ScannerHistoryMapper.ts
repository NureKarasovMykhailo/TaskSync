import IMapper from "../IMapper";
import ScannerHistory from "../../database/etities/ScannerHistory";
import ScannerHistoryDomainModel from "../../../core/domain/models/ScannerHistory/ScannerHistory";

export default class ScannerHistoryMapper implements IMapper<ScannerHistory, ScannerHistoryDomainModel> {
    toDomainModel(data: ScannerHistory): ScannerHistoryDomainModel {
        return new ScannerHistoryDomainModel(
            data.id,
            data.temperature,
            data.pulse,
            data.activeWorkedTime,
            data.userId,
            data.scannerId,
            data.createdAt
        );
    }

    toPersistenceModel(data: ScannerHistoryDomainModel): ScannerHistory {
        const scannerHistory = new ScannerHistory();

        scannerHistory.id = data.id;
        scannerHistory.temperature = data.temperature;
        scannerHistory.pulse = data.pulse;
        scannerHistory.activeWorkedTime = data.activeWorkedTime;
        scannerHistory.userId = data.userId;
        scannerHistory.scannerId = data.scannerId;
        scannerHistory.createdAt = data.createdAt;

        return scannerHistory;
    }

}