import {AuthRepository} from "../../repositories/AuthRepository/AuthRepository";
import LoginDto from "../../repositories/AuthRepository/dto/login.dto";
import {RegistrationDto} from "../../repositories/AuthRepository/dto/registration.dto";

export default class AuthService {
    constructor(readonly authRepository: AuthRepository) {}

    public async registration(dto: RegistrationDto) {

    }

    public async login (dto: LoginDto) {

    }
}