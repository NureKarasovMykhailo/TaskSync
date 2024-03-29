import {body} from "express-validator";

export default function updateUserValidator() {
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
        body('birthday')
            .isDate()
            .withMessage('Неправильний формат дати народження'),

    ];
}
