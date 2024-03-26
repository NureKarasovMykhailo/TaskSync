import IUserRepository from "../../repositories/UserRepository/IUserRepository";

export default class UserService {
    constructor(
        private readonly userRepository: IUserRepository
    ) {}
}