import ActivityDomainModel from "../../domain/models/Acitivity/Activity";
import UserDomainModel from "../../domain/models/User/User";
import ScannerHistoryDomainModel from "../../domain/models/ScannerHistory/ScannerHistory";
import CoefficientsManager from "./CoefficientsManager";

export default class Timetable {
    private _activies: ActivityDomainModel[]
    private _users: UserDomainModel[];
    private _scannerHistory: ScannerHistoryDomainModel[];

    constructor (activities: ActivityDomainModel[], users: UserDomainModel[], scannerHistory: ScannerHistoryDomainModel[]) {
        this._activies = activities;
        this._users = users;
        this._scannerHistory = scannerHistory;
    }



    private getLastUserScannerHistory(scannerHistories: ScannerHistoryDomainModel[], user: UserDomainModel): ScannerHistoryDomainModel | null {
        let scannerHistoryOfUser = scannerHistories.filter(scannerHistory => scannerHistory.userId === user.id);

        if (scannerHistoryOfUser.length === 0) {
            return null;
        }

        return scannerHistoryOfUser.reduce((latestScannerHistory, currentScannerHistory) => {
            if (!latestScannerHistory) {
                return currentScannerHistory;
            } else {
                return currentScannerHistory.createdAt > latestScannerHistory.createdAt ? currentScannerHistory : latestScannerHistory;
            }
        }, scannerHistoryOfUser[0]);
    }

}