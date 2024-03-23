export default class Education {
    constructor(
        public readonly id: number,
        public readonly educationTitle: string,
        public readonly description: string | null
    ) {}
}