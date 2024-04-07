import {body, ValidationChain} from "express-validator";

export default function createOrUpdateComplexityValidator(): ValidationChain[] {
    return [
        body('complexityTitle')
            .trim()
            .notEmpty()
            .withMessage('Будь-ласка, введіть назву складності'),
        body('evaluation')
            .trim()
            .notEmpty()
            .withMessage('Будь-ласка, введіть числову оцінку складності')
            .isNumeric()
            .withMessage('Невірний формат числової оцінки')
    ];
}
