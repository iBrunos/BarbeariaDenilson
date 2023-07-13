import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdateCompanyDto {
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
