import Subscription from "../../../infrastructure/database/etities/Subscription";
import SubscribeModel from "../../domain/models/Subscribe/SubscribeModel";

export default interface ISubscribeRepository {
    createUserSubscription(userId: number, subscriptionId: string, validUntil: string): Promise<boolean>;
    getSubscriptionByUserId(userId: number): Promise<SubscribeModel | null>;
    setSubscribeValidTrue(subscribeId: number): Promise<SubscribeModel | null>;
}