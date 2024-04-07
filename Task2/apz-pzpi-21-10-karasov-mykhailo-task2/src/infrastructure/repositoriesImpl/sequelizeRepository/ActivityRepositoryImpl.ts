import IActivityRepository from "../../../core/repositories/ActivityRepository/IActivityRepository";
import CreateOrUpdateActivityDto from "../../../core/repositories/ActivityRepository/dto/CreateOrUpdateActivityDto";
import ActivityDomainModel from "../../../core/domain/models/Acitivity/Activity";
import Activity from "../../database/etities/Activity";
import Complexity from "../../database/etities/Complexity";
import Education from "../../database/etities/Education";
import Company from "../../database/etities/Company";
import ActivityMapper from "../../mappers/ActivityMapper/ActivityMapper";
import ApiError from "../../../core/common/error/ApiError";

export default class ActivityRepositoryImpl implements IActivityRepository{
    private activityMapper: ActivityMapper = new ActivityMapper();

    async createActivity(dto: CreateOrUpdateActivityDto): Promise<ActivityDomainModel> {
        const complexity = await Complexity.findOne({ where: { id: dto.complexityId }});
        const education = await Education.findOne({ where: { id: dto.educationId}});
        const company = await Company.findOne({ where: { id: dto.companyId }});

        if (!complexity || !education || !company) {
            throw ApiError.badRequest(`Error while creating activity`);
        }

        const createdActivity = await Activity.create({
            activityTitle: dto.activityTitle,
            description: dto.description,
            requiredWorkersCount: dto.requiredWorkerCount,
            timeShift: dto.timeShift,
            complexity: complexity,
            education: education,
            company: company
        });
        return this.activityMapper.toDomainModel(createdActivity);
    }

    async getActivityByCompanyId(id: number): Promise<ActivityDomainModel[]> {
        const activities = await Activity.findAll({
            where: { companyId: id}
        });
        return activities.map(activity => {
            return this.activityMapper.toDomainModel(activity);
        });
    }

    async filterActivityByEducationTitle(educationTitle: string, activities: ActivityDomainModel[]): Promise<ActivityDomainModel[]> {
        const requiredEducation = await Education.findOne({where: {educationTitle}});
        if (!requiredEducation) {
            throw ApiError.notFound(`There no education with name: ${educationTitle}`);
        }

        return activities.filter(activity => activity.educationId === requiredEducation.id);
    }

}