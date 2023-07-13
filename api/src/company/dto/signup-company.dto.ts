import { IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly cnpj: string;

  @IsNotEmpty()
  @IsString()
  readonly social_network: string;

  @IsNotEmpty()
  @IsString()
  readonly cep: string;

  @IsString()
  readonly state: string;

  @IsString()
  readonly city: string;
  
  @IsNotEmpty()
  readonly ownerId: string;

  @IsString()
  readonly ownerName: string;
}
