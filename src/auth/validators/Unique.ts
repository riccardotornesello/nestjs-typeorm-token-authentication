import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@ValidatorConstraint({ name: 'unique', async: true })
@Injectable()
export class UniqueValidator implements ValidatorConstraintInterface {
  constructor(private readonly dataSource: DataSource) {}

  validate(text: string, args: ValidationArguments) {
    const [entity, keyName] = args.constraints;
    return this.dataSource
      .getRepository(entity)
      .findOneBy({ [keyName || args.property]: text })
      .then((val) => {
        if (val === null) {
          return true;
        } else {
          return false;
        }
      })
      .catch(() => {
        return false;
      });
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} is already in use`;
  }
}
