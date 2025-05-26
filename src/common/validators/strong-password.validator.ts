import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'StrongPassword', async: false })
export class StrongPasswordConstraint implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    if (typeof value !== 'string') return false;

    const hasMinLength = value.length >= 8;
    const hasLetter = /[a-zA-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialChar = /[^a-zA-Z0-9]/.test(value);

    return hasMinLength && hasLetter && hasNumber && hasSpecialChar;
  }

  defaultMessage(_: ValidationArguments) {
    return (
      'Password must be at least 8 characters long and contain at ' +
      'least one letter, one number, and one special character'
    );
  }
}

export function StrongPassword(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'StrongPassword',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: StrongPasswordConstraint,
    });
  };
}
