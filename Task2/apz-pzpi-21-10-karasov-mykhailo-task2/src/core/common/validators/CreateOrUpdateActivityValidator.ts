import {body, ValidationChain} from "express-validator";

export default function createOrUpdateActivityValidator(): ValidationChain[] {
    return [
        body('activityTitle')
            .trim()
            .notEmpty()
            .withMessage('Будь-ласка, введіть назву діяльності'),
        body('requiredWorkerCount')
            .isNumeric()
            .withMessage('Будь-ласка, введіть необхідну кількість робітників'),
        body('timeShift')
            .isNumeric()
            .withMessage('Будь-ласка, введіть кількість часу, необхідну для виконання роботи'),
        body('complexityId')
            .isNumeric()
            .withMessage('Будь-ласка оберіть складність діяльності'),
        body('educationId')
            .isNumeric()
            .withMessage('Будь-ласка оберіть складність діяльності'),

    ]
}