import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Company {
  @Prop()
  name: string;

  @Prop()
  cnpj: string;

  @Prop()
  social_network: string;

  @Prop()
  cep: string;

  @Prop()
  state: string;

  @Prop()
  city: string;

  @Prop()
  ownerId: string;

  @Prop()
  ownerName: string;
}

export const Companieschema = SchemaFactory.createForClass(Company);
