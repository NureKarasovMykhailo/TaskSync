import {IAuthRepository} from "../../repositories/AuthRepository/IAuthRepository";
import LoginDto from "../../repositories/AuthRepository/dto/LoginDto";
import {RegistrationDto} from "../../repositories/AuthRepository/dto/RegistrationDto";
import ApiError from "../../common/error/ApiError";
import bcrypt from 'bcrypt';
import UserDomainModel from "../../domain/models/User/User";
import JWT from "../../common/uttils/JWT";

export default class AuthService {
    constructor(private readonly authRepository: IAuthRepository) {}

    public async registration(dto: RegistrationDto) {

        if (!await this.isEmailUnique(dto.email)) {
            throw ApiError.conflict(`Користувач з таким email вже існує`);
        }

        if (dto.password !== dto.passwordConfirm) {
            throw ApiError.badRequest('Паролі не збігаються');
        }

        const hashPassword = await bcrypt.hash(dto.password, 5);
        const user: UserDomainModel = await this.authRepository.userRegistration({...dto, password: hashPassword});
        const jwt = new JWT(user);
        return jwt.generateJwt();
    }

    public async login (dto: LoginDto) {
        const user = await this.authRepository.getUserByEmail(dto.email);

        if (!user) {
            throw ApiError.badRequest('Email чи пароль не вірний');
        }
        if (!await bcrypt.compare(dto.password, user.password)) {
            throw ApiError.badRequest('Email чи пароль не вірний');
        }

        const jwt = new JWT(user);
        return jwt.generateJwt();
    }

    public checkAuth(user: any) {
        const jwt = new JWT(user);
        return jwt.generateJwt();

    }

    private async isEmailUnique(email: string): Promise<boolean> {
        const candidate = await this.authRepository.getUserByEmail(email);
        return candidate === null;
    }


}