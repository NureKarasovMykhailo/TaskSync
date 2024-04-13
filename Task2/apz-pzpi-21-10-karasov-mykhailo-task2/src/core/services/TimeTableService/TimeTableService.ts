import IUserRepository from "../../repositories/UserRepository/IUserRepository";
import IActivityRepository from "../../repositories/ActivityRepository/IActivityRepository";
import IScannerRepository from "../../repositories/ScannerRepository/IScannerRepository";
import IScannerHistoryRepository from "../../repositories/ScannerHistoryRepository/IScannerHistoryRepository";
import ApiError from "../../common/error/ApiError";
import ScannerHistoryDomainModel from "../../domain/models/ScannerHistory/ScannerHistory";
import ActivityDomainModel from "../../domain/models/Acitivity/Activity";
import Education from "../../../infrastructure/database/etities/Education";
import EducationDomainModel from "../../domain/models/Education/Education";

export default class TimeTableService {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly activityRepository: IActivityRepository,
        private readonly scannerRepository: IScannerRepository,
        private readonly scannerHistoryRepository: IScannerHistoryRepository
    ) {}

    public async getWorkForEmployee(userId: number, companyId: number) {
        const user = await this.userRepository.getUserById(userId);
        if (!user) {
            throw ApiError.notFound(`There no user with ID: ${userId}`);
        }

        if (user.companyId !== companyId) {
            throw ApiError.notFound(`There no company with ID: ${companyId}`);
        }

        if (!user.educations) {
            throw ApiError.badRequest(`User hasn't any education`)
        }

        let activities = await this.activityRepository.getActivityByCompanyId(companyId);
        const userScannerHistory = await this.scannerHistoryRepository.getScannerHistoryByUserId(userId);
        const lastScannerHistory = this.getLastUserScannerHistory(userScannerHistory);
        if (!lastScannerHistory) {
            throw ApiError.badRequest(`User with ID: ${userId} has no info`);
        }

        activities = this.getActivityWithRelevantEducation(activities, user.educations);
        activities = this.getActivityWithNotFullWorker(activities);

        return activities;
    }


    private getLastUserScannerHistory(scannerHistories: ScannerHistoryDomainModel[]) {
        if (scannerHistories.length === 0) {
            return null;
        }

        scannerHistories.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        return scannerHistories[0];
    }

    private getActivityWithNotFullWorker(activities: ActivityDomainModel[]) {
        if (activities.length === 0) {
            throw ApiError.badRequest(`There no activities`);
        }

        return activities.filter(activity => activity.users.length < activity.requiredWorkerCount );
    }

    private getActivityWithRelevantEducation(activities: ActivityDomainModel[], educations: EducationDomainModel[]) {
        if (activities.length === 0) {
            throw ApiError.badRequest(`There no activities`);
        }

        let filteredActivities: ActivityDomainModel[] = [];
        for (let i = 0; i < educations.length; i++) {
            for (let j = 0; j < activities.length; j++) {
                if (educations[i].educationTitle === activities[j].education?.educationTitle) {
                    filteredActivities.push(activities[j]);
                }
            }
        }

        return filteredActivities;
    }

}