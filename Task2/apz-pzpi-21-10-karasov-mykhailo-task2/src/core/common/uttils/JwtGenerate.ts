import * as jwt from 'jsonwebtoken';
import {JWT_SECRET_KEY} from "../../../config";


export default function generateJwt(payload: any) {
    return jwt.sign(payload, JWT_SECRET_KEY, {
        expiresIn: '24h'
    })
}