import ActivityDomainModel from "../../domain/models/Acitivity/Activity";
import ScannerHistoryDomainModel from "../../domain/models/ScannerHistory/ScannerHistory";
import UserDomainModel from "../../domain/models/User/User";
import CoefficientsData from "./CoefficientsData";

export default class CoefficientsManager {

    private readonly _activity: ActivityDomainModel;
    private  _scannerHistory: ScannerHistoryDomainModel;
    private readonly _user: UserDomainModel;

    private _temperatureCoefficient!: number;
    private _pulseCoefficient!: number;
    private _activeWorkTimeCoefficient!: number;
    private _complexityCoefficient!: number;

    constructor(activity: ActivityDomainModel, scannerHistory: ScannerHistoryDomainModel, user: UserDomainModel) {
        this._activity = activity;
        this._scannerHistory = scannerHistory;
        this._user = user;
    }

    public setCoefficients() {
        this._complexityCoefficient = this._activity.complexity?.evaluation || 5;
        this._pulseCoefficient = this.getPulseCoefficients(this._scannerHistory.pulse);
        this._temperatureCoefficient = this.getTemperatureCoefficient(this._scannerHistory.temperature);
        this._activeWorkTimeCoefficient = this.getActiveWorkCoefficients(this._scannerHistory.activeWorkedTime);
    }

    public getCoefficientsData() {
        return new CoefficientsData(
            this._user,
            this._activity,
            this._temperatureCoefficient,
            this._pulseCoefficient,
            this._activeWorkTimeCoefficient,
            this._complexityCoefficient
        );
    }

    private getTemperatureCoefficient(temperature: number): number {
        if (temperature <= 36.6) {
            return 1;
        } else if (temperature > 36.6 && temperature <= 37) {
            return 1.2;
        } else if (temperature > 37 && temperature <= 37.5) {
            return 1.5;
        } else if (temperature > 37.5 && temperature <= 38) {
            return 2;
        } else if (temperature > 38 && temperature <= 38.5) {
            return 3;
        } else if (temperature > 38.5 && temperature <= 39) {
            return 4;
        } else {
            return 5;
        }
    }

    private getPulseCoefficients(pulse: number): number {
        if (pulse <= 60) {
            return 1;
        } else if (pulse > 60 && pulse <= 80) {
            return 1.2;
        } else if (pulse > 80 && pulse <= 100) {
            return 1.5;
        } else if (pulse > 100 && pulse <= 120) {
            return 2;
        } else if (pulse > 120 && pulse <= 140) {
            return 3;
        } else if (pulse > 140 && pulse <= 160) {
            return 4;
        } else {
            return 5;
        }
    }

    private getActiveWorkCoefficients(activeWorkTimeInSeconds: number): number {
        const activeWorkTimeInHours = activeWorkTimeInSeconds / 3600; // Переводим секунды в часы
        if (activeWorkTimeInHours <= 7200) {
            return 1;
        } else if (activeWorkTimeInHours > 7200 && activeWorkTimeInHours <= 14400) {
            return 1.2;
        } else if (activeWorkTimeInHours > 14400 && activeWorkTimeInHours <= 21600) {
            return 1.5;
        } else if (activeWorkTimeInHours > 21600 && activeWorkTimeInHours <= 28800) {
            return 2;
        } else if (activeWorkTimeInHours > 28800 && activeWorkTimeInHours <= 36000) {
            return 3;
        } else if (activeWorkTimeInHours > 36000 && activeWorkTimeInHours <= 43200) {
            return 4;
        } else {
            return 5;
        }
    }


}