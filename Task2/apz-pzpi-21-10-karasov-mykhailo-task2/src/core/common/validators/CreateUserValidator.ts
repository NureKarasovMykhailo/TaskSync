import {NextFunction, Request, Response} from "express";
import {body} from "express-validator";

function createUserValidator(req: Request, res: Response, next: NextFunction) {
    return [
        body('email')
          .isEmail()
          .withMessage('Невірний формат електроної пошти'),
        body('firstName')
            .trim()
            .notEmpty()
            .withMessage('Required field firstName'),
        body('secondName')
            .trim()
            .notEmpty()
            .withMessage('Required field secondName'),
        body('password')
            .trim()
            .isLength({min: 8, max: 20})
            .withMessage('Пароль має бути від 8 до 20 символів'),
        body('birthday')
            .isDate()
            .withMessage('Неправильний формат дати народження'),

    ];
}

export default createUserValidator;