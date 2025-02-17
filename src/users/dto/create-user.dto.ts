import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)  // Por ejemplo, mínimo 6 caracteres
  readonly password: string;

  @IsNotEmpty()
  @IsEnum(['client', 'company', 'employee'])
  readonly role: 'client' | 'company' | 'employee';

  @IsOptional()
  @IsString()
  readonly phone?: string;

  @IsOptional()
  @IsString()
  readonly profile_picture?: string;
  
  // En el DTO de registro no incluiremos company_id; se podrá asignar en otro flujo o dependerá del rol
}
