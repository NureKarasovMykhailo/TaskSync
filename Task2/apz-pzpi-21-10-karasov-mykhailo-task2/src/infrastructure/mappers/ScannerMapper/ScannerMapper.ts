import IMapper from "../IMapper";
import ScannerDomainModel from "../../../core/domain/models/Scanner/Scanner";
import Scanner from "../../database/etities/Scanner";

export default class ScannerMapper implements IMapper<Scanner, ScannerDomainModel> {
    toDomainModel(data: Scanner): ScannerDomainModel {
        return new ScannerDomainModel(
            data.id,
            data.companyId,
            data.userId,
            data.description
        );
    }

    toPersistenceModel(data: ScannerDomainModel): Scanner {
        const scanner = new Scanner();
        scanner.id = data.id;
        scanner.userId = data.userId;
        scanner.companyId = data.companyId;
        scanner.description = data.description;

        return scanner;
    }
}