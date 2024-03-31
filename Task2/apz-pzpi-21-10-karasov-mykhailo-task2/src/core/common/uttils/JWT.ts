import * as jwt from 'jsonwebtoken';
import {JWT_SECRET_KEY} from "../../../config";
import UserDomainModel from "../../domain/models/User/User";


export default class JWT {

    private readonly payload: any;

    constructor(user: UserDomainModel) {
        this.payload = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            secondName: user.secondName,
            birthday: user.birthday,
            userImage: user.userImage,
            phoneNumber: user.phoneNumber,
            companyId: user.companyId,
            roles: user.roles,
            educations: user.educations,
        };
    }

    generateJwt() {
        return jwt.sign(this.payload, JWT_SECRET_KEY, {
            expiresIn: '24h'
        })
    }
}
