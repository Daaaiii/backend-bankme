import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { cpf, cnpj } from 'cpf-cnpj-validator';

@ValidatorConstraint({ name: 'isCpfOrCnpjValid', async: false })
export class IsCpfOrCnpjValidConstraint
  implements ValidatorConstraintInterface
{
  validate(document: string): boolean {
    if (document.length === 11) {
      return cpf.isValid(document);
    } else if (document.length === 14) {
      return cnpj.isValid(document);
    }
    return false;
  }

  defaultMessage(): string {
    return 'Documento inválido';
  }
}

export function IsCpfOrCnpjValid(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isCpfOrCnpjValid',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsCpfOrCnpjValidConstraint,
    });
  };
}
