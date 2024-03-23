import Company from "../Company/Company";
import ScannerHistory from "../ScannerHistory/ScannerHistory";
import RoleDomainModel from "../Role/Role";

export default class ScannerDomainModel {
    constructor(
        public readonly id: number,
        public readonly company: Company,
        public readonly scannerHistory: ScannerHistory[]
    ) {}

}