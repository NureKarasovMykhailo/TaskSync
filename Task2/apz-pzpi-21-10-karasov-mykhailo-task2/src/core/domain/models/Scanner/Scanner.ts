import Company from "../Company/Company";
import ScannerHistory from "../ScannerHistory/ScannerHistory";

export default class Scanner {
    constructor(
        public readonly id: number,
        public readonly company: Company,
        public readonly scannerHistory: ScannerHistory[]
    ) {}

}