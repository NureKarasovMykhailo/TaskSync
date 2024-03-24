import { ValidationError } from 'express-validator';

function formatValidationErrors(errors: ValidationError[]): string[] {
    return errors.map(error => {
        // @ts-ignore
        return `${error.path}-${error.msg}`;
    });
}

export default formatValidationErrors;