import {body, ValidationChain} from "express-validator";

export default function createEducationValidator(): ValidationChain[] {
    return [
        body('educationTitle')
            .trim()
            .isString()
            .withMessage('Невірний формат назви спеціальності')
    ]
}
