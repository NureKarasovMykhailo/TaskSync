import EducationDomainModel from "../../domain/models/Education/Education";
import CreateEducationDto from "./dto/CreateEducation";

export default interface IEducationRepository {
    getEducationByTitle(educationTitle: string): Promise<EducationDomainModel | null>;
    createEducation(dto: CreateEducationDto): Promise<EducationDomainModel>
}