import IActivityRepository from "../../repositories/ActivityRepository/IActivityRepository";
import CreateOrUpdateActivityDto from "../../repositories/ActivityRepository/dto/CreateOrUpdateActivityDto";
import ActivityDomainModel from "../../domain/models/Acitivity/Activity";
import PaginationClass from "../../common/uttils/PaginationClass";
import ApiError from "../../common/error/ApiError";
import IUserRepository from "../../repositories/UserRepository/IUserRepository";
import UserDomainModel from "../../domain/models/User/User";

export default class ActivityService {
    constructor(
        private readonly activityRepository: IActivityRepository,
        private readonly userRepository: IUserRepository,
    ) {}

    public async createActivity(dto: CreateOrUpdateActivityDto) {
        const activity =  await this.activityRepository.createActivity(dto);
        console.log(activity)
        return activity;
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
            activities = this.filterActivityByEducation(requiredEducation, activities);
        }

        if (sortBy) {
            activities = this.sortActivity(sortBy, activities);
        }

        const pagination: PaginationClass<ActivityDomainModel> = new PaginationClass();

        return pagination.paginateItems(activities, offset, limit);
    }

    public async getActivityById(id: number, companyId: number) {
        const activity = await this.activityRepository.getActivityById(id);
        if (!activity) {
            throw ApiError.notFound(`There no activity with ID: ${id}`);
        }
        this.isActivityBelongsToCompany(activity, companyId);

        return activity;
    }

    public async updateActivity(activityId: number, companyId: number, dto: CreateOrUpdateActivityDto) {
        await this.getActivityById(activityId, companyId);
        return await this.activityRepository.updateActivity(activityId, dto);
    }

    public async deleteActivity(activityId: number, companyId: number) {
        await this.getActivityById(activityId, companyId);
        await this.activityRepository.deleteActivityById(activityId);
        return;
    }

    public async addEmployee(activityId: number, userId: number) {
        const activity = await this.activityRepository.getActivityById(activityId);
        if (!activity) {
            throw ApiError.notFound(`There no activity with ID: ${activityId}`);
        }

        const user = await this.userRepository.getUserById(userId);
        if (!user) {
            throw ApiError.notFound(`There no user with ID: ${userId}`);
        }

        if (!this.isUserHasEducation(activity.education?.educationTitle, user)) {
            throw ApiError.badRequest(`User with ID: ${userId} has not education: ${activity.education?.educationTitle}`);
        }

        return await this.activityRepository.addEmployee(activityId, userId);
    }

    public async deleteEmployee(activityId: number, userId: number) {
        const activity = await this.activityRepository.getActivityById(activityId);
        if (!activity) {
            throw ApiError.notFound(`There no activity with id: ${activityId}`);
        }

        const user = await this.userRepository.getUserById(userId);
        if (!user) {
            throw ApiError.notFound(`There no user with ID: ${userId}`);
        }

        return await this.activityRepository.deleteEmployee(activityId, userId);
    }


    private isUserHasEducation(educationTitle: string | undefined, user: UserDomainModel) {
        let hasEducation = false;
        user.educations?.map(education => {
            if (education.educationTitle === educationTitle) {
                hasEducation = true;
            }
        });

        return hasEducation;
    }

    private filterActivityByTitle(activityTitle: string, activities: ActivityDomainModel[]) {
        return activities.filter(activity => activity.activityTitle === activityTitle);
    }

    private filterActivityByEducation(educationTitle: string, activities: ActivityDomainModel[]) {
        return activities.filter(activity => {
          return activity.education?.educationTitle === educationTitle;
        });
    }

    private sortActivity(sortBy: string, activities: ActivityDomainModel[]) {
        if (sortBy ===  'asc') {
            activities.sort((a, b) => a.activityTitle.localeCompare(b.activityTitle));
        } else if (sortBy === 'desc') {
            activities.sort((a, b) => b.activityTitle.localeCompare(a.activityTitle));
        }
        return activities;
    }

    private isActivityBelongsToCompany(activity: ActivityDomainModel, companyId: number) {
        if (activity.companyId !== companyId) {
            throw ApiError.forbidden(`You have not access to this information`);
        }
        return;
    }
}