import {NextFunction, Request, Response} from "express";
import CreateEducationDto from "../../core/repositories/EducationRepository/dto/CreateEducation";
import {validationResult} from "express-validator";
import formatValidationErrors from "../../core/common/uttils/ValidationErrorsUttils";
import ApiError from "../../core/common/error/ApiError";
import EducationService from "../../core/services/EducationService/EducationService";
import EducationRepository from "../repositoriesImpl/sequelizeRepository/EducationRepository";
import EducationMapper from "../mappers/EducationMapper/EducationMapper";
import EducationDomainModel from "../../core/domain/models/Education/Education";
import Education from "../database/etities/Education";

class EducationController {

    private readonly educationMapper: EducationMapper = new EducationMapper();

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

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const { educationTitle } = req.query;
            const educationDomainModels = await this.educationService.getAll(String(educationTitle));
            const educations = educationDomainModels.map(education => {
               return this.educationMapper.toPersistenceModel(education);
            });
            return res.status(200).json({ educations: educations });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const educationDomainModel = await this.educationService.getEducationById(Number(id));
            return res.status(200).json({ education: this.educationMapper.toPersistenceModel(educationDomainModel) });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async updateEducation(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { educationTitle, description } = req.body;
            const dto: CreateEducationDto = new CreateEducationDto(educationTitle, description);
            const educationDomain: EducationDomainModel
                = await this.educationService.updateEducation(Number(id), dto);
            const education: Education = this.educationMapper.toPersistenceModel(educationDomain);
            return res.status(200).json({ education: education });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async deleteEducation(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await this.educationService.deleteEducation(Number(id));
            return res.status(200).json({});
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

export default new EducationController(new EducationService(new EducationRepository()));