import RoleDomainModel from "../Role/Role";

export default class ComplexityDomainModel {
    constructor(
        public readonly id: number,
        public readonly complexityTitle: string,
        public readonly evaluation: number
    ) {}
}