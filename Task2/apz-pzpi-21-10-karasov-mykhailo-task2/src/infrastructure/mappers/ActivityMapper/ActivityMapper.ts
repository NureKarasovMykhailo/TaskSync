import IMapper from "../IMapper";
import ActivityDomainModel from "../../../core/domain/models/Acitivity/Activity";
import Activity from "../../database/etities/Activity";

export default class ActivityMapper implements IMapper<Activity, ActivityDomainModel> {
    toDomainModel(data: Activity): ActivityDomainModel {
        return new ActivityDomainModel(
            data.id,
            data.activityTitle,
            data.description,
            data.requiredWorkersCount,
            data.timeShift,
            data.complexityId,
            data.educationId,
            data.companyId
        );
    }

    toPersistenceModel(data: ActivityDomainModel): Activity {
        const activity = new Activity();
        activity.id = data.id;
        activity.activityTitle = data.activityTitle;
        activity.description = data.description;
        activity.requiredWorkersCount = data.requiredWorkerCount;
        activity.timeShift = data.timeShift;
        activity.complexityId = data.complexityId;
        activity.educationId = data.educationId
        activity.companyId = data.companyId;
        return activity;
    }

}