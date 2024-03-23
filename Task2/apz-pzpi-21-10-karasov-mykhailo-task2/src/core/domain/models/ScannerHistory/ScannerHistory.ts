import User from "../User/User";
import Scanner from "../Scanner/Scanner";
import RoleDomainModel from "../Role/Role";

export default class ScannerHistoryDomainModel {
    constructor(
        public readonly id: number,
        public readonly temperature: number,
        public readonly pulse: number,
        public readonly activeWorkedTime: number,
        public readonly user: User,
        public readonly scanner: Scanner
) {}
}