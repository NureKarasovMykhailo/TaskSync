import UserDomainModel from "../../domain/models/User/User";
import ActivityDomainModel from "../../domain/models/Acitivity/Activity";

export default class CoefficientsData {
    user: UserDomainModel;
    activity: ActivityDomainModel;
    temperature: number;
    pulse: number;
    activeWorkTime: number;
    complexity: number;

    constructor(user: UserDomainModel, activity: ActivityDomainModel, temperature: number, pulse: number, activeWorkTime: number, complexity: number) {
        this.user = user;
        this.activity = activity;
        this.temperature = temperature;
        this.pulse = pulse;
        this.activeWorkTime = activeWorkTime;
        this.complexity = complexity;
    }

}