import IEducationRepository from "../../repositories/EducationRepository/IEducationRepository";
import CreateEducationDto from "../../repositories/EducationRepository/dto/CreateEducation";
import ApiError from "../../common/error/ApiError";
import EducationDomainModel from "../../domain/models/Education/Education";

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

    public async getAll(educationTitle?: string): Promise<EducationDomainModel[]> {
        if (educationTitle !== undefined && educationTitle !== 'undefined') {
            return this.getEducationByTitle(educationTitle);
        } else {
            return await this.educationRepository.getAllEducations();
        }
    }

    public async getEducationById(id: number): Promise<EducationDomainModel> {
        const education = await this.educationRepository.getEducationById(id);
        if (!education) {
            throw ApiError.notFound(`Education with ID: ${id} not founded`);
        }
        return education;
    }

    public async updateEducation(id: number, dto: CreateEducationDto): Promise<EducationDomainModel> {
        const updatedEducation = await this.getEducationById(id);
        if (await this.isEducationExist(dto.educationTitle) && dto.educationTitle !== updatedEducation.educationTitle) {
            throw ApiError.conflict('Education with this title has already existed');
        }
        const education = await this.educationRepository.updateEducation(id, dto);
        if (!education) {
            throw ApiError.notFound(`Education with ID: ${id} not founded`);
        }

        return education;
    }

    public async deleteEducation(id: number): Promise<void> {
        await this.educationRepository.deleteEducation(id);
        return;
    }

    private async isEducationExist(educationTitle: string): Promise<boolean> {
        const education = await this.educationRepository.getEducationByTitle(educationTitle);
        return education !== null;

    }

    private async getEducationByTitle(educationTitle: string) {
        const education = await this.educationRepository.getEducationByTitle(educationTitle);
        let educationArr: EducationDomainModel[] = [];
        if (education) {
            educationArr.push(education);
        }
        return educationArr;
    }
}