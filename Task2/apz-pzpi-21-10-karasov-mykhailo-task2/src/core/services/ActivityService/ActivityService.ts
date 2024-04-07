import IActivityRepository from "../../repositories/ActivityRepository/IActivityRepository";
import CreateOrUpdateActivityDto from "../../repositories/ActivityRepository/dto/CreateOrUpdateActivityDto";
import IEducationRepository from "../../repositories/EducationRepository/IEducationRepository";
import IComplexityRepository from "../../repositories/ComplexityRepository/IComplexityRepository";
import ActivityDomainModel from "../../domain/models/Acitivity/Activity";
import PaginationClass from "../../common/uttils/PaginationClass";

export default class ActivityService {
    constructor(
        private readonly activityRepository: IActivityRepository,
        private readonly educationRepository: IEducationRepository,
        private readonly complexityRepository: IComplexityRepository
    ) {}

    public async createActivity(dto: CreateOrUpdateActivityDto) {
        const createdActivity = await this.activityRepository.createActivity(dto);
        const education = await this.educationRepository.getEducationById(dto.educationId);
        const complexity = await this.complexityRepository.getComplexityById(dto.complexityId)
        return { activity: createdActivity, education: education, complexity: complexity};
    }

    public async getActivityOfCompany(
        companyId: number,
        activityTitle: string,
        requiredEducation: string,
        sortBy: string,
        offset: number,
        limit: number
    ) {
        let activities = await this.activityRepository.getActivityByCompanyId(companyId);

        if (activityTitle) {
            activities = this.filterActivityByTitle(activityTitle, activities);
        }

        if (requiredEducation) {
            activities = await this.activityRepository.filterActivityByEducationTitle(requiredEducation, activities);
        }

        if (sortBy) {
            activities = this.sortActivity(sortBy, activities);
        }

        const pagination: PaginationClass<ActivityDomainModel> = new PaginationClass();

        return pagination.paginateItems(activities, offset, limit);
    }

    private filterActivityByTitle(activityTitle: string, activities: ActivityDomainModel[]) {
        return activities.filter(activity => activity.activityTitle === activityTitle);
    }

    private sortActivity(sortBy: string, activities: ActivityDomainModel[]) {
        if (sortBy ===  'asc') {
            activities.sort((a, b) => a.activityTitle.localeCompare(b.activityTitle));
        } else if (sortBy === 'desc') {
            activities.sort((a, b) => b.activityTitle.localeCompare(a.activityTitle));
        }
        return activities;
    }
}