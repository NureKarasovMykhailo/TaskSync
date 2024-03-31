import FileManager from "../../common/uttils/FileManager";
import IUserRepository from "../../repositories/UserRepository/IUserRepository";
import UpdateUserPublicDto from "../../repositories/UserRepository/dto/UpdateUserPublicDto";
import ApiError from "../../common/error/ApiError";
import generateJwt from "../../common/uttils/JwtGenerate";
import {DEFAULT_USER_IMAGE_NAME} from "../../../config";
import UserDomainModel from "../../domain/models/User/User";
import AddOrDeleteEducationDto from "../../repositories/UserRepository/dto/AddOrDeleteEducationDto";
import SubscriptionClass from "../../common/uttils/SubscriptionClass";
import ISubscribeRepository from "../../repositories/SubscribeRepository/ISubscribeRepository";
import RolesEnum from "../../common/enums/RolesEnum";
import AddOrDeleteRoleDto from "../../repositories/UserRepository/dto/AddOrDeleteRoleDto";

export default class PublicUserService {

    private readonly fileManger = new FileManager();

    constructor(
       private readonly userRepository: IUserRepository,
       private readonly subscriptionRepository: ISubscribeRepository,
    ) {}

    public async updateUser(userId: number, dto: UpdateUserPublicDto): Promise<string> {
        const user = await this.userRepository.getUserById(userId);
        if (!user ) {
            throw ApiError.notFound(`There no user with ID: ${userId}`);
        }
        let fileName =  user.userImage
        if (dto.userImage) {
            if (user.userImage !== DEFAULT_USER_IMAGE_NAME) {
                await this.fileManger.deleteFile(user.userImage);
            }
            fileName = await this.fileManger.createFile(dto.userImage);
        }

        const updatingUser = await this.userRepository.updateUserPublic(userId, dto, fileName);

        if (!updatingUser) {
            throw ApiError.notFound(`There no user with ID: ${userId}`);
        }

        return generateJwt(this.getPayload(updatingUser));
    }

    public async addEducation(userId: number, dto: AddOrDeleteEducationDto): Promise<string> {
        const user = await this.userRepository.addEducation(userId, dto);
        if (!user) {
            throw ApiError.notFound(`There no user with ID: ${userId}`);
        }
        return generateJwt(this.getPayload(user));
    }

    public async deleteEducation(userId: number, dto: AddOrDeleteEducationDto): Promise<string> {
        const user = await this.userRepository.deleteEducation(userId, dto);
        if (!user) {
            throw ApiError.notFound(`There no user with ID: ${userId}`);
        }
        return generateJwt(this.getPayload(user));
    }

    public async subscribe(userId: number) {
        const subscriptionClass: SubscriptionClass = new SubscriptionClass();
        const response = await subscriptionClass.subscribeRequest();
        console.log(response)
        if (response.ok) {
            const currentDate = new Date();
            const validUntilDate = new Date(currentDate.getTime() + 31 * 24 * 60 * 60 * 1000);
            const subscriptionDetails = await response.json();
            const subscriptionId = subscriptionDetails.id;
            await this.subscriptionRepository.createUserSubscription(userId, subscriptionId, validUntilDate.toISOString());
            const dto: AddOrDeleteRoleDto = new AddOrDeleteRoleDto(RolesEnum.SUBSCRIBER);
            await this.userRepository.addUserRole(dto, userId);
            return subscriptionDetails;
        } else {
            throw ApiError.internalServerError(`Error with PayPal API`);
        }
    }


    private getPayload(user: UserDomainModel) {
        return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            secondName: user.secondName,
            birthday: user.birthday,
            userImage: user.userImage,
            phoneNumber: user.phoneNumber,
            roles: user.roles,
            educations: user.educations
        };
    }

}