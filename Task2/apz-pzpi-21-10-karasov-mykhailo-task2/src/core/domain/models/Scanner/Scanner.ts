
export default class ScannerDomainModel {
    constructor(
        public readonly id: number,
        public readonly companyId: number | null,
        public readonly userId: number | null,
        public readonly description: string | null
    ) {}

}