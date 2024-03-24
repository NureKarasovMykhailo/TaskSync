import {body, ValidationChain} from 'express-validator';
import {NextFunction, Request} from "express";

export default function registrationValidator(): ValidationChain[] {
    return [
        body('email')
            .isEmail()
            .withMessage('Не коректний формат електроної пошти'),
        body('password')
            .trim()
            .isString()
            .withMessage('Невірний формат пароля')
            .isLength({min: 8, max: 20})
            .withMessage('Пароль має бути від 8 до 20 символів'),
        body('firstName')
            .trim()
            .isString()
            .withMessage('Невірний формат ім\'я'),
        body('secondName')
            .trim()
            .isString()
            .withMessage('Невірний формат прізвища'),
        body('birthday')
            .isDate()
            .withMessage('Невірний формат дати народження')
    ]
}
