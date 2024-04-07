import IComplexityRepository from "../../repositories/ComplexityRepository/IComplexityRepository";
import CreateOrUpdateComplexityDto from "../../repositories/ComplexityRepository/dto/CreateOrUpdateComplexityDto";
import ApiError from "../../common/error/ApiError";

export default class ComplexityService {
    constructor(
        private readonly complexityRepository: IComplexityRepository ,
    ) {}

    public async createComplexity(dto: CreateOrUpdateComplexityDto) {
        return await this.complexityRepository.createComplexity(dto);
    }

    public async getAllComplexity() {
        return await this.complexityRepository.getAllComplexities();
    }

    public async getComplexityById(id: number) {
        const complexity = await this.complexityRepository.getComplexityById(id);
        if (!complexity) {
            throw ApiError.notFound(`There no complexity with ID: ${id}`);
        }
        return complexity;
    }

    public async updateComplexity(id: number, dto: CreateOrUpdateComplexityDto) {
        const complexity = await this.complexityRepository.getComplexityById(id);
        if (!complexity) {
            throw ApiError.notFound(`There no complexity with ID: ${id}`);
        }
        return await this.complexityRepository.updateComplexity(id, dto);

    }

    public async deleteComplexity(id: number) {
        await this.complexityRepository.deleteComplexityById(id);
        return;
    }
}