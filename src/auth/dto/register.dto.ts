import { IsNumberString } from 'class-validator';

export class RegisterDto {
  acessToken?: string;

  id?: string;

  firstName?: string;

  lastName?: string;

  email?: string;

  password?: string;
}
