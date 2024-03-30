import {body} from "express-validator";

export default function updateUserPublicValidator() {
    return [
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
