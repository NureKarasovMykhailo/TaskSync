import {IAuthRepository} from "../../repositories/AuthRepository/IAuthRepository";
import LoginDto from "../../repositories/AuthRepository/dto/LoginDto";
import {RegistrationDto} from "../../repositories/AuthRepository/dto/RegistrationDto";
import ApiError from "../../common/error/ApiError";
import bcrypt from 'bcrypt';
import generateJwt from "../../common/uttils/JwtGenerate";
import UserDomainModel from "../../domain/models/User/User";
import IRoleRepository from "../../repositories/RoleRepository/IRoleRepository";

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
        const payload = this.getPayload(user);
        return generateJwt(payload);
    }

    public async login (dto: LoginDto) {
        const user = await this.authRepository.getUserByEmail(dto.email);
        if (!user) {
            throw ApiError.badRequest('Email чи пароль не вірний');
        }
        if (!await bcrypt.compare(dto.password, user.password)) {
            throw ApiError.badRequest('Email чи пароль не вірний');
        }

        const payload = this.getPayload(user);
        return generateJwt(payload);
    }

    public checkAuth(user: any) {
        const payload = this.getPayload(user);
        return generateJwt(payload);

    }

    private async isEmailUnique(email: string): Promise<boolean> {
        const candidate = await this.authRepository.getUserByEmail(email);
        return candidate === null;
    }

    private getPayload(user: UserDomainModel) {
        return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            secondName: user.secondName,
            birthday: user.birthday,
            roles: user.roles,
            userImage: user.userImage,
            phoneNumber: user.phoneNumber
        };
    }
}