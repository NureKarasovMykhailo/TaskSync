import {body, ValidationChain} from 'express-validator';
import {NextFunction, Request} from "express";

export default function createRoleValidator(): ValidationChain[] {
    return [
        body('roleTitle')
            .trim()
            .notEmpty()
            .withMessage('Введіть назву ролі')
            .isString()
            .withMessage('Невірний формат назви ролі'),
        body('description')
            .isString()
            .withMessage('Невірний формат опису ролі')
    ]
}
