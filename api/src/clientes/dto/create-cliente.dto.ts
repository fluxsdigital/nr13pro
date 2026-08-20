import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateClienteDto {
  @IsString()
  @MinLength(2)
  nome: string;

  @IsString()
  cnpj: string;

  @IsString()
  contato: string;

  @IsEmail()
  email: string;

  @IsString()
  telefone: string;

  @IsString()
  endereco: string;
}
