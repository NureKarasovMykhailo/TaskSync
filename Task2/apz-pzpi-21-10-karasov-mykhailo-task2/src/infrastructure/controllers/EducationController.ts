import {NextFunction, Request, Response} from "express";
import CreateEducationDto from "../../core/repositories/EducationRepository/dto/CreateEducation";
import {validationResult} from "express-validator";
import formatValidationErrors from "../../core/common/uttils/ValidationErrorsUttils";
import ApiError from "../../core/common/error/ApiError";
import EducationService from "../../core/services/EducationService/EducationService";
import EducationRepository from "../repositoriesImpl/sequelizeRepository/EducationRepository";

class EducationController {
    constructor(
       private readonly educationService: EducationService
    ) {}

    async createEducation(req: Request, res: Response, next: NextFunction) {
        try {
            const {educationTitle, description} = req.body;
            const dto: CreateEducationDto = new CreateEducationDto(educationTitle, description);

            const errors = validationResult(req.body);
            if (!errors.isEmpty()) {
                const errorMessages = formatValidationErrors(errors.array());
                return next(ApiError.badRequest(errorMessages.join(', ')));
            }

            const education = await this.educationService.createEducation(dto);
            return res.status(201).json({ message: education });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

export default new EducationController(new EducationService(new EducationRepository()));