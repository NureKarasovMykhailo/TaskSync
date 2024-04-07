import CreateOrUpdateActivityDto from "./dto/CreateOrUpdateActivityDto";
import ActivityDomainModel from "../../domain/models/Acitivity/Activity";

export default interface IActivityRepository {
    createActivity(dto: CreateOrUpdateActivityDto): Promise<ActivityDomainModel>;
    getActivityByCompanyId(id: number): Promise<ActivityDomainModel[]>;
    filterActivityByEducationTitle(educationTitle: string, activities: ActivityDomainModel[]): Promise<ActivityDomainModel[]>;
}