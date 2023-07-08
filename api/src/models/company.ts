import mongoose, { Schema, Document } from 'mongoose';

interface ICompany extends Document {
  name: string;
  socialMedia: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
  };
  cnpj: string;
  cep: string;
  state: string;
  city: string;
}

const companySchema = new Schema<ICompany>({
  name: { type: String, required: true },
  socialMedia: {
    instagram: { type: String },
    facebook: { type: String },
    tiktok: { type: String },
  },
  cnpj: { type: String, required: true },
  cep: { type: String, required: true, unique: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
});

const Company = mongoose.model<ICompany>('Company', companySchema);

export default Company;