import ActivityService from "../../core/services/ActivityService/ActivityService";
import {NextFunction, Response, Request} from "express";
import CreateOrUpdateActivityDto from "../../core/repositories/ActivityRepository/dto/CreateOrUpdateActivityDto";

export default class ActivityController {
    constructor(
       private readonly activityService: ActivityService,
    ) {}

    public async createActivity(req: Request, res: Response, next: NextFunction) {
        try {
            let companyId;
            if (req.user.companyId) {
                companyId = req.user.companyId;
            } else {
                companyId = req.body.companyId;
            }

            const {
                activityTitle,
                description,
                requiredWorkerCount,
                timeShift,
                complexityId,
                educationId,
            } = req.body;
            const dto: CreateOrUpdateActivityDto = new CreateOrUpdateActivityDto(
                activityTitle,
                description,
                requiredWorkerCount,
                timeShift,
                complexityId,
                educationId,
                companyId
            );

            const {activity, education, complexity} = await this.activityService.createActivity(dto);
            return res.status(201).json({ activity, education, complexity});
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    public async getActivities(req: Request, res: Response, next: NextFunction) {
        try {
            if (req.user.companyId) {
                const {
                    educationTitle,
                    activityTitle,
                    sortBy,
                    page = '1',
                    limit = '10'
                } = req.query;

                const offset: number = Number(page) * Number(limit) - Number(limit);
                const activities = await this.activityService.getActivityOfCompany(
                    req.user.companyId,
                    activityTitle as string,
                    educationTitle as string,
                    sortBy as string,
                    offset,
                    Number(limit)
                );

                return res.status(200).json({
                    activities: activities.items,
                    pagination: {
                        totalItems: activities.itemsCount,
                        totalPages: activities.totalPages,
                        currentPage: page,
                        itemsPerPage: limit
                    }
                });

            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }


}