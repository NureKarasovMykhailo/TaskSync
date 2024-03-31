import UserMapper from "../mappers/UserMapper/UserMapper";
import UserRepositoryImpl from "../repositoriesImpl/sequelizeRepository/UserRepositoryImpl";
import {NextFunction, Response, Request} from "express";
import UpdateUserPublicDto from "../../core/repositories/UserRepository/dto/UpdateUserPublicDto";
import PublicUserService from "../../core/services/PublicUserService/PublicUserService";
import AddOrDeleteEducationDto from "../../core/repositories/UserRepository/dto/AddOrDeleteEducationDto";
import SubscriptionClass from "../../core/common/uttils/SubscriptionClass";
import SubscriptionRepositoryImpl from "../repositoriesImpl/sequelizeRepository/SubscriptionRepositoryImpl";

class PublicUserController {

    constructor(
        private readonly userService: PublicUserService,
        private readonly userMapper: UserMapper
    ) {}

   public async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                firstName,
                secondName,
                birthday,
                phoneNumber,
            } = req.body;

            let userImage;
            // @ts-ignore
            if (req.files) {
                userImage = req.files.userImage;
            }

            const dto: UpdateUserPublicDto = new UpdateUserPublicDto(
                firstName,
                secondName,
                birthday,
                phoneNumber,
                userImage || null
            );

            // @ts-ignore
            const token = await this.userService.updateUser(req.user.id, dto);
            return res.status(200).json({ token: token });

        } catch (error) {
            console.log(error);
            next(error);
        }
   }

   public async addEducation(req: Request, res: Response, next: NextFunction) {
        try {
            const { educationTitle } = req.body;
            const dto: AddOrDeleteEducationDto = new AddOrDeleteEducationDto(educationTitle);

            // @ts-ignore
            const token = await this.userService.addEducation(req.user.id, dto);
            return res.status(200).json({ token: token});
        } catch (error) {
            console.log(error);
            next(error);
        }
   }

   public async deleteEducation(req: Request, res: Response, next: NextFunction) {
        try {
            const { educationTitle } = req.body;
            const dto: AddOrDeleteEducationDto = new AddOrDeleteEducationDto(educationTitle);

            // @ts-ignore
            const token = await this.userService.deleteEducation(req.user.id, dto);
            return res.status(200).json({ token: token});
        } catch (error) {
            console.log(error);
            next(error);
        }
   }

   public async subscribe(req: Request, res: Response, next: NextFunction) {
        try {
            // @ts-ignore
            const subscriptionDetails = await this.userService.subscribe(req.user.id);

            res.send(subscriptionDetails);
        } catch (error) {
            console.log(error);
            next(error);
        }
   }

}

export default new PublicUserController(new PublicUserService(new UserRepositoryImpl(), new SubscriptionRepositoryImpl()), new UserMapper());