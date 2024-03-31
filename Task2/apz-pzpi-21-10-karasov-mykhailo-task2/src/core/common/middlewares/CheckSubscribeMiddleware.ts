import {NextFunction, Response, Request} from "express";
import ISubscribeRepository from "../../repositories/SubscribeRepository/ISubscribeRepository";
import ApiError from "../error/ApiError";
import SubscriptionClass from "../uttils/SubscriptionClass";

export default class CheckSubscribeMiddleware {
    constructor(
       private readonly subscriptionRepository: ISubscribeRepository
    ) {}

    async checkSubscribe(req: Request, res: Response, next: NextFunction) {
        // @ts-ignore
        const subscribe = await this.subscriptionRepository.getSubscriptionByUserId(req.user.id);
        if (!subscribe) {
            return next(ApiError.forbidden(`You have to subscribe for this function`));
        }
        if (subscribe.validUntil.getDate() > new Date().getDate()) {
            return next(ApiError.forbidden(`You have to subscribe for this function`));
        } else if (subscribe.validUntil.getDate() < new Date().getDate() && !subscribe.isValid) {
            const subscriptionClass = new SubscriptionClass();
            if (await subscriptionClass.isSubscriptionValid(subscribe)) {
                await this.subscriptionRepository.setSubscribeValidTrue(subscribe.id);
                next();
            } else {
                return next(ApiError.forbidden(`You have to subscribe for this function`));
            }
        }
        next();
    }
}