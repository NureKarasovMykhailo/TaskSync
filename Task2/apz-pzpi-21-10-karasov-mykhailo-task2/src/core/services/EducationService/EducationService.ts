import IEducationRepository from "../../repositories/EducationRepository/IEducationRepository";
import CreateEducationDto from "../../repositories/EducationRepository/dto/CreateEducation";
import ApiError from "../../common/error/ApiError";

export default class EducationService {
    constructor(
        private readonly educationRepository: IEducationRepository
    ) {}

    public async createEducation(dto: CreateEducationDto) {
        if (await this.isEducationExist(dto.educationTitle)) {
            throw ApiError.conflict('Спецальність з такою назвою вже існує');
        }
        return await this.educationRepository.createEducation(dto);
    }

    private async isEducationExist(educationTitle: string): Promise<boolean> {
        const education = await this.educationRepository.getEducationByTitle(educationTitle);
        return education !== null;

    }
}