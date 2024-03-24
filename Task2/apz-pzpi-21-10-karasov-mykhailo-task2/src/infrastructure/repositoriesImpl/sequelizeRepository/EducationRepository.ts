import IEducationRepository from "../../../core/repositories/EducationRepository/IEducationRepository";
import EducationDomainModel from "../../../core/domain/models/Education/Education";
import Education from "../../database/etities/Education";
import EducationMapper from "../../mappers/EducationMapper/EducationMapper";
import CreateEducationDto from "../../../core/repositories/EducationRepository/dto/CreateEducation";

export default class EducationRepository implements IEducationRepository{

    private educationMapper: EducationMapper = new EducationMapper();
    async getEducationByTitle(educationTitle: string): Promise<EducationDomainModel | null> {
        const education = await Education.findOne({where: {educationTitle}});
        if (!education) {
            return null;
        }
        return this.educationMapper.toDomainModel(education);
    }

    async createEducation(dto: CreateEducationDto): Promise<EducationDomainModel> {
        const education = await Education.create({...dto});
        return this.educationMapper.toDomainModel(education)
    }

}