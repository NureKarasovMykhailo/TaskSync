import ActivityDomainModel from "../../domain/models/Acitivity/Activity";
import ScannerHistoryDomainModel from "../../domain/models/ScannerHistory/ScannerHistory";
import CoefficientsData from "./CoefficientsData";

export default class TimeTableManager {

    private _activities: ActivityDomainModel[];
    private _scannerHistory: ScannerHistoryDomainModel;
    private _coefficientsArray!: CoefficientsData[];

    constructor(
       activities: ActivityDomainModel[],
       scannerHistory: ScannerHistoryDomainModel
    ) {
        this._activities = activities;
        this._scannerHistory = scannerHistory;
        this._coefficientsArray = this.getCoefficientsArray();
    }

    public getOptimalActivity(): number {
        const maxCoefficientData = this.getCoefficientsWithMaxData(this._coefficientsArray);


        for (let i = 0; i < this._coefficientsArray.length; i++) {
            this._coefficientsArray[i].totalCoefficient =
                this._coefficientsArray[i].complexityCoefficient / maxCoefficientData.complexityCoefficient +
                this._coefficientsArray[i].pulseCoefficient / maxCoefficientData.pulseCoefficient +
                this._coefficientsArray[i].temperatureCoefficient / maxCoefficientData.temperatureCoefficient +
                this._coefficientsArray[i].complexityCoefficient / maxCoefficientData.complexityCoefficient;
        }

        this._coefficientsArray = this._coefficientsArray.sort((a, b) => b.totalCoefficient - a.totalCoefficient);

        return this._coefficientsArray[0].activityId;

    }

    private getCoefficientsArray() {
        let coefficientsArray: CoefficientsData[] = [];

        for (let i = 0; i < this._activities.length; i++) {

            let coefficientsData = new CoefficientsData(
                this._activities[i].id,
                this.getTemperatureCoefficient(this._scannerHistory.temperature),
                this.getPulseCoefficients(this._scannerHistory.pulse),
                this.getActiveWorkCoefficients(this._scannerHistory.activeWorkedTime),
                this._activities[i].complexity?.evaluation || 6
            );
            coefficientsArray.push(coefficientsData);
        }

        return coefficientsArray;
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

    private getCoefficientsWithMaxData(coefficientsArray: CoefficientsData[]) {
        let maxPulseCoefficient = Number.MIN_SAFE_INTEGER;
        let maxTemperatureCoefficient = Number.MIN_SAFE_INTEGER;
        let maxActiveWorkTimeCoefficient = Number.MIN_SAFE_INTEGER;
        let maxComplexityCoefficient = Number.MIN_SAFE_INTEGER;

        for (let i = 0; i < coefficientsArray.length; i++) {
            if (maxPulseCoefficient < coefficientsArray[i].pulseCoefficient) {
                maxPulseCoefficient = coefficientsArray[i].pulseCoefficient;
            }

            if (maxTemperatureCoefficient < coefficientsArray[i].temperatureCoefficient) {
                maxTemperatureCoefficient = coefficientsArray[i].temperatureCoefficient;
            }

            if (maxActiveWorkTimeCoefficient < coefficientsArray[i].workTimeCoefficient) {
                maxActiveWorkTimeCoefficient = coefficientsArray[i].workTimeCoefficient;
            }

            if (maxComplexityCoefficient < coefficientsArray[i].complexityCoefficient) {
                maxComplexityCoefficient = coefficientsArray[i].complexityCoefficient;
            }
        }

        return new CoefficientsData(
            0,
            maxTemperatureCoefficient,
            maxPulseCoefficient,
            maxActiveWorkTimeCoefficient,
            maxComplexityCoefficient
        );

    }

}