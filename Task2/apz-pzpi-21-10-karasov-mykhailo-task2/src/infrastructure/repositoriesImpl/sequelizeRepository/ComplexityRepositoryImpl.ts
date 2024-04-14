import IComplexityRepository from "../../../core/repositories/ComplexityRepository/IComplexityRepository";
import CreateOrUpdateComplexityDto
    from "../../../core/repositories/ComplexityRepository/dto/CreateOrUpdateComplexityDto";
import ComplexityDomainModel from "../../../core/domain/models/Complexity/Complexity";
import Complexity from "../../database/etities/Complexity";
import ComplexityMapper from "../../mappers/ComplexityMapper/ComplexityMapper";
import ApiError from "../../../core/common/error/ApiError";
import i18n from "i18n";

export default class ComplexityRepositoryImpl implements IComplexityRepository {
    private readonly complexityMapper: ComplexityMapper = new ComplexityMapper();

    async createComplexity(dto: CreateOrUpdateComplexityDto): Promise<ComplexityDomainModel> {
        const complexity = await Complexity.create({
            complexityTitle: dto.complexityTitle,
            evaluation: dto.evaluation
        });

        return this.complexityMapper.toDomainModel(complexity);
    }

    async getAllComplexities(): Promise<ComplexityDomainModel[]> {
        const complexities = await Complexity.findAll();
        return complexities.map(complexity => {
            return this.complexityMapper.toDomainModel(complexity);
        });
    }

    async getComplexityById(id: number): Promise<ComplexityDomainModel | null> {
        const complexity = await Complexity.findOne({ where: { id }});
        if (!complexity) {
            return null;
        }
        return this.complexityMapper.toDomainModel(complexity);
    }

    async updateComplexity(id: number, dto: CreateOrUpdateComplexityDto): Promise<ComplexityDomainModel> {
        const complexity = await Complexity.findOne({ where: { id }});
        if (!complexity) {
            throw ApiError.notFound(i18n.__('complexityNotFound'));
        }

        complexity.complexityTitle = dto.complexityTitle;
        complexity.evaluation = dto.evaluation;
        await complexity.save();
        return this.complexityMapper.toDomainModel(complexity);
    }

    async deleteComplexityById(id: number): Promise<void> {
        await Complexity.destroy({where: { id }});
        return;
    }

}