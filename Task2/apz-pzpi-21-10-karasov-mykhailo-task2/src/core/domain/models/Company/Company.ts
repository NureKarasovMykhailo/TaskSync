import User from "../User/User";

export default class Company {
    constructor(
        public readonly id: number,
        public readonly companyName: string,
        public readonly description: string | null,
        public readonly companyImage: string,
        public readonly owner: User
    ) {}
}