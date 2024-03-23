import User from "../User/User";

export default class Role {
    constructor(
        public readonly id: number,
        public readonly roleTitle: string,
        public readonly description: string,
        public readonly users: User[]
    ) {}
}