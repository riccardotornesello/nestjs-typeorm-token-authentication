import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';
import { UniqueValidator } from './validators/Unique';
import { User } from './entities/user.entity';

export class RegistrationDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @Validate(UniqueValidator, [User])
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  @Validate(UniqueValidator, [User])
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}
